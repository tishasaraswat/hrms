import { useState } from "react";
import "./signup.css";
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        standard: "",
        address: "",
        city: "",
        state: "",

    });
    const [msg, setMsg] = useState()
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

    const onUpdateField = e => {
        console.log("form", form)
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);

    };
   

    const onSubmitForm = async e => {
        console.log("hiii ")
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${BASE_API_URL}user/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                console.log("msg check", response.msg)

                if (response.ok) {
                    const data = await response.json();
                   
                    if (data.success) {
                        setMsg(data.msg)
                         setForm({
                            fname: "",
                            lname: "",
                            email: "",
                            password: "",
                            dob: "",
                            gender: "",
                            standard: "",
                            address: "",
                            city: "",
                            state: "",
                        });
                    } else {
                        setMsg(data.msg)
                    }

                     console.log(data.msg);
                    setMsg(data.msg)
                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.log("error front", error)
                console.error('Error occurred:', error);
            }
        }
    };

    return (
        <div className="loginContainer">
            <form className="form" onSubmit={onSubmitForm}>
                <div className="formGroup">
                    <label className="formLabel">Signup</label>
                    <input
                        className="formField"
                        type="text"
                        aria-label="fname Field"
                        name="fname"
                        placeholder="Enter your First name"
                        value={form.fname}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="text"
                        aria-label="lname Field"
                        name="lname"
                        placeholder="Enter your Last name"
                        value={form.lname}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="email"
                        aria-label="Email field"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={onUpdateField}
                    />
                    {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}

                </div>
                <div className="formGroup password-input-container">
                    <input
                        className="formField"
                        //type="password"
                        type={showPassword ? "text" : "password"}
                        aria-label="Password field"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={onUpdateField}
                    />
                    {errors.password && <span className="error" style={{ color: 'red' }}>{errors.password}</span>}

                    <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                            style={{ height: "18px" }}
                        />

                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="date"
                        aria-label="dob field"
                        name="dob"
                        placeholder="Enter your DOB"
                        value={form.dob}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="text"
                        aria-label="gender Field"
                        name="gender"
                        placeholder="Enter your gender"
                        value={form.gender}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="text"
                        aria-label="standard Field"
                        name="standard"
                        placeholder="Enter your standard"
                        value={form.standard}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="text"
                        aria-label="address Field"
                        name="address"
                        placeholder="Enter your address"
                        value={form.address}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="text"
                        aria-label="city Field"
                        name="city"
                        placeholder="Enter your city"
                        value={form.city}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formGroup">
                    <input
                        className="formField"
                        type="text"
                        aria-label="state Field"
                        name="state"
                        placeholder="Enter your state"
                        value={form.state}
                        onChange={onUpdateField}
                    />
                </div>
                <div className="formActions">

                    <button className="formSubmitBtn" type="submit">
                        Signup
                    </button>
                </div>
                <h6 style={{ color: "green" }}>{msg}</h6>

            </form>
            <div className="formGroup">
                <label className="formLabelAgain">If you want to login <u><Link to="/login" style={{ color: 'black' }}>Login</Link></u>,
                </label>

            </div>
        </div>
    );
};

export default SignUpForm;
