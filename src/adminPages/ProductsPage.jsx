import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import React Select for dropdown

import Navbar from './components/Navbar';
import axios from 'axios';
const categoriesOptions = [
  { value: 1, label: "Women's Wear" },
  { value: 2, label: "Kids' Wear" },
  { value: 3, label: "Swimwear" },
  { value: 4, label: "Men's Wear" },
  { value: 5, label: "Sarees" },
  { value: 6, label: "Frocks" },
];
const defaultReviewId = '1';


const ProductCreationPage = () => {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    description: '',
    image: null,
    price: '',
    quantity: '',
    categories: [], // Ensure categories is initialized as an empty array

  });



  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = 'http://gateway:8080/api/product/products';

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


  const handleConfirmAddProduct = async () => {
    try {
      // Construct the product data in the expected format
      const productData = {
        productId: 0,
        name: formData.name,
        price: formData.price, // Set default value for invalid price
        description: formData.description,
        quantity: formData.quantity ? parseInt(formData.quantity, 10) : 0, // Set default value for invalid quantity
        image: formData.image,
        categories: formData.categories.length > 0 ? formData.categories : [0], // Handle empty categories
        review: defaultReviewId,
      };


      console.log('Form Data before request:', productData);

      const response = await axios.post(API_URL, productData);

      // Add new product to state
      setProducts([...products, { ...productData, productId: response.data }]);

      // Reset the form
      setFormData({ name: '', productId: '', description: '', price: '', quantity: '', image: '', categories: [] });
      setImagePreview(null);

    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message); // Log backend response
    }
  };


  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'BuySwift'); // Replace with your upload preset

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dglwbdnlt/image/upload',
          formData
        );
        setFormData({ ...formData, image: response.data.secure_url }); // Save the Cloudinary URL
        console.log('Uploaded image URL:', response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,

      review_id: defaultReviewId, // Ensure review_id is always included
      categories: formData.categories || [], // Ensure categories is never undefined
    };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.productId}`, productData);
      } else {
        await axios.post(API_URL, productData);
      }
      fetchProducts(); // Refresh product list
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };


  const handleSave = async () => {
    // Construct the productData object using formData
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      image: formData.image, // Ensure the image URL or object is passed
      categories: formData.categories,
      review_id: defaultReviewId, // Set the default review ID if needed
    };

    // Check if the productId is valid and other required fields are present
    if (formData.productId && formData.name && formData.price && formData.quantity) {
      try {
        // Make the PUT request with the productData object
        const response = await axios.put(
          `http://gateway:8080/api/product/products/${formData.productId}`, // Use the productId from formData
          productData
        );
        console.log('Product updated successfully:', response.data);

        // Refresh the product list after successful update
        fetchProducts();

        // Reset the form
        resetForm();
      } catch (error) {
        console.error('Error updating product:', error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    } else {
      alert('Please ensure all required fields are filled out.');
    }
  };




  const resetForm = () => {
    setFormData({
      productId: '',
      name: '',
      description: '',
      image: null,
      price: '',
      quantity: '',
      categories: [],
      review_id: defaultReviewId, // Always include the default review ID
    });
    setImagePreview(null);
    setIsEditing(false);
    setShowForm(false);
  };



  const handleEdit = (index) => {
    const product = products[index];
    setFormData({
      ...product,
      categories: product.categories || [], // Ensure categories is an array
    });
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
                      'No Image'
                    )}
                  </td>
                  <td style={styles.tableCell}>{product.price}</td>
                  <td style={styles.tableCell}>{product.quantity}</td>
                  <td style={styles.tableCell}>{product.categories}</td>
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
                    accept="image/*"
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
                  <Select
                    isMulti
                    name="categories"
                    options={categoriesOptions}
                    value={categoriesOptions.filter((option) =>
                      formData.categories?.includes(option.value) // Use optional chaining to safely access categories
                    )}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map((option) => option.value);
                      setFormData({ ...formData, categories: selectedValues });
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />

                </div>
                <div style={styles.buttonContainerForm}>
                  <button
                    type="submit"
                    style={{ ...styles.actionButton, backgroundColor: 'blue', color: 'white' }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isEditing) {
                        handleSave(products[editIndex].productId); // Pass productId when editing
                      } else {
                        handleConfirmAddProduct(); // Add product when not editing
                      }
                    }}
                  >
                    {isEditing ? 'Save Changes' : 'Add Product'}
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



