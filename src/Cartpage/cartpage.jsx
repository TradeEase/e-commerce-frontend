import React, { useState } from 'react';

const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(1);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  
  const price = 14.90;
  const wrapPrice = 10.00;
  const total = price * quantity + (isGiftWrapped ? wrapPrice : 0);
  
  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopping Cart</h1>
      <p>Home &gt; Your Shopping Cart</p>
      
      <div style={styles.cartItem}>
        <img
          src="https://via.placeholder.com/80"
          alt="Mini Dress With Ruffled Straps"
          style={styles.image}
        />
        <div style={styles.details}>
          <h2>Mini Dress With Ruffled Straps</h2>
          <p>Color: Red</p>
          <button style={styles.removeButton}>Remove</button>
        </div>
        <div style={styles.price}>${price.toFixed(2)}</div>
        <div style={styles.quantityControl}>
          <button onClick={() => handleQuantityChange(-1)} style={styles.quantityButton}>-</button>
          <span style={styles.quantityText}>{String(quantity).padStart(2, '0')}</span>
          <button onClick={() => handleQuantityChange(1)} style={styles.quantityButton}>+</button>
        </div>
        <div style={styles.totalPrice}>${(price * quantity).toFixed(2)}</div>
      </div>
      
      <div style={styles.wrapOption}>
        <input
          type="checkbox"
          checked={isGiftWrapped}
          onChange={() => setIsGiftWrapped(!isGiftWrapped)}
        />
        <span>For ${wrapPrice.toFixed(2)} Please Wrap The Product</span>
      </div>
      
      <div style={styles.subtotal}>
        <p>Subtotal</p>
        <p>${total.toFixed(2)}</p>
      </div>
      
      <button style={styles.checkoutButton}>Checkout</button>
      <button style={styles.viewCartButton}>View Cart</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
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
  },
  price: {
    width: '80px',
    textAlign: 'right',
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
  wrapOption: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
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
    marginBottom: '10px',
  },
  viewCartButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ShoppingCart;
