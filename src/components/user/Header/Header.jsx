
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
const Footer=()=>{
 const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    const checkLoginStatus = () => {
      const id = sessionStorage.getItem("id");
      setIsLoggedIn(!!id);
    };

    checkLoginStatus();

    // Optional: Listen to storage events (in case multiple tabs)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // 🔥 Sync React state with sessionStorage
  useEffect(() => {
    const checkLoginStatus = () => {
    const id = sessionStorage.getItem("id");
    setIsLoggedIn(!!id);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent Link from navigating first
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <a className="navbar-brand fw-bold" href="#"><i className="fas fa-home"></i> PropertyHub</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item"><Link className="nav-link" to="/property">Properties</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/payfee">Pay Fee</Link></li>
          <li className="nav-item"><Link className="nav-link" to="">Contact</Link></li>
          {isLoggedIn ? (
  <li className="nav-item">
    <Link className="nav-link btn btn-outline-light px-4 ms-3" onClick={handleLogout}>
      Logout
    </Link>
  </li>
) : (
  <li className="nav-item">
    <Link
      className="nav-link btn btn-outline-light px-4 ms-3"  to="/login"
      
    >
      Login
    </Link>
  </li>
)}

        </ul>
      </div>
    </div>
  </nav>
    

    </div>
  )
}
export default Footer;