import React, { useState } from 'react';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: 'T-Shirt',
    imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    price: 20.0,
    colors: ['#FF5733', '#33FF57', '#3357FF'], // Example colors
  },
  {
    id: 2,
    name: 'Sweater',
    imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    price: 35.0,
    colors: ['#FF33A8', '#33FFF0', '#FF8C33'], // Example colors
  },
  {
    id: 3,
    name: 'Jeans',
    imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    price: 50.0,
    colors: ['#A833FF', '#FFDB33', '#33FF57'], // Example colors
  },
];

const TestProduct = () => {
  // State for selected color
  const [selectedColors, setSelectedColors] = useState({});

  // Handle color selection
  const handleColorSelect = (productId, color) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  return (
    <div style={{ padding: '20px' }}>
      {sampleProducts.map((product) => (
        <div
          key={product.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            minHeight: '190px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '20px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Product Images */}
          <div style={{ display: 'flex', marginRight: '20px' }}>
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name}-${index}`}
                style={{ width: '150px', height: '150px', borderRadius: '8px', marginRight: '10px' }}
              />
            ))}
          </div>

          {/* Product Details */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{product.name}</h2>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>

            {/* Quantity Dropdown */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor={`quantity-${product.id}`} style={{ marginRight: '10px' }}>
                Quantity:
              </label>
              <select id={`quantity-${product.id}`} style={{ padding: '5px', fontSize: '16px' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Options */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Size:</label>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <label key={size} style={{ marginRight: '15px' }}>
                  <input type="radio" name={`size-${product.id}`} value={size} />
                  {size}
                </label>
              ))}
            </div>

            {/* Color Options */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Color:</label>
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorSelect(product.id, color)}
                  style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: '10px',
                    cursor: 'pointer',
                    border:
                      selectedColors[product.id] === color ? '2px solid #000' : '2px solid #ddd',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              alignSelf: 'flex-start',
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default TestProduct;
