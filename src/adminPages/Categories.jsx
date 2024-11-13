import React, { useState } from 'react';

const Categories = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState('');

  // Function to handle popup form submission
  const handleAddCategory = () => {
    if (categoryName && categoryId) {
      setCategories([...categories, { name: categoryName, id: categoryId }]);
      setCategoryName('');
      setCategoryId('');
      setShowPopup(false);
    } else {
      alert('Please fill in both fields.');
    }
  };

  // Function to handle deletion of a category
  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // Function to enable editing mode
  const handleEditCategory = (index) => {
    setEditIndex(index);
    setEditedName(categories[index].name);
  };

  // Function to save the edited category name
  const handleSaveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = editedName;
    setCategories(updatedCategories);
    setEditIndex(null);
    setEditedName('');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop:'160px', marginBottom:'120px' }}>
      {/* Button to open popup */}
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => setShowPopup(true)}
      >
        Add New Category
      </button>

      {/* Popup form */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <h3>Add New Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <input
            type="text"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
            onClick={handleAddCategory}
          >
            OK
          </button>
          <button
            style={{
              backgroundColor: 'gray',
              color: 'white',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Table to display categories */}
      {categories.length > 0 && (
        <table
          style={{
            width: '1200px',
            margin: '20px auto',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Category ID</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Category Name</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{category.id}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      style={{ padding: '5px', width: '100%' }}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                  {editIndex === index ? (
                    <button
                      onClick={() => handleSaveCategory(index)}
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCategory(index)}
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(index)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
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
  );
};

export default Categories;
