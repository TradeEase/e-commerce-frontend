import React from "react";
import "./Cancel_Orders.css";

const Cancel_Orders = () => {
  return (
    <div className="cancel-order-container">
      {/* Black header bar at the top */}
      <header className="top-header"></header>

      {/* Heading at the top */}
      <h2>Cancel Order</h2>

      {/* Order info centered on screen */}
      <div className="order-info-container">
        <div className="order-info">
          {/* Order Header */}
          <div className="order-header">
            <div>
              <p>Order ID: 2141257</p>
              <p>Date: 21/03/2024</p>
            </div>
            <button className="cancel-order-btn">Cancel Order</button>
          </div>

          {/* Order Timeline */}
          <div className="order-timeline">
            <div className="timeline-step">
              <div className="circle"></div>
              <p>Ordered</p>
              <p>Tue, July 17</p>
            </div>
            <div className="timeline-bar"></div>
            <div className="timeline-step">
              <div className="circle"></div>
              <p>Expected Shipping</p>
              <p>Tue, July 25</p>
            </div>
            <div className="timeline-bar"></div>
            <div className="timeline-step">
              <div className="circle"></div>
              <p>Expected Delivery</p>
              <p>Tue, July 30</p>
            </div>
          </div>

          {/* Order Details Table */}
          <table className="order-details-table">
            <tbody>
              <tr>
                <td>
                  <h4>Contact Person</h4>
                  <p>Name: Dilan Perera</p>
                  <p>Email: perera@gmail.com</p>
                  <p>Phone Number: +94762207659</p>
                </td>
                <td>
                  <h4>Shipping Address</h4>
                  <p>No 21/B,</p>
                  <p>Colombo Road,</p>
                  <p>Galle</p>
                </td>
                <td>
                  <h4>Payment</h4>
                  <p>Visa ****9876</p>
                  <p>Shipping fee: 0.5$</p>
                  <p>Total Paid: 4.5$</p>
                </td>
              </tr>
            </tbody>
          </table>

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

          {/* Cancel Reason */}
          <div className="cancel-reason">
            <h4>Reasons for cancel order</h4>
            <label>
              <input type="radio" name="reason" /> Change my choice
            </label>
            <label>
              <input type="radio" name="reason" /> Take more time to process
            </label>
            <label>
              <input type="radio" name="reason" /> Other
            </label>
            <input type="text" placeholder="Other Reason" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel_Orders;


// Above code is only to show the cancel order card. To connect backend use the below code 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Cancel_Orders.css";

// const Cancel_Orders = () => {
//   const [orderData, setOrderData] = useState(null);
//   const [cancelReason, setCancelReason] = useState("");

//   useEffect(() => {
//     // Fetch order details from backend
//     axios.get("/api/orders/2141257") // Replace with your actual backend endpoint
//       .then(response => {
//         setOrderData(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching order data:", error);
//       });
//   }, []);

//   if (!orderData) return <p>Loading...</p>;

//   const handleCancelReasonChange = (e) => {
//     setCancelReason(e.target.value);
//   };

//   return (
//     <div className="cancel-order-container">
//       <header className="top-header"></header>
//       <h2>Cancel Order</h2>

//       <div className="order-info-container">
//         <div className="order-info">
//           <div className="order-header">
//             <div>
//               <p>Order ID: {orderData.orderId}</p>
//               <p>Date: {orderData.date}</p>
//             </div>
//             <button className="cancel-order-btn">Cancel Order</button>
//           </div>

//           <div className="order-timeline">
//             {orderData.timeline.map((step, index) => (
//               <React.Fragment key={index}>
//                 <div className="timeline-step">
//                   <div className="circle"></div>
//                   <p>{step.status}</p>
//                   <p>{step.date}</p>
//                 </div>
//                 {index < orderData.timeline.length - 1 && (
//                   <div className="timeline-bar"></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           <table className="order-details-table">
//             <tbody>
//               <tr>
//                 <td>
//                   <h4>Contact Person</h4>
//                   <p>Name: {orderData.contactPerson.name}</p>
//                   <p>Email: {orderData.contactPerson.email}</p>
//                   <p>Phone Number: {orderData.contactPerson.phone}</p>
//                 </td>
//                 <td>
//                   <h4>Shipping Address</h4>
//                   <p>{orderData.shippingAddress.line1}</p>
//                   <p>{orderData.shippingAddress.line2}</p>
//                   <p>{orderData.shippingAddress.city}</p>
//                 </td>
//                 <td>
//                   <h4>Payment</h4>
//                   <p>{orderData.payment.method} ****{orderData.payment.last4}</p>
//                   <p>Shipping fee: {orderData.payment.shippingFee}$</p>
//                   <p>Total Paid: {orderData.payment.total}$</p>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="order-items">
//             {orderData.items.map((item, index) => (
//               <div className="item" key={index}>
//                 <img src={item.image} alt={item.name} />
//                 <div>
//                   <p>{item.name}</p>
//                   <p>{item.quantity} x {item.price}$</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cancel-reason">
//             <h4>Reasons for cancel order</h4>
//             <label>
//               <input 
//                 type="radio" 
//                 name="reason" 
//                 value="Change my choice" 
//                 onChange={handleCancelReasonChange} 
//               /> Change my choice
//             </label>
//             <label>
//               <input 
//                 type="radio" 
//                 name="reason" 
//                 value="Take more time to process" 
//                 onChange={handleCancelReasonChange} 
//               /> Take more time to process
//             </label>
//             <label>
//               <input 
//                 type="radio" 
//                 name="reason" 
//                 value="Other" 
//                 onChange={handleCancelReasonChange} 
//               /> Other
//             </label>
//             {cancelReason === "Other" && (
//               <input 
//                 type="text" 
//                 placeholder="Other Reason" 
//                 onChange={(e) => setCancelReason(e.target.value)} 
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cancel_Orders;
