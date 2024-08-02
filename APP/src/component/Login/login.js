/*here we are importing required files and package */

import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/*here we are coding for state using usestate*/

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const [msg, setmsg] = useState('');
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

const [form, setForm] = useState({
    email: "",
    password: "",
});

/*here we are coding for function*/

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const onUpdateField = e => {
    const { name, value } = e.target;
    setForm({
        ...form,                        //spred function(...)
        [name]: value,
    });

    setErrors({
        ...errors,
        [name]: "",
    });
    // Clear validation error when user starts typing
   
};

const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
    }

    if (!form.password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
};

const onSubmitForm = async e => {
    e.preventDefault();
    if (validateForm()) {
        try {
            const response = await fetch(`${BASE_API_URL}user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            setmsg(data.msg)
            if (response.ok) {
                // Handle successful login
                console.log(data.user._id);
                try {
                    const response = await fetch(`${BASE_API_URL}user/get?userid=${data.user._id}`, {    // ? jiski id ho v km kre
                        method: 'GET',
                    });

                    // Check if the response is successful (status code 200)
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    // Parse the JSON response
                    const userData = await response.json();
                    console.log("User data:", userData);
                    const name = userData.data.fname + " " + userData.data.lname
                    localStorage.setItem("_id", userData.data._id)
                    localStorage.setItem("name", name)
                    localStorage.setItem("email", userData.data.email)
                    localStorage.setItem("password", userData.data.password)
                    localStorage.setItem("role", userData.data.role)
                    if (userData.data.role === "admin") {
                        navigate('/admin');
                    }

                    else {
                        navigate('/user');
                    }

                } catch (err) {
                    // Handle errors
                    console.error("Error fetching user data:", err);
                }

            } else {
                // Handle unsuccessful login
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
};


//here we are coding for ui
return(
<>
    <div className="loginContainer">
    <form className="form" onSubmit={onSubmitForm}>
        <div className="formGroup">
            <label className="formLabel">Login</label>
            <input
                className="formField"
                type="text"
                aria-label="Email field"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={onUpdateField}
            />

        </div>
         <div className="formGroup password-input-container">
            <input
                className="formField"
               // type="password"
               type={showPassword ? "text" : "password"}                       //password means hide and text means show
                aria-label="Password field"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={onUpdateField}
            />

                     <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                            style={{ height: "18px" }}
                        />
          

        </div> 
        <div className="formActions">
            <button className="formSubmitBtn" type="submit">
                 Login

            </button>

        </div>

        <h6 style={{ color: 'green' }}>{msg}</h6>

     </form>
    <div className="formGroup">
        <label className="formLabelAgain">Need an account? <u><Link to="/signup" style={{ color: 'black' }}>Signup</Link></u>,
        </label>
    </div>
</div>

</>
)

};


export default LoginForm;
