import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';


const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.userId;

        const cartResponse = await axios.get(`http://localhost:8082/api/carts/user/${userId}`);
        console.log('Cart Response:', cartResponse.data);

        const cartId = cartResponse.data.cartId;

        const cartItemsResponse = await axios.get(`http://localhost:8082/api/cartItems/cart/${cartId}`);
        console.log('Cart Items Response:', cartItemsResponse.data);

        const cartItems = cartItemsResponse.data;

        const productDetailsPromises = cartItems.map(item =>
          axios.get(`http://localhost:8083/api/product/products/${item.productId}`)
        );
        const productDetailsResponses = await Promise.all(productDetailsPromises);

        const updatedCart = cartItems.map((item, index) => ({
          ...item,
          ...productDetailsResponses[index].data,
          quantity: item.quantity,
          cartId: cartId,
        }));

        console.log('Updated Cart:', updatedCart);

        setCart(updatedCart);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = async (id, amount) => {
    const updatedCart = cart.map(product =>
      product.productId === id
        ? { ...product, quantity: Math.max(1, product.quantity + amount) }
        : product
    );

    const updatedProduct = updatedCart.find(product => product.productId === id);
    if (updatedProduct) {
      try {
        console.log('Data being sent to backend:', {
          cartItemId: updatedProduct.cartItemId,
          productId: updatedProduct.productId,
          quantity: updatedProduct.quantity,
          cart: updatedProduct.cartId,
        });

        if (amount !== 0) {
          await axios.put(`http://localhost:8082/api/cartItems/${updatedProduct.cartItemId}`, {
            cartItemId: updatedProduct.cartItemId,
            productId: updatedProduct.productId,
            quantity: updatedProduct.quantity,
            cart: updatedProduct.cartId,
          });
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }

    setCart(updatedCart);
  };

  const handleRemove = async (id) => {
    const confirmRemove = window.confirm('Are you sure you want to remove this item?');
    if (confirmRemove) {
      const productToRemove = cart.find(product => product.productId === id);
      if (productToRemove) {
        try {
          await axios.delete(`http://localhost:8082/api/cartItems/${productToRemove.cartItemId}`);
          setCart(prevCart => prevCart.filter(product => product.productId !== id));
        } catch (error) {
          console.error('Error removing item:', error);
        }
      }
    }
  };


  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;

      // Iterate over cart items to send them one by one
      for (const item of cart) {
        const orderPayload = {
          orderId: 0, // Assuming the orderId is generated by the backend
          userId: userId,
          status: true,
          productId: item.productId,
          quantity: item.quantity,
          cart: item.cartId, // Use the same cart ID for all items
        };

        console.log('Sending order data to backend:', orderPayload);

        // Post request to create the order for each item
        await axios.post('http://localhost:8082/api/orders', orderPayload);
      }

      // After posting all orders, delete all items from the cart
      const deleteCartItemPromises = cart.map(item => {
        console.log(`Deleting cart item with ID: ${item.cartItemId}`);
        return axios.delete(`http://localhost:8082/api/cartItems/${item.cartItemId}`);
      });

      await Promise.all(deleteCartItemPromises);
      console.log('Cart items deleted successfully');

      // Navigate to the payment page
      const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
      navigate('/payments1', {
        state: {
          cart,
          totalPrice,
        },
      });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };



  const getTotalPrice = () => {
    return cart.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading your shopping cart...</p>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopping Cart</h1>


      {cart.length === 0 ? (
        <p style={styles.emptyCartMessage}>Your cart is currently empty.</p>
      ) : (
        cart.map(product => (
          <div key={product.productId} style={styles.cartItem}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />
            <div style={styles.details}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price.toFixed(2)}</p>
              <button style={styles.removeButton} onClick={() => handleRemove(product.productId)}>
                Remove
              </button>
            </div>
            <div style={styles.quantityControl}>
              <button
                onClick={() => handleQuantityChange(product.productId, -1)}
                style={styles.quantityButton}
              >
                -
              </button>
              <span style={styles.quantityText}>{product.quantity}</span>
              <button
                onClick={() => handleQuantityChange(product.productId, 1)}
                style={styles.quantityButton}
              >
                +
              </button>
            </div>
            <div style={styles.totalPrice}>${(product.price * product.quantity).toFixed(2)}</div>
          </div>
        ))
      )}

      <div style={styles.subtotal}>
        <p>Total Price</p>
        <p>${getTotalPrice()}</p>
      </div>

      <button style={styles.checkoutButton} onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '100px auto',
    padding: '20px',
    fontFamily: '"Roboto", Arial, sans-serif',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

  },
  header: {
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#0077cc',
  },
  cartItem: {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '20px',
    marginBottom: '20px',
    padding: '10px 0',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  details: {
    flex: 1,
    paddingLeft: '20px',
    color: '#555',
  },
  removeButton: {
    color: '#d9534f',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    padding: '5px 10px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#fff',
    backgroundColor: '#0077cc',
    border: 'none',
    borderRadius: '4px',
    margin: '0 5px',
    transition: 'background-color 0.3s',
  },
  quantityText: {
    margin: '0 10px',
    fontSize: '16px',
    color: '#333',
  },
  totalPrice: {
    width: '100px',
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  subtotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: '600',
    marginTop: '20px',
    padding: '10px 0',
    borderTop: '1px solid #ddd',
    color: '#0077cc',
  },
  checkoutButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #0077cc',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: 'spin 1s linear infinite',
  },
  emptyCartMessage: {
    textAlign: 'center',
    fontSize: '20px',
    color: 'black',
  },
};

export default ShoppingCart;
