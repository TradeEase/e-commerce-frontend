import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css';
import Navbar from '../adminPages/components/Navbar';
import Modal from 'react-modal';

// Set the app element for the modal to work properly with accessibility
Modal.setAppElement('#root');

const ProductCreationPage = () => {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
    categories: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Hardcoded categories
  const categories = [
    { id: 1, name: "Women's Wear" },
    { id: 3, name: "Kids' Wear" },
    { id: 4, name: "Swimwear" },
    { id: 6, name: "Men's Wear" },
    { id: 7, name: "Sarees" },
    { id: 8, name: "Frocks" },
    { id: 12, name: "Party Frocks" },
  ];

  const API_URL = 'http://localhost:8083/api/product/products';
  // Fetch products
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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle category change (multiple categories)
  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, categories: selectedCategories });
  };

  // Handle image change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const imageFormData = new FormData();
      imageFormData.append('file', file);
      imageFormData.append('upload_preset', 'BuySwift'); // Replace with your upload preset

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dglwbdnlt/image/upload',
          imageFormData
        );
        setFormData({ ...formData, image: response.data.secure_url });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      description: formData.description,
      image: formData.image,
      categories: formData.categories,  // Pass selected categories (multiple)
    };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.productId}`, productData);
      } else {
        await axios.post(API_URL, productData);
      }
      fetchProducts(); // Refresh the product list
      resetForm();
      setShowForm(false); // Close the modal after submitting
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (index) => {
    const product = products[index];
    setFormData({ ...product });
    setImagePreview(product.image);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const productId = products[index]?.productId;
    if (!productId) return;

    try {
      await axios.delete(`${API_URL}/${productId}`);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      name: '',
      description: '',
      price: '',
      quantity: '',
      image: null,
      categories: [],
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="content">
        {/* Add New Product button */}
        <button className="button" onClick={() => setShowForm(true)}>
          Add New Product
        </button>

        {/* Modal for adding/editing product */}
        <Modal
          isOpen={showForm}
          onRequestClose={() => setShowForm(false)}
          contentLabel="Product Form"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <form className="product-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <input type="file" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

            {/* Categories selection (multiple selection) */}
            <select
              name="categories"
              multiple
              value={formData.categories}
              onChange={handleCategoryChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </Modal>

        {/* Product Table */}
        {products.length > 0 && (
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Categories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt="Product" className="table-image" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.categories.join(', ')}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
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
