import Nav from "../../NavComponent/Nav";
import Footer from "../../FooterModule/footer";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios with npm or yarn
import './UserData.css'
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../../lib/constants';

const UserData = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [tableData, settableData] = useState([])
    const [togle, settogle] = useState([true])
    // const [data, setData] = useState(formData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}user/getuser`);
                console.log(response.data.data); // Handle the response as needed
                settableData(response.data.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [togle]);


    // Function to handle form submission


    return (

        <div >
            <Nav />
            <div style={{ backgroundColor: '#28769a' }}>
                <h1 className='headerData'>USER DATA</h1>
            </div>
            <div >


                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body text-center">


                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>
                                                {/* <label className="customcheckbox m-b-20">
                                                    <input type="checkbox" id="mainCheckbox" />
                                                    <span className="checkmark"></span>
                                                </label> */}
                                            </th>
                                            <th scope="col">ID</th>
                                            <th scope="col">NAME</th>
                                            <th scope="col">EMAIL</th>
                                            <th scope="col">GENDER</th>

                                        </tr>
                                    </thead>
                                    <tbody className="customtable">
                                        {tableData.map((data, index) => (
                                            data.role === 'user' ? (
                                                <tr key={index}>
                                                    <td>
                                                        {/* <label className="customcheckbox">
                                                            <input type="checkbox" className="listCheckbox" />
                                                            <span className="checkmark"></span>
                                                        </label> */}
                                                    </td>
                                                    <td>{data._id}</td>
                                                    <td>{data.fname}&nbsp;{data.lname}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.gender}</td>
                                                </tr>
                                            ) : (
                                                <tr key={index}>
                                                </tr>
                                            )
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div>

            </div>

<Footer />
        </div>
    );


}


export default UserData;