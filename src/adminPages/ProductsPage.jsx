import React, { useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', productId: '', description: '', image: null });
  const [editingProductId, setEditingProductId] = useState(null);

  const handleAddProductClick = () => setShowPopup(true);

  const handleConfirmAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', productId: '', description: '', image: null });
    setShowPopup(false);
  };

  const handleCancelAddProduct = () => {
    setShowPopup(false);
    setNewProduct({ name: '', productId: '', description: '', image: null });
  };

  const handleEdit = (id) => setEditingProductId(id);

  const handleSave = (id) => {
    setEditingProductId(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleImageUpload = (event, id) => {
    const file = event.target.files[0];
    setProducts(products.map(product => product.id === id ? { ...product, image: URL.createObjectURL(file) } : product));
  };

  return (
    <div>
      <h2 style={{marginTop:'140px'}}>Products</h2>
      <table style={{ border: '1px solid black',  width: '100%', marginTop:'30px', marginBottom: '20px' }}>
        <thead>
          <tr >
            <th >Product Name</th>
            <th >Product ID</th>
            <th >Product Description</th>
            <th >Actions</th>
            <th >Sample Images</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} style={{ height: 'auto' }}>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, name: e.target.value } : p))}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={product.productId}
                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, productId: e.target.value } : p))}
                  />
                ) : (
                  product.productId
                )}
              </td>
              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                {editingProductId === product.id ? (
                  <textarea
                    value={product.description}
                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, description: e.target.value } : p))}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <button onClick={() => handleSave(product.id)} style={{ backgroundColor: 'green', color: 'white' }}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(product.id)} style={{ backgroundColor: 'blue', color: 'white' }}>Edit</button>
                )}
                <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: 'red', color: 'white', marginLeft: '5px' }}>Delete</button>
              </td>
              <td>
                <input type="file" onChange={(e) => handleImageUpload(e, product.id)} />
                {product.image && <img src={product.image} alt="Product" width="50" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddProductClick} style={{ backgroundColor: 'purple', color: 'white', padding: '10px 20px', marginBottom:'30px', marginTop:'50px' }}>Add New Product</button>

      {/* Popup for adding a new product */}
      {showPopup && (
        <div style={popupStyles}>
          <h2>Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Product ID"
            value={newProduct.productId}
            onChange={(e) => setNewProduct({ ...newProduct, productId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button onClick={handleConfirmAddProduct} style={{ backgroundColor: 'green', color: 'white' }}>Confirm</button>
          <button onClick={handleCancelAddProduct} style={{ backgroundColor: 'gray', color: 'white', marginLeft: '5px' }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

// Basic styling for the popup
const popupStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

export default ProductsPage;
