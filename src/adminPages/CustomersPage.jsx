import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

const CustomersPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers from the backend
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8088/auth/getAllcustomersonly');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for creating or updating a customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing customer
        const updatedCustomer = customers[editIndex];
        updatedCustomer.fullName = formData.fullName;
        updatedCustomer.email = formData.email;
        updatedCustomer.mobile = formData.mobile;
        updatedCustomer.address = formData.address;

        const response = await axios.post(`http://localhost:8088/auth/update`, updatedCustomer);
        if (response.status === 200) {
          const updatedCustomers = [...customers];
          updatedCustomers[editIndex] = updatedCustomer;
          setCustomers(updatedCustomers);
        }
      } else {
        // Create new customer
        const response = await axios.post('http://localhost:8088/auth/update', formData);
        if (response.status === 201) {
          setCustomers([...customers, response.data]);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    // Reset form and close modal
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      address: '',
    });
    setShowForm(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(customers[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteCustomer/${customers[index].id}`);
      if (response.status === 200) {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
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
      marginLeft: '200px',
      padding: '20px',
    },
    buttonContainer: {
      position: 'absolute',
      top: '60px',
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
      marginTop: '100px',
      marginRight: '100px',
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
      {/* Navbar */}
      <Navbar />

      {/* Add Customer Button */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => setShowForm(true)}
        >
          Add Customer
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Customers Table */}
        {customers.length > 0 && (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>Full Name</th>
                <th style={styles.tableCell}>Email</th>
                <th style={styles.tableCell}>Contact Number</th>
                <th style={styles.tableCell}>Address</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{customer.fullName}</td>
                  <td style={styles.tableCell}>{customer.email}</td>
                  <td style={styles.tableCell}>{customer.mobile}</td>
                  <td style={styles.tableCell}>{customer.address}</td>
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

      {/* Form Modal */}
      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formContainer}>
            <h2 style={styles.formHeader}>
              {isEditing ? 'Edit Customer' : 'Create Customer'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Number:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.buttonContainerForm}>
                <button type="submit" style={styles.button}>
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
