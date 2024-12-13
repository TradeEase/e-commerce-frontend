import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import React Select for dropdown
import "./ProductPage.css";
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

  // Prepare product data
  const productData = {
    name: formData.name,
    price: parseFloat(formData.price),
    quantity: parseInt(formData.quantity, 10),
    description: formData.description,
    categories: formData.categories,
    review_id: defaultReviewId, // Ensure the review ID is included
  };

  try {
    if (isEditing) {
      // Update existing product
      await axios.put(`${API_URL}/${formData.productId}`, productData);
    } else {
      // Add new product
      await axios.post(API_URL, productData);
    }
    // Refresh product list and reset form
    fetchProducts();
    resetForm();
  } catch (error) {
    console.error("Error saving product:", error.response?.data || error.message);
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }
};



  const handleSave = async () => {
    // Construct the productData object using formData
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      description: formData.description,
      image: formData.image, // Ensure the image URL or object is passed
      categories: formData.categories,
      review_id: defaultReviewId, // Set the default review ID if needed
    };

    console.log('Product Data:', productData);

    // Check if the productId is valid and other required fields are present
    if (formData.productId && formData.name && formData.price && formData.quantity) {
      try {
        // Make the PUT request with the productData object
        const response = await axios.put(
          `http://localhost:8083/api/product/products/${formData.productId}`, // Use the productId from formData
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

  

  return (
    <div className="container">
  <Navbar />
  <div className="button-container">
    <button className="button" onClick={() => setShowForm(true)}>
      Add New Product
    </button>
  </div>
  <div className="content">
    {products.length > 0 && (
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-cell">Product ID</th>
            <th className="table-cell">Product Name</th>
            <th className="table-cell">Description</th>
            <th className="table-cell">Image</th>
            <th className="table-cell">Price</th>
            <th className="table-cell">Quantity</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="table-cell">{product.productId}</td>
              <td className="table-cell">{product.name}</td>
              <td className="table-cell">{product.description}</td>
              <td className="table-cell">
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
              <td className="table-cell">{product.price}</td>
              <td className="table-cell">{product.quantity}</td>
              <td className="table-cell">
                <button
                  className="action-button"
                  style={{ backgroundColor: 'green', color: 'white' }}
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="action-button"
                  style={{ backgroundColor: 'red', color: 'white' }}
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
  </div>
</div>

  );
};

export default ProductCreationPage;



