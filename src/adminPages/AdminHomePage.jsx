import React from 'react';
import './AdminHomePage.css';

const AdminHomePage = () => {
  return (
    <div className="admin-homepage">
      {/* Left Navigation Bar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <a href="#customers">Customers</a>
          <a href="#products">Products</a>
          <a href="#admin-creation">Admin Creation</a>
          <a href="#categories">Categories</a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Boxes */}
        <div className="top-boxes">
          <div className="box box1">
            <h3>Order Pending</h3>
          </div>
          <div className="box box2">
            <h3>Order Cancel</h3>
          </div>
          <div className="box box3">
            <h3>Today Income</h3>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Payment Method</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12345</td>
                <td>Credit Card</td>
                <td>2024-11-10</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>67890</td>
                <td>PayPal</td>
                <td>2024-11-11</td>
                <td>Cancelled</td>
              </tr>
              <tr>
                <td>11223</td>
                <td>Bank Transfer</td>
                <td>2024-11-12</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
