import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from './components/Navbar';

const AdminCreationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [admins, setAdmins] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch existing admins from the backend
    Axios.get('http://:8080/api/taskUserService/auth/getAllusersonly')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing admin
      const updatedAdmins = admins.map((admin, index) =>
        index === editIndex ? formData : admin
      );
      setAdmins(updatedAdmins);

      // Make a PUT request to update the admin on the backend
      Axios.post(`http://gateway:8080/api/taskUserService/auth/update`, formData)
        .then((response) => {
          alert(response.data.message);
          setIsEditing(false);
          setEditIndex(null);
        })
        .catch((error) => {
          console.error('Error updating admin:', error);
        });
    } else {
      // Add a new admin with role set to 'USER'
      const newAdmin = { ...formData, role: 'USER' };
      setAdmins([...admins, newAdmin]);

      // Make a POST request to create a new admin on the backend
      Axios.post('http://gateway:8080/api/taskUserService/auth/update', newAdmin)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error('Error creating admin:', error);
        });
    }

    // Reset form data and hide form after submission
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      address: '',
    });
    setShowForm(false);
  };
  const handleEdit = (index) => {
    setFormData(admins[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true); // Show the form when editing
  };



  const handleDelete = (index) => {
    // Make a DELETE request to delete the admin
    Axios.delete(`http://gateway:8080/api/taskUserService/auth/delete/${admins[index].id}`)
      .then(() => {
        alert('Admin deleted successfully');
        setAdmins(admins.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error('Error deleting admin:', error);
      });
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
        <button
          style={styles.button}
          onClick={() => setShowForm(true)}
        >
          Add Admin
        </button>
      </div>
      <div style={styles.content}>
        {admins.length > 0 && (
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
              {admins.map((admin, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{admin.fullName}</td>
                  <td style={styles.tableCell}>{admin.email}</td>
                  <td style={styles.tableCell}>{admin.mobile}</td>
                  <td style={styles.tableCell}>{admin.address}</td>
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
              {isEditing ? 'Edit Admin' : 'Create Admin'}
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
            <div style={styles.buttonContainerForm}>
              <button
                style={styles.button}
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreationPage;