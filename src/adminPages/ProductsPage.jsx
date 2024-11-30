import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', productId: '', description: '', price: '', quantity: '', image: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  const API_URL = 'http://localhost:8083/api/product/products'; 

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a new product
  const handleConfirmAddProduct = async () => {
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts([...products, { ...newProduct, productId: response.data }]);
      setNewProduct({ name: '', productId: '', description: '', price: '', quantity: '', image: '' });
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Edit product
  const handleSave = async (id) => {
    const productToUpdate = products.find((product) => product.productId === id);
    try {
      await axios.put(`${API_URL}/${id}`, productToUpdate);
      setEditingProductId(null);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.productId !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProductClick = () => setShowPopup(true);

  const handleCancelAddProduct = () => {
    setShowPopup(false);
    setNewProduct({ name: '', productId: '', description: '', price: '', quantity: '', image: '' });
  };

  const handleEdit = (id) => setEditingProductId(id);

  return (
    <div>
      <h2 style={{ marginTop: '140px' }}>Products</h2>
      <table style={{ border: '1px solid black', width: '100%', marginTop: '30px', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>
                {editingProductId === product.productId ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProducts(products.map((p) => (p.productId === product.productId ? { ...p, name: e.target.value } : p)))}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>{product.productId}</td>
              <td>
                {editingProductId === product.productId ? (
                  <textarea
                    value={product.description}
                    onChange={(e) => setProducts(products.map((p) => (p.productId === product.productId ? { ...p, description: e.target.value } : p)))}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editingProductId === product.productId ? (
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProducts(products.map((p) => (p.productId === product.productId ? { ...p, price: e.target.value } : p)))}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProductId === product.productId ? (
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => setProducts(products.map((p) => (p.productId === product.productId ? { ...p, quantity: e.target.value } : p)))}
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td>
                {editingProductId === product.productId ? (
                  <button onClick={() => handleSave(product.productId)} style={{ backgroundColor: 'green', color: 'white' }}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(product.productId)} style={{ backgroundColor: 'blue', color: 'white' }}>
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product.productId)}
                  style={{ backgroundColor: 'red', color: 'white', marginLeft: '5px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddProductClick} style={{ backgroundColor: 'purple', color: 'white', padding: '10px 20px' }}>
        Add New Product
      </button>

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
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button onClick={handleConfirmAddProduct} style={{ backgroundColor: 'green', color: 'white' }}>
            Confirm
          </button>
          <button onClick={handleCancelAddProduct} style={{ backgroundColor: 'gray', color: 'white', marginLeft: '5px' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const popupStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default ProductsPage;
