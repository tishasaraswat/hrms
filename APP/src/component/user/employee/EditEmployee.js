// Modal.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants.js';

const ModalBox = ({ isOpen, onRequestClose, employeeId }) => {

    const [data, setData] = useState([])
        // for set message---------------
        const [message, setMessage] = useState('');
    useEffect(() => {

        if (isOpen) {
            console.log('model open', employeeId)
            // Fetch data for the given employeeId
            if (employeeId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}employee/getemployeebyid?employeeid=${employeeId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching employee data:', error);
                    }
                };

                fetchData();
            }
        }
    }, [isOpen]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

        // here we use async await for showing messag-------------

    const handleSubmit = async (e) => {
        console.log("data", data)
        e.preventDefault();
        // Handle form submission here
        try {
            const response =  await axios.put(`${BASE_API_URL}employee/edit`, data);
            console.log(response.data); // Handle the response as needed
            setMessage(response.data.msg);

        } catch (error) {
            console.error('Error:', error);

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            style={{
                overlay: {

                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    width: '90%',
                    height: '90%',
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '20px'
                }
            }}
        >
            <button onClick={onRequestClose}>Close</button>

            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="signup-form">
                        <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Your profile</h4>

                            </div>
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                <label> <b>First Name</b></label>

                                    <input type="text" name="employee_first_name" value={data.employee_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Last Name</b></label>

                                    <input type="text" name="employee_last_name" value={data.employee_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Mobile No.</b></label>

                                    <input type="text" name="employee_mobile" value={data.employee_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Alternate Mobile No.</b></label>

                                    <input type="text" name="employee_alternate_mobile" value={data.employee_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Email</b></label>

                                    <input type="email" name="employee_email" value={data.employee_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Password</b></label>

                                    <input type="text" name="employee_password" value={data.employee_password} onChange={handleInputChange} class="form-control" placeholder="Password" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Address</b></label>

                                    <input type="text" name="employee_address" value={data.employee_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>City</b></label>

                                    <input type="text" name="employee_city" value={data.employee_city} onChange={handleInputChange} class="form-control" placeholder="City" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b> State</b></label>

                                    <input type="text" name="employee_state" value={data.employee_state} onChange={handleInputChange} class="form-control" placeholder="State" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Other Info</b></label>

                                    <input type="text" name="employee_other_info" value={data.employee_other_info} onChange={handleInputChange} class="form-control" placeholder="Employee Other Info" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>DOB</b></label>

                                    <input type="date" name="employee_dob" value={data.employee_dob} onChange={handleInputChange} class="form-control" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label ><b>DOJ</b></label>

                                    <input type="date" name="employee_doj" value={data.employee_doj} onChange={handleInputChange} class="form-control" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b> Skills</b></label>

                                    <input type="text" name="employee_skills" value={data.employee_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Experience</b></label>

                                    <input type="text" name="employee_experience" value={data.employee_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Resume</b></label>

                                    <input type="text" name="employee_resume" value={data.employee_resume} onChange={handleInputChange} class="form-control" placeholder="Resume" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>ID Proof</b></label>

                                    <input type="text" name="employee_id_proof" value={data.employee_id_proof} onChange={handleInputChange} class="form-control" placeholder="Id Proof" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Permanant Address Proof</b></label>

                                    <input type="text" name="employee_permanant_address_proof" value={data.employee_permanant_address_proof} onChange={handleInputChange} class="form-control" placeholder="Permanant Address Proof" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Local Address Proof</b></label>

                                    <input type="text" name="employee_local_address_proof" value={data.employee_local_address_proof} onChange={handleInputChange} class="form-control" placeholder="Local Address Proof" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Reference First Name</b></label>

                                    <input type="text" name="employee_reference_one_name" value={data.employee_reference_one_name} onChange={handleInputChange} class="form-control" placeholder="Reference One Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Reference First Mobile</b></label>

                                    <input type="text" name="employee_reference_one_mobile" value={data.employee_reference_one_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference One Mobile" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Reference Second Name</b></label>

                                    <input type="text" name="employee_reference_two_name" value={data.employee_reference_two_name} onChange={handleInputChange} class="form-control" placeholder="Reference Two Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label> <b>Reference Second Mobile</b></label>

                                    <input type="text" name="employee_reference_two_mobile" value={data.employee_reference_two_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference Two Mobile" />
                                </div>
                              
                            
                            </div>

                            <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                            <div class="col-md-12">
                                <button type="submit">EDit here</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </Modal>
    );
};


export default ModalBox;