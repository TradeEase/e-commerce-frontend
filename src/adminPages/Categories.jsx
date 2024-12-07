import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

const API_BASE_URL = 'http://localhost:8083/api/product/categories';

const CategoriesPage = () => {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch categories from API
    axios
      .get(API_BASE_URL)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update category via API
        await axios.put(`${API_BASE_URL}/${formData.categoryId}`, formData);
        window.alert(`Category "${formData.name}" has been successfully updated.`);
        window.location.reload();
      } else {
        // Create new category via API
        const response = await axios.post(API_BASE_URL, formData);
        setCategories([...categories, { ...formData, categoryId: response.data }]);
        window.alert(`Category "${formData.name}" has been successfully added.`);

      }
      // Reset the form state
      setFormData({ categoryId: '', name: '', description: '' });
      setIsEditing(false);
      setEditIndex(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
      window.alert('An error occurred while saving the category. Please try again.');
    }
  };

  const handleEdit = (index) => {
    const category = categories[index];
    setFormData(category);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const category = categories[index];

    // Show confirmation prompt
    const isConfirmed = window.confirm(`Are you sure you want to delete the category "${category.name}"?`);

    // Proceed only if the user confirms
    if (isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/${category.categoryId}`);
        setCategories(categories.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    } else {
      console.log('Category deletion canceled by user.');
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
          Add New Category
        </button>
      </div>
      <div style={styles.content}>
        {categories.length > 0 && (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>Catergory ID</th>
                <th style={styles.tableCell}>Catergory Name</th>
                <th style={styles.tableCell}>Description</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((catergory, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{catergory.categoryId}</td>
                  <td style={styles.tableCell}>{catergory.name}</td>
                  <td style={styles.tableCell}>{catergory.description}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEdit(index)}
                      style={{
                        ...styles.actionButton,
                        backgroundColor: 'green',
                        color: 'white',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      style={{
                        ...styles.actionButton,
                        backgroundColor: 'red',
                        color: 'white',
                      }}
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
      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formContainer}>
            <h2 style={styles.formHeader}>
              {isEditing ? 'Edit Catergory' : 'Add New Catergory'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Catergory ID:</label>
                <input
                  type="text"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Catergory Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.buttonContainerForm}>
                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    backgroundColor: isEditing ? 'orange' : 'blue',
                  }}
                >
                  {isEditing ? 'Update Catergory' : 'Add New Catergory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
