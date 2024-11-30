import React, { useState, useEffect } from "react";
import axios from "axios";


const API_BASE_URL = "http://localhost:8081/api/users"; 

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    fname: "",
    lname: "",
  });
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  // Fetch customers from the backend
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Add a new customer
  const handleConfirmAddCustomer = () => {
    axios
      .post(API_BASE_URL, newCustomer)
      .then((response) => {
        setCustomers([...customers, { ...newCustomer, userid: response.data }]);
        setNewCustomer({ fname: "", lname: "" });
        setShowPopup(false);
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  // Delete a customer
  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/${id}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer.userid !== id));
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  // Save updated customer
  const handleSave = (id) => {
    const customerToUpdate = customers.find((customer) => customer.userid === id);
    axios
      .put(`${API_BASE_URL}/${id}`, customerToUpdate)
      .then(() => {
        setEditingCustomerId(null);
      })
      .catch((error) => console.error("Error updating customer:", error));
  };

  return (
    <div>
      <h2 style={{ marginTop: "140px", marginBottom: "20px" }}>Customers</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.userid} style={{ height: "auto" }}>
              <td>
                {editingCustomerId === customer.userid ? (
                  <input
                    type="text"
                    value={customer.fname}
                    onChange={(e) =>
                      setCustomers(
                        customers.map((c) =>
                          c.userid === customer.userid
                            ? { ...c, fname: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                ) : (
                  customer.fname
                )}
              </td>
              <td>
                {editingCustomerId === customer.userid ? (
                  <input
                    type="text"
                    value={customer.lname}
                    onChange={(e) =>
                      setCustomers(
                        customers.map((c) =>
                          c.userid === customer.userid
                            ? { ...c, lname: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                ) : (
                  customer.lname
                )}
              </td>
              <td>
                {editingCustomerId === customer.userid ? (
                  <button onClick={() => handleSave(customer.userid)}>Save</button>
                ) : (
                  <button onClick={() => setEditingCustomerId(customer.userid)}>Edit</button>
                )}
                <button onClick={() => handleDelete(customer.userid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{
          marginBottom: "130px",
          marginTop: "50px",
          backgroundColor: "purple",
          color: "white",
        }}
        onClick={() => setShowPopup(true)}
      >
        Add New Customer
      </button>

      {/* Popup for adding a new customer */}
      {showPopup && (
        <div style={popupStyles}>
          <h2>Add New Customer</h2>
          <input
            type="text"
            placeholder="First Name"
            value={newCustomer.fname}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, fname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newCustomer.lname}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, lname: e.target.value })
            }
          />
          <button onClick={handleConfirmAddCustomer}>Confirm</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

const popupStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export default CustomersPage;
