
import App from './App.jsx'

import 'bootstrap-icons/font/bootstrap-icons.css';
//bootsrrap css 
import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import "./assets/css/main.min.css"
import "./assets/css/login.css"
import "./assets/vendor/overlay-scroll/OverlayScrollbars.min.css"
import "./assets/vendor/datatables/dataTables.bs5.css"
import "./assets/vendor/datatables/dataTables.bs5-custom.css"
import './index.css'        // ← This makes ALL your CSS work instantly
import ReactDOM from 'react-dom/client'          // ← THIS LINE WAS MISSING
import React from 'react';


import { BrowserRouter } from 'react-router-dom';
// These two lines – ADD THEM HERE
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      
      {/* Add ToastContainer here – it will appear on all pages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  </React.StrictMode>
);

