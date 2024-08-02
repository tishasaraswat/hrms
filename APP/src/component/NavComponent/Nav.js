import React from 'react';
import "./Nav.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = ( ) => {
  const navigate = useNavigate()
  const logout = () => {
    const isConfirmed = window.confirm('Are you sure you want to logout?');     //use this for show popup
    if(isConfirmed){
      localStorage.clear()                    //for remove data on localhost
    navigate('/login')
  }
}

  return (
    <div>
                                                      {/* it's goes  on line no. 26 */}
      {localStorage.getItem("role") === "user" ? (<div class="image-container">        
 
        <nav class="limiter-menu-desktop overlay-text">

          <a class="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMT002DtdTkcxUC673enoeS9S3V8byaGkAgFH7dj1Sgh7rLuw01ydO33bM7aLVGdl_-g&usqp=CAU" alt="IMG-LOGO" />
          </a>
          <div class="menu-desktop">
            <ul class="main-menu">                              
               
              
              <li  ><Link to="/employee" className="nav-item">Employee</Link></li>
              <li  ><Link to="/candidate" className="nav-item">Candidate</Link></li>
              <li  ><Link to="/helpcenter" className="nav-item">HelpCenter</Link></li>
              <li ><Link to="/expenses" className="nav-item">Expenses</Link></li>
              <li ><Link to="/consultancy" className="nav-item">Consultancy</Link></li>
              <li  ><Link to="/edit-user" className="nav-item">Profile</Link></li>
              <li className="nav-item" onClick={logout}> Logout </li>


            </ul>
          </div>
          <div class="wrap-icon-header flex-w flex-r-m">
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
              <i class="zmdi zmdi-search"></i>
            </div>
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" >
              {/* 2{/ <i className="zmdi zmdi-shopping-cart"></i> /} */}
            </div>
            {/* <a class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="0">
            <i class="zmdi zmdi-favorite-outline"></i>
          </a> */}
          </div>
        </nav>
      </div>) : (

        <div class="image-container admin_image">
 
          <nav class="limiter-menu-desktop overlay-text">

            <a class="logo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMT002DtdTkcxUC673enoeS9S3V8byaGkAgFH7dj1Sgh7rLuw01ydO33bM7aLVGdl_-g&usqp=CAU" alt="IMG-LOGO" />
            </a>
            <div class="menu-desktop">
              <ul class="main-menu">

                <li  ><Link to="/admin" className="nav-item">Admin</Link></li>
                <li  ><Link to="/admin-user" className="nav-item">User</Link></li>
                <li  ><Link to="/changepassword" className="nav-item">Change password</Link></li>
                <li  ><Link to="/edit-profile" className="nav-item">Edit Profile</Link></li>
                <li ><Link to="/admin-about" className="nav-item">About</Link></li>
                <li className="nav-item" onClick={logout}> Logout </li>



              </ul>
            </div>
            {/* <div class="wrap-icon-header flex-w flex-r-m">
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                <i class="zmdi zmdi-search"></i>
              </div>
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" >
               </div>
               
            </div> */}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Nav;
