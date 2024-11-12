import React from 'react';
import './Notification.css'; // Importing CSS file for styling

const notifications = [
  { id: 1, message: 'Lorem ipsum dolor sit amet.', time: 'just now', read: false },
  { id: 2, message: 'Lorem ipsum dolor sit amet.', time: '20 minutes ago', read: false },
  { id: 3, message: 'Lorem ipsum dolor sit amet.', time: '1 hour ago', read: true },
  { id: 4, message: 'Lorem ipsum dolor sit amet.', time: 'yesterday', read: true },
  { id: 5, message: 'Lorem ipsum dolor sit amet.', time: 'yesterday', read: true },
  { id: 6, message: 'Lorem ipsum dolor sit amet.', time: 'yesterday', read: true },
];

const Notification = () => {
  return (
    <div className="notification-container">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="mark-all-read">Mark all as read</button>
      </div>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification-item ${notification.read ? 'read' : ''}`}>
            <div className="avatar">
              <img src="https://via.placeholder.com/40" alt="User avatar" />
            </div>
            <div className="notification-content">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {!notification.read && <div className="status-indicator" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
