import React, { useState } from 'react';

const AdminCreationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

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
      const response = await fetch('http://localhost:8088/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Admin created successfully!');
        setFormData({ fullName: '', email: '', contactNumber: '', address: '' });
      } else {
        setStatusMessage('Failed to create admin. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginLeft: '200px', marginTop: '50px' }}>
      <div style={{ width: '800px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Admin</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <label style={{ width: '150px', marginRight: '20px' }}>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <label style={{ width: '150px', marginRight: '20px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <label style={{ width: '150px', marginRight: '20px' }}>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <label style={{ width: '150px', marginRight: '20px' }}>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button type="submit" style={{ width: '150px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
              Create
            </button>
          </div>
        </form>
        {statusMessage && <p style={{ textAlign: 'center', marginTop: '20px', color: statusMessage.includes('success') ? 'green' : 'red' }}>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default AdminCreationPage;
