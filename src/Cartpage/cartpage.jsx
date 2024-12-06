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
        const userId = decodedToken?.userId || '674d737b5352c529107297d8';

        const cartResponse = await axios.get(`http://localhost:8082/api/carts/user/${userId}`);
        const cartId = cartResponse.data.cartId;

        const cartItemsResponse = await axios.get(`http://localhost:8082/api/cartItems/cart/${cartId}`);
        const cartItems = cartItemsResponse.data;

        const productDetailsPromises = cartItems.map(item =>
          axios.get(`http://localhost:8083/api/product/products/${item.productId}`)
        );
        const productDetailsResponses = await Promise.all(productDetailsPromises);

        const updatedCart = cartItems.map((item, index) => ({
          ...item,
          ...productDetailsResponses[index].data,
          quantity: item.quantity, // Ensure quantity is retained as a number
        }));

        setCart(updatedCart);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = (id, amount) => {
    setCart(prevCart =>
      prevCart.map(product =>
        product.productId === id
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  };

  const handleRemove = id => {
    setCart(prevCart => prevCart.filter(product => product.productId !== id));
  };

  const handleCheckout = () => {
    const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    navigate('/payments1', {
      state: {
        cart,
        totalPrice,
      },
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopping Cart</h1>
      <p>Home &gt; Your Shopping Cart</p>

      {cart.map(product => (
        <div key={product.productId} style={styles.cartItem}>
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
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
      ))}

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

// Styling
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  details: {
    flex: 1,
    paddingLeft: '20px',
  },
  removeButton: {
    color: 'red',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    padding: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  quantityText: {
    margin: '0 10px',
    fontSize: '16px',
  },
  totalPrice: {
    width: '80px',
    textAlign: 'right',
  },
  subtotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '20px',
  },
  checkoutButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default ShoppingCart;
