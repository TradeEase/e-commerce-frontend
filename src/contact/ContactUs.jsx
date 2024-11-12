import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted: ", formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <div style={styles.box}>
        <div style={styles.content}>
          <div style={styles.leftSection}>
            <h2 style={styles.subTitle}>Get in Touch</h2>
            <p style={styles.paragraph}>
              Need to get in touch with us? Either fill out the form with your inquiry or find the department email you’d like to contact below.
            </p>
            
            <div style={{ paddingTop: '150px' }}>
              Tel: 0112 234 298 <br />
              Email: buyswiftinfo@gmail.com <br />
              Address: No 11/40, Kaubedda, Moratuwa.
            </div>
          </div>
          <div style={styles.rightSection}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={styles.textarea}
                  required
                />
              </div>
              <button type="submit" style={styles.button}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  box: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '100px', 
  },
  leftSection: {
    flex: '1',
    marginRight: '20px',
    marginTop:'50px'
  },
  subTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '1rem',
    color: '#555',
    marginTop:'10px'
  },
  rightSection: {
    flex: '1',
    marginRight:'20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '500px',
  },
  textarea: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '500px',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default ContactUs;
