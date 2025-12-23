import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
const Viewdetails=()=>{
  const userId=sessionStorage.getItem('id');
  const [loading, setLoading] = useState(false);  // ← This was missing!
  const {id}=useParams();
  const navigate=useNavigate();
  const[property,setProperty]=useState({});
  const  fetchProperty=async()=>{
    try{
      const res=await axios.get(`http://localhost:5000/api/property/getProperty/${id}`);
    setProperty(res.data);
    }
    catch(err){
    console.error("error fetching property:",err);
    }
     

  }
  useEffect(()=>{
    fetchProperty();
  
  },[]);

  const handlePayment = async () => {
    setLoading(true);
      const amount = Number(property.price); // ₹

    try {
      // Create order
      const orderRes = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount,
        propertyId: property._id,
        ownerId: userId// Replace with real user ID from auth
      });

      const { order_id } = orderRes.data;

      // Open Razorpay
      const options = {
        key: 'rzp_test_RtNHG63RNKLYih', // Paste your Test Key ID
        amount: amount * 100,
        currency: 'INR',
        name: 'PropertyHub',
        description: `Maintenance Fee for ${property.name}`,
        order_id: order_id,
        handler: async (response) => {
           console.log("Razorpay SUCCESS response:", response);

    if (!response.razorpay_signature) {
      alert("Payment not completed. Signature missing.");
      return;
    }
          const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', {

            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            propertyId: property._id,
            userId: userId,
            amount: amount,
            status:"success"
            

          }
        );

          if (verifyRes.data.success) {
            alert('Maintenance Fee Paid Successfully!');
            // Refresh or update UI
            window.location.reload();
            navigate('/home');
          }
        },
        prefill: { name: 'madhu', email: 'madhujeshu2021@gmail.com', contact: '7093482917' },
        theme: { color: '#F37254' }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async () => {
      await axios.post('http://localhost:5000/api/payment/verify', {
        status: "failure",
        propertyId: property._id,
        userId,
        amount
      });

      alert("Payment failed. Try again.");
    });
      rzp.open();
    } catch (error) {
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };
  return(
    <div>

  <Header/>
   <Navbar/>
      <div className="container mt-5 pt-5"  key={property?._id}>
      <h2 className="fw-bold mb-3">Property Details</h2>
      {/* <p className="text-muted">Property ID:{property.id}</p> */}

      <div className="card shadow p-4">
        
        <img
          src={`http://localhost:5000/uploads/${property.image}`}
          alt="Sunshine Apartments"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />

        <h4 className="fw-bold">{property.title}</h4>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Maintenance:</strong>{property.price}</p>
{!property.maintenancePaid ? (
        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Maintenance Fee'}
        </button>
      ) : (
        <p>Maintenance Paid ✓ (Last: {property.lastPaidDate})</p>
      )}
        
      </div>
    </div>
    <Footer/>

</div>
  )
}
export default Viewdetails;