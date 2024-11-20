import React from "react";
import "./ReturnOrder.css";

const ReturnOrder = () => {
  const orders = [
    {
      orderId: "2142157",
      status: "Return Processing",
      date: "21/03/2024",
      contactPerson: {
        name: "Dilani Perera",
        email: "person@gmail.com",
        phone: "+94762306789",
      },
      shippingAddress: "No 21/B, Colombo Road, Galle",
      payment: {
        method: "visa ****678",
        shippingFee: "0.655",
        totalPaid: "4.65",
      },
      items: [
        {
          image: "https://via.placeholder.com/100",
          description: "T-shirts with multiple colors",
          quantity: 2,
          price: 1.95,
        },
        {
          image: "https://via.placeholder.com/100",
          description: "T-shirts with multiple colors",
          quantity: 2,
          price: 1.95,
        },
      ],
    },
    {
      orderId: "2142157",
      status: "Successfully Return",
      date: "21/03/2024",
      contactPerson: {
        name: "Dilani Perera",
        email: "person@gmail.com",
        phone: "+94762306789",
      },
      shippingAddress: "No 21/B, Colombo Road, Galle",
      payment: {
        method: "visa ****678",
        shippingFee: "0.655",
        totalPaid: "4.65",
      },
      items: [
        {
          image: "https://via.placeholder.com/100",
          description: "T-shirts with multiple colors",
          quantity: 2,
          price: 1.95,
        },
        {
          image: "https://via.placeholder.com/100",
          description: "T-shirts with multiple colors",
          quantity: 2,
          price: 1.95,
        },
      ],
    },
  ];

  return (
    <div className="return-section">
      <h1>Return Section</h1>
      {orders.map((order, index) => (
        <div key={index} className="order-card">
          <div className="order-header">
            <span>
              <strong>Order ID:</strong> {order.orderId}
            </span>
            <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
              {order.status}
            </span>
          </div>
          <div className="order-date">
            <strong>Date:</strong> {order.date}
          </div>
          <div className="order-details">
            <div className="contact-person">
              <strong>Contact person</strong>
              <p>{order.contactPerson.name}</p>
              <p>{order.contactPerson.email}</p>
              <p>{order.contactPerson.phone}</p>
            </div>
            <div className="shipping-address">
              <strong>Shipping Address</strong>
              <p>{order.shippingAddress}</p>
            </div>
            <div className="payment">
              <strong>Payment</strong>
              <p>{order.payment.method}</p>
              <p>Shipping Fee: {order.payment.shippingFee}</p>
              <p>Total Paid: {order.payment.totalPaid}</p>
            </div>
          </div>
          <div className="order-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="item">
                <img src={item.image} alt={item.description} />
                <div>
                  <p>{item.description}</p>
                  <p>
                    {item.quantity} x {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReturnOrder;
