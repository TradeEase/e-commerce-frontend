import React, { useState } from 'react';
import emailjs from "@emailjs/browser";

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

    const serviceID = 'service_uf0kgsk';
    const templateID = 'template_2vmh71j';
    const userID = 'l5gbmN0vsmuax92O6';

    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error details:', error);
        console.error('Error message:', error.text);
        alert('Failed to send the message. Please try again later.');
      });
  };

  return (
    <div style={styles.container1}>
      <p style={styles.titleC}>Contact Us</p>
      <div style={styles.box} className="box-animation">
        <div style={styles.content}>
          <div style={styles.leftSection}>
            <h2 style={styles.subTitle}>Get in Touch</h2>
            <p style={styles.paragraph}>
              Have any questions or feedback? Fill out the form or reach out using the contact details below.
            </p>
            <div style={styles.contactDetails}>
              <p><strong>Tel:</strong> <a href="tel:+94112234298" style={styles.link}>0112 234 298</a></p>
              <p><strong>Email:</strong> <a href="mailto:buyswiftinfo@gmail.com" style={styles.link}>buyswiftinfo@gmail.com</a></p>
              <p><strong>Address:</strong> No 11/40, Kaubedda, Moratuwa.</p>
            </div>
          </div>
          <div style={styles.rightSection} className="form-animation">
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
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
                  placeholder="Write your message here"
                  required
                />
              </div>
              <button type="submit" style={styles.button} className="button-animation">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container1: {
    padding: '40px 20px',
    maxWidth: '1000px',

    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f8ff',
  },
  titleC: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginTop: '100px',
    marginBottom: '30px',
    color: '#004e89',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 78, 137, 0.2)',
    padding: '20px',
    transition: 'transform 0.3s',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    flexWrap: 'wrap',
  },
  leftSection: {
    flex: '1',
    color: '#333',
  },
  subTitle: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#004e89',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  contactDetails: {
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  link: {
    color: '#004e89',
    textDecoration: 'none',
  },
  rightSection: {
    flex: '1',
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
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    minHeight: '120px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#004e89',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

// CSS animations
const stylesGlobal = `
  .box-animation:hover {
    transform: scale(1.05);
  }
  .button-animation:active {
    transform: scale(0.95);
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .form-animation {
    animation: fadeIn 0.8s ease-in-out;
  }
`;

export default ContactUs;
