// Modal.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants.js';

const ModalBox = ({ isOpen, onRequestClose, helpCenterId }) => {

    const [data, setData] = useState([])
         // for set message---------------
         const [message, setMessage] = useState('');
    useEffect(() => {

        if (isOpen) {
            console.log('model open', helpCenterId)
            // Fetch data for the given helpCenterId
            if (helpCenterId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}helpcenter/getcenterbyid?userid=${helpCenterId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching HelpCenter data:', error);
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
            const response = await axios.put(`${BASE_API_URL}helpcenter/updatehelpcenter`, data);
            console.log(response.data); // Handle the response as needed
            setMessage(response.data.msg)
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
                                <label><b>Ticket Id</b></label>

                                    <input type="text" name="helpcenter_ticket_id" value={data.helpcenter_ticket_id} onChange={handleInputChange} class="form-control" placeholder="Ticket Id" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Employee Id</b></label>

                                    <input type="text" name="helpcenter_employee_id" value={data.helpcenter_employee_id} onChange={handleInputChange} class="form-control" placeholder="Employee Id" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Ticket Description</b></label>

                                    <input type="text" name="helpcenter_ticket_description" value={data.helpcenter_ticket_description} onChange={handleInputChange} class="form-control" placeholder="Ticket Description" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Ticket Priority</b></label>

                                    <input type="text" name="helpcenter_ticket_priority" value={data.helpcenter_ticket_priority} onChange={handleInputChange} class="form-control" placeholder="Ticket Priority" />
                                </div>
                                <div class="mb-3 col-md-6" >
                                <label><b>Ticket Department</b></label>

                                    <input type="text" name="helpcenter_ticket_department" value={data.helpcenter_ticket_department} onChange={handleInputChange} class="form-control" placeholder="Ticket Department" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Created Date</b></label>

                                    <input type="date" name="helpcenter_ticket_created_date" value={data.helpcenter_ticket_created_date} onChange={handleInputChange} class="form-control" placeholder="Ticket Created Date" />
                                </div>
                                <div class="mb-3 col-md-6" >
                                <label><b>Ticket Status</b></label>

                                    <input type="text" name="helpcenter_ticket_status" value={data.helpcenter_ticket_status} onChange={handleInputChange} class="form-control" placeholder="Ticket Status" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Solved Date</b></label>

                                    <input type="date" name="helpcenter_ticket_solved_date" value={data.helpcenter_ticket_solved_date} onChange={handleInputChange} class="form-control" placeholder="Ticket Solved Date" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Ticket Solved by</b></label>

                                    <input type="text" name="helpcenter_ticket_solved_by" value={data.helpcenter_ticket_solved_by} onChange={handleInputChange} class="form-control" placeholder="Ticket Solved By" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Ticket Managed By</b></label>

                                    <input type="text" name="helpcenter_ticket_managed_by" value={data.helpcenter_ticket_managed_by} onChange={handleInputChange} class="form-control" placeholder="Ticket Managed By" />
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