import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import defaultProfileImage from '../profile/ProfileImage.jpg'; // Import the default profile image

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    state: '',
    city: '',
    street: '',
    postalCode: '',
    username: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:8081/api/user/users/1');
        if (!response.ok) {
          throw new Error('Server Error');
        }
        const data = await response.json();
        setUserData(data);
        setFormData(data); // Initialize formData with fetched data
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Error fetching user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const updatedUserData = formData;
      const response = await fetch('http://localhost:8081/api/user/users/1', {
        method: 'PUT',
        body: JSON.stringify(updatedUserData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error');
      }
      alert('User data updated successfully');
      setUserData(updatedUserData);
      setFormData(updatedUserData);
    } catch (error) {
      console.error('Error updating user data: ', error);
      setError('Error updating user data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle image upload
  const handleEditClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setProfileImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  };

  // Function to handle image deletion
  const handleDeleteClick = () => {
    setProfileImage(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>My Profile</h1>

      <div style={{ display: 'flex', gap: '200px', width: '100%' }}>
        {/* Left side with Profile Picture and Icons */}
        <div style={{ flex: '1', textAlign: 'center', maxWidth: '450px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={profileImage}
              alt="Profile"
              style={{ width: '350px', height: '350px', borderRadius: '50%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button
                onClick={handleEditClick}
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '30px' }}
              >
                <i className="fas fa-edit" title="Edit Profile Picture"></i>
              </button>
              <button
                onClick={handleDeleteClick}
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '30px' }}
              >
                <i className="fas fa-trash-alt" title="Delete Profile Picture"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Right side with Profile Information Form */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div style={{ flex: '3' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Personal Information</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleFormSubmit}>
              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>First Name</label> <br />
                <input
                  type="text"
                  value={formData.fname}
                  onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                  placeholder="Enter full name"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Last Name</label> <br />
                <input
                  type="text"
                  value={formData.lname}
                  onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                  placeholder="Enter full name"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Email</label> <br />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>State</label> <br />
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Enter state"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>City</label> <br />
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Street</label> <br />
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Enter street"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Postal Code</label> <br />
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Enter postal code"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Username</label> <br />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter username"
                  style={{ width: '500px', padding: '12px', fontSize: '16px' }}
                />
              </div>

              <button type="submit" style={{ width: '150px', backgroundColor: 'blue', color: 'white', padding: '10px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div >
  );
}

export default ProfilePage;
