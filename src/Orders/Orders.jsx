import React, { useState } from "react";
 import "./Orders.css";

const Orders = () => {
  const dummyOrders = [
    {
      id: "2141257",
      status: "Shipping",
      date: "21/03/2024",
      contact: {
        name: "Dilani Perera",
        email: "perera@gmail.com",
        phone: "+94762208789",
      },
      shippingAddress: "No 21/B, Colombo Road, Galle",
      payment: {
        method: "Visa ***0676",
        shippingFee: 0.56,
        totalPaid: 46,
      },
      items: [
        {
          imageUrl: "https://via.placeholder.com/100",
          name: "T-shirt with multiple colors",
          quantity: 2,
          price: 15,
        },
        {
          imageUrl: "https://via.placeholder.com/100",
          name: "T-shirt with multiple colors",
          quantity: 2,
          price: 15,
        },
      ],
    },
    {
      id: "2141258",
      status: "To Pay",
      date: "22/03/2024",
      contact: {
        name: "Nirasha Senanayake",
        email: "nirasha@gmail.com",
        phone: "+94762345678",
      },
      shippingAddress: "No 10/C, Kandy Road, Colombo",
      payment: {
        method: "MasterCard ***1234",
        shippingFee: 1.25,
        totalPaid: 32,
      },
      items: [
        {
          imageUrl: "https://via.placeholder.com/100",
          name: "Black Jeans",
          quantity: 1,
          price: 25,
        },
        {
          imageUrl: "https://via.placeholder.com/100",
          name: "Red Shirt",
          quantity: 1,
          price: 7,
        },
      ],
    },
  ];

  const [orders] = useState(dummyOrders);

  return (
    <div className="orders-container">
      <div className="my-orders">
        <div className="order-status-links">
          <div>
            <span>My Orders</span>
          </div>
          
        </div>

        <div className="order-filters">
          <label htmlFor="orderFilter">Show :</label>
          <select id="orderFilter">
            <option>All Orders</option>
            <option>Return</option>
            <option>To Pay</option>
            <option>To Ship</option>
            <option>To Receive</option>
            <option>To Review</option>
          </select>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id-status">
                <span>Order ID: {order.id}</span>
                <span className="order-status">{order.status}</span>
              </div>
              <div className="order-buttons">
                <button className="cancel-order">Cancel Order</button>
                <button className="track-order">Track Order</button>
              </div>
            </div>

            <div className="order-date">
              <span>Date: {order.date}</span>
            </div>

            <div className="order-details">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="contact-info">
                        <h3>Contact person</h3>
                        <p>Name: {order.contact.name}</p>
                        <p>Email: {order.contact.email}</p>
                        <p>Phone Number: {order.contact.phone}</p>
                      </div>
                    </td>
                    <td>
                      <div className="shipping-address">
                        <h3>Shipping Address</h3>
                        <p>{order.shippingAddress}</p>
                      </div>
                    </td>
                    <td>
                      <div className="payment-info">
                        <h3>Payment</h3>
                        <p>{order.payment.method}</p>
                        <p>Shipping fee: ${order.payment.shippingFee}</p>
                        <p>Total Paid: ${order.payment.totalPaid}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Order Items */}
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="item">
                  <img src={item.imageUrl} alt={item.name} />
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} x ${item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
