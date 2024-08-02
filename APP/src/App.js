 import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
//user side-------------------------------------
import SignUpForm from './component/Signup/signup';
import Login from './component/Login/login';
import Nav from './component/NavComponent/Nav';
import Footer from './component/FooterModule/footer';
import Employee from './component/user/employee/Employee';
import Candidate from './component/user/candidate/Candidate';
import UserHome from './component/user/userhome/UserHome';
import Consultancy from './component/user/Consultancy/Consultancy'; 
import HelpCenter from './component/user/HelpCenter/HelpCenter';
import Expenses from './component/user/Expenses/Expenses'
import EditProfile from './component/user/EditProfile/EditProfile';
// ADMIN SIDE------------------- 
import AdminHome from './component/Admin/AdminHome/AdminHome';
import AboutHome from './component/Admin/AboutAdmin/AboutAdmin';
import ChangePassword from './component/Admin/ChangePassword/ChangePass';
import EditAdmin from './component/Admin/EditAdmin/EditAdmin';
import UserData from './component/Admin/UserData/UserData';





function App() {
  
  return (
  <>
  <Router>
    <Routes>
       {/* here we are creating USER side ROUTING------------------- */} 

<Route path = "/signup" element = {<SignUpForm />} />   
<Route path = "/*" element = {<Login />} />
<Route path = "/nav" element = {<Nav />} />
<Route path = "/footer" element = {<Footer />} />
 <Route path = "/employee" element = {<Employee />} /> 
 <Route path = "/candidate" element = {<Candidate />} />
 <Route path = "/user" element = {<UserHome />} />
 <Route path = "/consultancy" element = {<Consultancy />} />
 <Route path = "/helpcenter" element = {<HelpCenter />} />
 <Route path='/expenses' element = {<Expenses />} />
 <Route path = "/edit-user" element = {<EditProfile />} />

 {/* here we are creating ADMIN side ROUTING------------------- */} 
 <Route path="/admin" element={<AdminHome/>} />
 <Route path="/admin-about" element={<AboutHome />} />
 <Route path="/changepassword" element={<ChangePassword />} />
 <Route path='/edit-profile' element={<EditAdmin />} />
 <Route path='/admin-user' element={<UserData />} />







      </Routes>
  </Router>

  
      </>
     
  );
}

export default App;
