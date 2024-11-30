import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const apiUrl = "http://localhost:8083/api/categories";

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (categoryName) {
      try {
        const newCategory = { name: categoryName };
        const response = await axios.post(apiUrl, newCategory);
        setCategories([...categories, { ...newCategory, categoryId: response.data }]);
        setCategoryName("");
        setShowPopup(false);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      alert("Please provide a category name.");
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setCategories(categories.filter((category) => category.categoryId !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Update a category
  const handleSaveCategory = async (id) => {
    try {
      const updatedCategory = { name: editedName };
      await axios.put(`${apiUrl}/${id}`, updatedCategory);
      const updatedCategories = categories.map((category) =>
        category.categoryId === id ? { ...category, name: editedName } : category
      );
      setCategories(updatedCategories);
      setEditIndex(null);
      setEditedName("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Enable editing mode
  const handleEditCategory = (index) => {
    setEditIndex(categories[index].categoryId);
    setEditedName(categories[index].name);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", marginTop: "160px", marginBottom: "120px" }}>
      {/* Button to open popup */}
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={() => setShowPopup(true)}
      >
        Add New Category
      </button>

      {/* Popup form */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h3>Add New Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
          />
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={handleAddCategory}
          >
            OK
          </button>
          <button
            style={{
              backgroundColor: "gray",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
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
            width: "1200px",
            margin: "20px auto",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Category ID</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Category Name</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.categoryId}>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>{category.categoryId}</td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  {editIndex === category.categoryId ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      style={{ padding: "5px", width: "100%" }}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  {editIndex === category.categoryId ? (
                    <button
                      onClick={() => handleSaveCategory(category.categoryId)}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCategory(index)}
                      style={{
                        backgroundColor: "orange",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(category.categoryId)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
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
