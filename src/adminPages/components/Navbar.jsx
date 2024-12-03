import React from 'react';

const Navbar = () => {
  const styles = {
    sidebar: {
      width: '200px',
      padding: '20px',
      backgroundColor: '#333',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      marginBottom: '20px',
    },
    navLink: {
      color: '#fff',
      padding: '10px',
      marginTop: '10px',
      display: 'block',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Dashboard</h2>
      <nav>
      <a href="/admincreation" style={styles.navLink}>
          Admin Creation
        </a>
        <a href="/customers" style={styles.navLink}>
          Customers
        </a>
        <a href="/adminproducts" style={styles.navLink}>
          Products
        </a>
        <a href="/categories" style={styles.navLink}>
          Categories
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
