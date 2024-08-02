// Modal.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants.js';

const ModalBox = ({ isOpen, onRequestClose, expensesId }) => {

    const [data, setData] = useState([])
         // for set message---------------
         const [message, setMessage] = useState('');
    useEffect(() => {

        if (isOpen) {
            console.log('model open', expensesId)
            // Fetch data for the given expensesId
            if (expensesId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}expenses/getexpensesbyid?_id=${expensesId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching expenses data:', error);
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
            const response =  await axios.put(`${BASE_API_URL}expenses/putexpenses`, data);
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
                                    <label><b>Purpose</b></label>
                                    <input type="text" name="expenses_purpose" value={data.expenses_purpose} onChange={handleInputChange} class="form-control" placeholder="Purpose" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Bill</b></label>

                                    <input type="text" name="expenses_bill" value={data.expenses_bill} onChange={handleInputChange} class="form-control" placeholder="Bill" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Amount</b></label>

                                    <input type="text" name="expenses_amount" value={data.expenses_amount} onChange={handleInputChange} class="form-control" placeholder="Amount" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Voucher</b></label>

                                    <input type="text" name="expenses_voucher" value={data.expenses_voucher} onChange={handleInputChange} class="form-control" placeholder="Voucher" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Remark</b></label>

                                    <input type="text" name="expenses_remark" value={data.expenses_remark} onChange={handleInputChange} class="form-control" placeholder="Remark" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Cash</b></label>

                                    <input type="text" name="expenses_by_cash" value={data.expenses_by_cash} onChange={handleInputChange} class="form-control" placeholder="Cash" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label><b>Cheque</b></label>

                                    <input type="text" name="expenses_by_cheque" value={data.expenses_by_cheque} onChange={handleInputChange} class="form-control" placeholder="Cheque" />
                                </div>
                                <div class="mb-3 col-md-6">
    
                                <label><b>Cash Recieved By</b></label>

                                    <input type="text" name="expenses_cash_recieved_by" value={data.expenses_cash_recieved_by} onChange={handleInputChange} class="form-control" placeholder="Cash Recieved By" />
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