import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';

const ProductCreationPage = () => {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    description: '',
    image: null, // Store the uploaded file
    price: '',
    quantity: '',
    categories: '',
    review_id: '',
  });

  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      const response = await axios.post(API_URL, formData);
      console.log('Form Data before request:', formData);
      setProducts([...products, { ...formData, productId: response.data }]);
      setFormData({ name: '', productId: '', description: '', price: '', quantity: '', image: '' });
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleSave = async (id) => {
    if (!id) {
      console.error('No product ID found.');
      return;
    }

    const productToUpdate = products.find((product) => product.productId === id);
    if (!productToUpdate) {
      console.error('Product not found.');
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, productToUpdate);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };




  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file, // Store the actual file for uploading
      });
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedProduct = { ...formData };
      try {
        await axios.put(`${API_URL}/${updatedProduct.productId}`, updatedProduct);
        setProducts(
          products.map((product) =>
            product.productId === updatedProduct.productId ? updatedProduct : product
          )
        );
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      const newProduct = { ...formData };
      try {
        const response = await axios.post(API_URL, newProduct);
        setProducts([...products, { ...newProduct, productId: response.data }]);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    setFormData({
      productId: '',
      name: '',
      description: '',
      image: null,
      price: '',
      quantity: '',
      categories: '',
      review_id: '',
    });
    setImagePreview(null);
    setIsEditing(false);
    setShowForm(false);
  };



  const handleEdit = (index) => {
    const product = products[index];
    setFormData(product);
    setImagePreview(product.image || null);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };




  const handleDelete = async (index) => {
    // Get the product ID from the product at the given index
    const productId = products[index]?.productId;

    if (!productId) {
      console.error('Product ID not found');
      return;
    }

    // Remove the product from the local state
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);

    try {
      // Make the delete request using the product ID
      await axios.delete(`${API_URL}/${productId}`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      position: 'relative',
    },
    content: {
      flex: 1,
      marginLeft: '100px',
      padding: '20px',
    },
    buttonContainer: {
      position: 'absolute',
      top: '100px',
      right: '20px',
      zIndex: 1000,
    },
    button: {
      width: '150px',
      padding: '10px',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    formOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      maxWidth: '600px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    formHeader: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    formGroup: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    label: {
      width: '150px',
      marginRight: '20px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    buttonContainerForm: {
      textAlign: 'center',
      marginTop: '30px',
    },
    table: {
      width: '100%',
      marginTop: '150px',

      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f4f4f4',
      fontWeight: 'bold',
    },
    tableCell: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'center',
    },
    actionButton: {
      margin: '0 5px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };


  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setShowForm(true)}>
          Add New Product
        </button>
      </div>
      <div style={styles.content}>
        {products.length > 0 && (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>Product ID</th>
                <th style={styles.tableCell}>Product Name</th>
                <th style={styles.tableCell}>Description</th>
                <th style={styles.tableCell}>Image</th>
                <th style={styles.tableCell}>Price</th>
                <th style={styles.tableCell}>Quantity</th>
                <th style={styles.tableCell}>Categories</th>
                <th style={styles.tableCell}>Review</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{product.productId}</td>
                  <td style={styles.tableCell}>{product.name}</td>
                  <td style={styles.tableCell}>{product.description}</td>
                  <td style={styles.tableCell}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ maxWidth: '100px', height: 'auto' }}
                      />

                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td style={styles.tableCell}>{product.price}</td>
                  <td style={styles.tableCell}>{product.quantity}</td>
                  <td style={styles.tableCell}>{product.categories}</td>
                  <td style={styles.tableCell}>{product.review}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={{ ...styles.actionButton, backgroundColor: 'green', color: 'white' }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.actionButton, backgroundColor: 'red', color: 'white' }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showForm && (
          <div style={styles.formOverlay}>
            <div style={styles.formContainer}>
              <h2 style={styles.formHeader}>
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    style={styles.input}
                  />
                </div>
                {imagePreview && (
                  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                )}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Categories:</label>
                  <input
                    type="text"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Review:</label>
                  <textarea
                    name="review_id"
                    value={formData.review_id}
                    onChange={handleChange}
                    style={{ ...styles.input, height: '80px' }}
                  />
                </div>
                <div style={styles.buttonContainerForm}>
                  <button
                    type="submit"
                    style={{ ...styles.actionButton, backgroundColor: 'blue', color: 'white' }}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submit behavior
                      if (isEditing) {
                        handleSave(products[editIndex].productId); // Pass productId when editing
                      } else {
                        handleConfirmAddProduct(); // Add product when not editing
                      }
                    }}
                  >
                    {isEditing ? "Save Changes" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    style={{ ...styles.actionButton, backgroundColor: 'grey', color: 'white' }}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCreationPage;



