import React from 'react';
import Navbar from './components/Navbar';

const AdminHomePage = () => {
  const styles = {
    adminHomepage: {
      display: 'flex',
      height: '100vh',
      marginTop: '85px',
    },
    mainContent: {
      flex: 1,
      padding: '20px',
    },
    topBoxes: {
      display: 'flex',
      gap: '20px',
      marginTop: '30px',
      marginBottom: '30px',
      height: '140px',
    },
    box: {
      flex: 1,
      padding: '20px',
      color: '#fff',
      textAlign: 'center',
      borderRadius: '5px',
    },
    box1: { backgroundColor: '#f39c12' },
    box2: { backgroundColor: '#e74c3c' },
    box3: { backgroundColor: '#2ecc71' },
    tableContainer: {
      width: '100%',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableCell: {
      padding: '12px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    tableHeader: {
      backgroundColor: '#f4f4f4',
    },
  };

  return (
    <div style={styles.adminHomepage}>
      {/* Sidebar Component */}
      <Navbar />

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {/* Top Boxes */}
        <div style={styles.topBoxes}>
          <div style={{ ...styles.box, ...styles.box1 }}>
            <h3>Order Pending</h3>
          </div>
          <div style={{ ...styles.box, ...styles.box2 }}>
            <h3>Order Cancel</h3>
          </div>
          <div style={{ ...styles.box, ...styles.box3 }}>
            <h3>Today Income</h3>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Order ID</th>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Payment Method</th>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Order Date</th>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.tableCell}>12345</td>
                <td style={styles.tableCell}>Credit Card</td>
                <td style={styles.tableCell}>2024-11-10</td>
                <td style={styles.tableCell}>Pending</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>67890</td>
                <td style={styles.tableCell}>PayPal</td>
                <td style={styles.tableCell}>2024-11-11</td>
                <td style={styles.tableCell}>Cancelled</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>11223</td>
                <td style={styles.tableCell}>Bank Transfer</td>
                <td style={styles.tableCell}>2024-11-12</td>
                <td style={styles.tableCell}>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
