  import React from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import {Routes,Route} from "react-router-dom";
import Property from "./components/admin/Property/Property";
import Createproperty from "./components/admin/Createproperty/Createproperty";
import UpdateProperty from "./components/admin/UpdateProperty/Updateproperty";


import Viewpayment from "./components/owner/Viewpayment/Viewpayment";
import Home from "./components/user/Home/Home";
import OwnerDashbaord from "./components/owner/dashboard";
import Admindashboard from "./components/admin/dashboard";
import User from "./components/admin/User/User";
import Createuser from "./components/admin/Createuser/Createuser";
import Updateuser from "./components/admin/Updateuser/Updateuser";
import Viewdetails from "./components/user/Viewdetails/Viewdetails";
import PayFee from "./components/user/PayFee/PayFee";
import Viewpaymentdetails from "./components/owner/Viewpaymentdetails/Viewpaymentdetails";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/property" element={<Property/>}/>
        <Route path="/createproperty" element={<Createproperty/>}/>
        <Route path="/updateproperty/:id" element={<UpdateProperty/>}/>

        <Route path="/viewpayment" element={<Viewpayment/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin/dashboard" element={<Admindashboard/>}/>
        <Route path="/owner/dashboard" element={<OwnerDashbaord/>}/>
        <Route path="/users" element={<User/>}/>
        <Route path="/createUser"  element={<Createuser/>}/>
        <Route path="/updateuser/:id" element={<Updateuser/>}/>

         <Route path="/viewdetials/:id" element={<Viewdetails/>}/>
        <Route path="/payfee/:id" element={<PayFee/>}/>
        
        <Route path="/viewpaymentdetails/:id" element={<Viewpaymentdetails/>}/>





      </Routes>


    </div>
  )
}

export default App;