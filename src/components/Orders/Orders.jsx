import React from "react";
import "./Orders.css";

const Orders = () => {
  return (
    <div className="orders-container">
      {/* Extra header bar */}
      <div className="header-bar"></div>

      <div className="my-orders">
        <div className="order-status-links">

          <div>
            <span>My Orders</span>
          </div>
          <div>
            <span>All</span>
            <span>Return</span>
            <span>To Pay</span>
            <span>To Ship</span>
            <span>To Receive</span>
            <span>To Review</span>
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

        <div className="order-card">
          <div className="order-header">
            <div className="order-id-status">
              <span>Order ID: 2141257</span>
              <span className="order-status">Shipping</span>
            </div>
            <div className="order-buttons">
              <button className="cancel-order">Cancel Order</button>
              <button className="track-order">Track Order</button>
            </div>
          </div>

          <div className="order-date">
            <span>Date: 21/03/2024</span>
          </div>

          <div className="order-details">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="contact-info">
                      <h3>Contact person</h3>
                      <p>Name: Dilani Perera</p>
                      <p>Email: perera@gmail.com</p>
                      <p>Phone Number: +94762208789</p>
                    </div>
                  </td>
                  <td>
                    <div className="shipping-address">
                      <h3>Shipping Address</h3>
                      <p>No 21/B, Colombo Road, Galle</p>
                    </div>
                  </td>
                  <td>
                    <div className="payment-info">
                      <h3>Payment</h3>
                      <p>Visa ***0676</p>
                      <p>Shipping fee: $0.56</p>
                      <p>Total Paid: $46</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Items */}
          <div className="order-items">
            <div className="item">
              <img src="https://via.placeholder.com/100" alt="Product 1" /> 
            </div>
            <div className="item">
              <p>T-shirt with multiple colors</p>
              <p>2 x 15$</p>
            </div>
            <div className="item">
              <img src="https://via.placeholder.com/100" alt="Product 2" />
            </div>
            <div className="item">
            <p>T-shirt with multiple colors</p>
              <p>2 x 15$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;



// Above code is only to show the order card. To connect backend use the below code 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Orders.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Replace with your backend API URL
//     axios.get("http://localhost:5000/api/orders")
//       .then(response => setOrders(response.data))
//       .catch(error => console.error("Error fetching orders:", error));
//   }, []);

//   return (
//     <div className="orders-container">
//       <div className="header-bar"></div>

//       <div className="my-orders">
//         <div className="order-status-links">
//           <div>
//             <span>My Orders</span>
//           </div>
//           <div>
//             <span>All</span>
//             <span>Return</span>
//             <span>To Pay</span>
//             <span>To Ship</span>
//             <span>To Receive</span>
//             <span>To Review</span>
//           </div>
//         </div>

//         <div className="order-filters">
//           <label htmlFor="orderFilter">Show :</label>
//           <select id="orderFilter">
//             <option>All Orders</option>
//             <option>Return</option>
//             <option>To Pay</option>
//             <option>To Ship</option>
//             <option>To Receive</option>
//             <option>To Review</option>
//           </select>
//         </div>

//         {orders.map(order => (
//           <div key={order.id} className="order-card">
//             <div className="order-header">
//               <div className="order-id-status">
//                 <span>Order ID: {order.id}</span>
//                 <span className="order-status">{order.status}</span>
//               </div>
//               <div className="order-buttons">
//                 <button className="cancel-order">Cancel Order</button>
//                 <button className="track-order">Track Order</button>
//               </div>
//             </div>

//             <div className="order-date">
//               <span>Date: {new Date(order.date).toLocaleDateString()}</span>
//             </div>

//             <div className="order-details">
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <div className="contact-info">
//                         <h3>Contact person</h3>
//                         <p>Name: {order.contact.name}</p>
//                         <p>Email: {order.contact.email}</p>
//                         <p>Phone Number: {order.contact.phone}</p>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="shipping-address">
//                         <h3>Shipping Address</h3>
//                         <p>{order.shippingAddress}</p>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="payment-info">
//                         <h3>Payment</h3>
//                         <p>{order.paymentMethod}</p>
//                         <p>Shipping fee: ${order.shippingFee}</p>
//                         <p>Total Paid: ${order.totalPaid}</p>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Order Items */}
//             <div className="order-items">
//               {order.items.map((item, index) => (
//                 <div key={index} className="item">
//                   <img src={item.imageUrl} alt={item.name} />
//                   <p>{item.name}</p>
//                   <p>{item.quantity} x ${item.price}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
