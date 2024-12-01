import React, { useState } from 'react';
import Navbar from './components/Navbar';

const AdminCreationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  const [admins, setAdmins] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

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
      const updatedAdmins = admins.map((admin, index) =>
        index === editIndex ? formData : admin
      );
      setAdmins(updatedAdmins);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setAdmins([...admins, formData]);
    }
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      address: '',
    });
    setShowForm(false); // Hide the form after submission
  };

  const handleEdit = (index) => {
    setFormData(admins[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true); // Show the form when editing
  };

  const handleDelete = (index) => {
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
    },
    content: {
      flex: 1,
      marginLeft: '200px',
      padding: '20px',
    },
    formContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
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
    buttonContainer: {
      textAlign: 'center',
      marginTop: '30px',
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
    table: {
      width: '100%',
      marginTop: '30px',
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

      {/* Main Content */}
      <div style={styles.content}>
        {/* Toggle Form Button */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'Add Admin'}
          </button>
        </div>

        {/* Admin Form */}
        {showForm && (
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
                  name="contactNumber"
                  value={formData.contactNumber}
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
              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.button}>
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Admins Table */}
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
                  <td style={styles.tableCell}>{admin.contactNumber}</td>
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
    </div>
  );
};

export default AdminCreationPage;
