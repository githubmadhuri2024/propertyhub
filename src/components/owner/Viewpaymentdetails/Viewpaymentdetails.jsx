import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Both in one import
import axios from "axios";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const Viewpaymentdetails = () => {
  const { id } = useParams();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!id) {
        setError("Invalid payment ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:5000/api/payment/getPaymentdetails/${id}`
        );
        setPayment(response.data);
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError("Failed to load payment details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content-wrapper">
            <div className="container-fluid py-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5 className="mt-3">Loading payment details...</h5>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content-wrapper">
            <div className="container-fluid py-5">
              <div className="alert alert-danger text-center">{error}</div>
              <div className="text-center">
                <Link to="/view-payments" className="btn btn-outline-secondary">
                  ← Back to Payments
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Payment Not Found
  if (!payment) {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content-wrapper">
            <div className="container-fluid py-5">
              <div className="alert alert-warning text-center">
                Payment not found.
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />

      <div className="main-container">
        <Sidebar />

        <div className="content-wrapper-scroll">
          <div className="content-wrapper">
            <div className="container-fluid py-4">
              {/* Back Button */}
              <div className="mb-4">
                <Link to="/view-payments" className="btn btn-outline-secondary">
                  ← Back to Payments List
                </Link>
              </div>

              {/* Main Card */}
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <div className="card shadow-lg border-0">
                    <div
                      className="card-header bg-gradient text-white text-center py-4"
                      style={{
                        background: payment.status === "success" ? "#28a745" : "#dc3545",
                      }}
                    >
                      <h3 className="mb-0">
                        Payment Details
                        <span className="badge bg-light text-dark ms-3 fs-6">
                          {(payment.status || "Unknown").toUpperCase()}
                        </span>
                      </h3>
                    </div>

                    <div className="card-body p-5">
                      {/* Property & Tenant Info */}
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <h5 className="text-primary">Property</h5>
                          <p className="lead mb-1">
                            {payment.propertyDetails?.title || "N/A"}
                          </p>
                          <p className="text-muted">
                            {payment.propertyDetails?.description || ""}<br />
                            Type: {payment.propertyDetails?.type || "N/A"} | 
                            Location: {payment.propertyDetails?.location || "N/A"}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <h5 className="text-primary">Paid By</h5>
                          <p className="lead mb-1">
                            {payment.userDetails?.name || "N/A"}
                          </p>
                          <p className="text-muted">
                            Email: {payment.userDetails?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <hr className="my-5" />

                      {/* Payment Summary */}
                      <div className="row text-center mb-5">
                        <div className="col-md-4">
                          <h4 className="text-success fw-bold">
                            ₹{payment.amount ?? 0}
                          </h4>
                          <p className="text-muted">Amount Paid</p>
                        </div>
                        <div className="col-md-4">
                          <h5>{payment.paymentPurpose || "N/A"}</h5>
                          <p className="text-muted">Purpose</p>
                        </div>
                        <div className="col-md-4">
                          <h5>
                            {payment.paidAt
                              ? new Date(payment.paidAt).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </h5>
                          <p className="text-muted">Payment Date</p>
                        </div>
                      </div>

                      <hr className="my-5" />

                      {/* Transaction Details */}
                      <h5 className="text-primary mb-4">Transaction Information</h5>
                      <div className="bg-light p-4 rounded">
                        <div className="row g-4">
                          <div className="col-sm-6">
                            <strong>Razorpay Payment ID:</strong><br />
                            <code>{payment.razorpayPaymentId || "N/A"}</code>
                          </div>
                          <div className="col-sm-6">
                            <strong>Razorpay Order ID:</strong><br />
                            <code>{payment.razorpayOrderId || "N/A"}</code>
                          </div>
                          <div className="col-sm-6">
                            <strong>Payment Method:</strong><br />
                            <span className="text-capitalize">
                              {payment.paymentMethod || "N/A"}
                            </span>
                          </div>
                          <div className="col-sm-6">
                            <strong>Transaction Time:</strong><br />
                            {payment.paidAt
                              ? new Date(payment.paidAt).toLocaleString("en-IN")
                              : "N/A"}
                          </div>
                        </div>
                      </div>

                      {/* Success Message */}
                      {payment.status === "success" && (
                        <div className="alert alert-success text-center mt-5">
                          <i className="fas fa-check-circle fa-2x mb-3"></i>
                          <h4>Payment Successful!</h4>
                          <p>Thank you for your payment. A receipt has been recorded.</p>
                        </div>
                      )}
                    </div>

                    {/* Fixed: Safe createdAt access */}
                    <div className="card-footer text-center py-4">
                      <small className="text-muted">
                        Payment recorded on:{" "}
                        {payment.createdAt
                          ? new Date(payment.createdAt).toLocaleString("en-IN")
                          : "N/A"}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Viewpaymentdetails;