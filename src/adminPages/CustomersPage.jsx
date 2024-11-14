import React, { useState } from "react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    customerId: "",
  });
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const handleAddCustomerClick = () => setShowPopup(true);

  const handleConfirmAddCustomer = () => {
    setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
    setNewCustomer({ name: "", customerId: "", description: "", image: null });
    setShowPopup(false);
  };

  const handleCancelAddCustomer = () => {
    setShowPopup(false);
    setNewCustomer({ name: "", customerId: "", description: "", image: null });
  };

  const handleEdit = (id) => setEditingCustomerId(id);

  const handleSave = (id) => {
    setEditingCustomerId(null);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

 

  return (
    <div>
      <h2 style={{ marginTop: "140px", marginBottom: "20px" }}>Customers</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} style={{ height: "auto" }}>
              <td>
                {editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomers(
                        customers.map((c) =>
                          c.id === customer.id
                            ? { ...c, name: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td>
                {editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={customer.customerId}
                    onChange={(e) =>
                      setCustomers(
                        customers.map((c) =>
                          c.id === customer.id
                            ? { ...c, customerId: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                ) : (
                  customer.customerId
                )}
              </td>
             
              <td>
                {editingCustomerId === customer.id ? (
                  <button onClick={() => handleSave(customer.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(customer.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(customer.id)}>
                  Delete
                </button>
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
        onClick={handleAddCustomerClick}
      >
        Add New Customer
      </button>

      {/* Popup for adding a new customer */}
      {showPopup && (
        <div style={popupStyles}>
          <h2>Add New Customer</h2>
          <input
            type="text"
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Customer ID"
            value={newCustomer.customerId}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, customerId: e.target.value })
            }
          />
          <button onClick={handleConfirmAddCustomer}>Confirm</button>
          <button onClick={handleCancelAddCustomer}>Cancel</button>
        </div>
      )}
    </div>
  );
};

// Basic styling for the popup
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
