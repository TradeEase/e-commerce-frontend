import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import defaultProfileImage from '../profile/ProfileImage.jpg'; // Import the default profile image

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

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
    <div style={{ padding: '20px' , marginTop:'130px', marginBottom:'130px'}}>
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
        <div style={{ flex: '3' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Personal Information</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Full Name</label> <br/>
              <input type="text" placeholder="Enter full name" style={{ width: '500px', padding: '12px', fontSize: '16px' }} />
            </div>

            <div>
              <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Last Name</label> <br/>
              <input type="text" placeholder="Enter last name" style={{ width: '500px', padding: '12px', fontSize: '16px' }} />
            </div>

            <div>
              <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Email</label> <br/>
              <input type="email" placeholder="Enter email" style={{ width: '500px', padding: '12px', fontSize: '16px' }} />
            </div>

            <div>
              <label style={{ fontSize: '18px', fontWeight: 'bold' }}>About</label> <br/>
              <textarea placeholder="Tell something about yourself" style={{ width: '500px', padding: '12px', fontSize: '16px', height: '100px' }} />
            </div>

            <div>
              <label style={{ fontSize: '18px', fontWeight: 'bold' }}>City/Town</label> <br/>
              <input type="text" placeholder="Enter city or town" style={{ width: '500px', padding: '12px', fontSize: '16px' }} />
            </div>

            <div>
              <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Country</label> <br/>
              <select style={{ width: '500px', padding: '12px', fontSize: '16px' }}>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
