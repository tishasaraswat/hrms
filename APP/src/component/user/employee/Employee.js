import React, { useState, useEffect } from 'react';      //this is a package
import './Employee.css'
import 'bootstrap/dist/css/bootstrap.min.css';                       //for css manage(Footer)
import axios from 'axios';                                                //  Axios using for feching API(Axios hr browser me work krta h)
import ModalBox from '../../user/employee/EditEmployee'                  //for Edit             
 import Nav from '../../NavComponent/Nav';
import Footer from '../../FooterModule/footer'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';            //for icon (delete, add)
import ReactPaginate from 'react-paginate';                               //for manage paging(windows)
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
 import { BASE_API_URL } from '../../../lib/constants';                       //for url
import { Link } from 'react-router-dom';                                         //for routing


  
//make a fat arrow function
const Employee = () =>{
//working for states-----------------
    const [isOpen, setIsOpen] = useState(false);                         
    const [tableData, settableData] = useState([]);                      //id,name,
    const [togle, settogle] = useState([true]);                               //delete, add(action ke acording reaction krta h )
    const [modalIsOpen, setModalIsOpen] = useState(false);                    //edit Model
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [message, setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sortColumn, setSortColumn] = useState(null);
    // const [sortDirection, setSortDirection] = useState('ascending');
    const [ids, setId] = useState([]);
    const [query, setQuery] = useState('');
    const [sortDirection, setSortDirection] = useState('ascending');
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected); // Update the current page when pagination changes
    };
    const itemsPerPage = 5; // Number of items to display per page
    const offset = currentPage * itemsPerPage;
    const pageCount = Math.ceil(tableData.length / itemsPerPage);


    const [formData, setFormData] = useState({
        employee_first_name: '',
        employee_last_name: '',
        employee_mobile: '',
        employee_alternate_mobile: '',
        employee_email: '',
        employee_password: '',
        employee_address: '',
        employee_city: '',
        employee_state: '',
        employee_other_info: '',
        employee_dob: '',
        employee_doj: '',
        employee_skills: '',
        employee_experience: '',
        employee_resume: '',
        employee_id_proof: '',
        employee_permanant_address_proof: '',
        employee_local_address_proof: '',
        employee_reference_one_name: '',
        employee_reference_one_mobile: '',
        employee_reference_two_name: '',
        employee_reference_two_mobile: '',
     
    });

    // const handlePageChange = ({ selected }) => {
    //     setCurrentPage(selected); // //Update the current page when pagination changes
    // };

    useEffect(() => {
        const fetchData = async () => {                            //
            try {
                const response = await axios.get(`${BASE_API_URL}employee/list`);            //axios use for showing data frome server side

                console.log(response.data.data); // Handle the response as needed
                settableData(response.data.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [togle]);

    const openPopup = () => {                     //for open poppup
        setIsOpen(true);
    };

  
    const handleInputChange = (e) => {                            //form ke input field ko handl krta h
        const { name, value } = e.target;                         //e(event objest h jo ki kisi field me change ko represent krta h)
        setFormData(prevState => ({                               //ye ek function h jo ki form data ko update krta h 
            ...prevState,                                         //
            [name]: value
        }));

        setErrors({
            ...errors,
            [name]: "",
        });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();                                   //default behavior n hone de
        // Handle form submission here, for example, send data to backend or perform validation
        console.log('', formData);
        if (validateForm()) {

             try {
                const response = await axios.post(`${BASE_API_URL}employee/create`, formData);
                settogle(!togle)
                console.log(response.data); // Handle the response as needed
                setMessage(response.data.msg);
            } catch (error) {
                console.error('Error:', error);
            }}
        
    };
 //for delete data
    const DeleteData = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // Check if the user confirmed
        if (isConfirmed) {
            // Delete logic here
            try {
                console.log('id', id)
                const response = axios.delete(`${BASE_API_URL}employee/delete?id=${id}`)

                console.log(response.data); // Handle the response as needed
                settogle(!togle)

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // User canceled the action
            console.log('Deletion canceled');
        } console.log('', id)

    }

    const openModal = (employeeId) => {
        console.log('employeeId', employeeId)
        setModalIsOpen(true);
        setSelectedEmployeeId(employeeId);

    };

    const closeModal = () => {
        settogle(!togle)
        setModalIsOpen(false);
    };

    //for multi delete
    const handleCheckboxChange = (e, id) => {
        // If the checkbox is checked, add the ID to the list of selected IDs
        if (e.target.checked) {
            setId(prevIds => [...prevIds, id]);
        } else {
            // If the checkbox is unchecked, remove the ID from the list of selected IDs
            setId(prevIds => prevIds.filter(prevId => prevId !== id));
        }
    };
//function
    const Deletemulti = async () => {
        const data = {
            "ids": ids
        };
        console.log('ids', data);

        try {
            const response = await axios.delete(`${BASE_API_URL}employee/deletmany`, {            //BASE_API_URL= dynamic data ko fetch krne ke liye
                data: data // IDs ko data body mein bhejna
            });
            console.log(response.data); // Response ke saath kuch karne ke liye
            settogle(!togle);                              //for any changes
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //for error

    const [errors, setErrors] = useState({
        employee_first_name: "",
        employee_last_name: "",
        employee_mobile: "",
        employee_email: "",
        employee_password: "",
        employee_experience: "",

    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};                                   //newErrors this is a objec

        if (!formData.employee_first_name.trim()) {              //whide space htane ke liye
            newErrors.employee_first_name = "employee_first_name is required";
            isValid = false;
        }

        if (!formData.employee_last_name.trim()) {
            newErrors.employee_last_name = "employee_last_name is required";
            isValid = false;
        }

        if (!formData.employee_mobile.trim()) {
            newErrors.employee_mobile = "employee_mobile is required";
            isValid = false;
        }

        if (!formData.employee_email.trim()) {
            newErrors.employee_email = "employee_email is required";
            isValid = false;
        }

        if (!formData.employee_password.trim()) {
            newErrors.employee_password = "employee_password is required";
            isValid = false;
        }

        if (!formData.employee_experience.trim()) {
            newErrors.employee_experience = "employee_experience is required";
            isValid = false;
        }


        setErrors(newErrors);
        return isValid;
    };

    // const handleSort = (column) => {
    //     if (column === sortColumn) {
    //         // If the same column is clicked again, reverse the sorting direction
    //         setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    //     } else {
    //         // If a new column is clicked, set it as the sorting column and reset the direction
    //         setSortColumn(column);
    //         setSortDirection('ascending');
    //     }
    // };

    // //shorting
    // const sortedData = () => {
    //     if (sortColumn) {
    //         const sorted = [...tableData].sort((a, b) => {
    //             const valueA = a[sortColumn];
    //             const valueB = b[sortColumn];
    //             if (typeof valueA === 'string' && typeof valueB === 'string') {
    //                 // Case-insensitive string comparison
    //                 return sortDirection === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    //             } else {
    //                 // Numerical or other comparison
    //                 return sortDirection === 'ascending' ? valueA - valueB : valueB - valueA;
    //             }
    //         });
    //         return sortDirection === 'ascending' ? sorted : sorted.reverse();
    //     }
    //     return tableData; // Return original data if no sorting column is selected
    // };

    //============================================
    //for searching-------------------

    const handleChange = async (event) => {
        setQuery(event.target.value);
        console.log(event.target.value)
        if (event.target.value !== '') {
            try {
                const response = await axios.get(`${BASE_API_URL}employee/search?search=${event.target.value}`, {
                });
                console.log(query)
                settableData(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            try {
                const response = await axios.get(`${BASE_API_URL}employee/list`);
                console.log(response.data.data); // Handle the response as needed
                settableData(response.data.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    //=========================================
    //for sorting-----------------

    const handleSort = async (column) => {
        console.log("Sort column clicked:", column);
        console.log("Current sort direction:", sortDirection);
        if (column === sortColumn) {
            // If the same column is clicked again, reverse the sorting direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

            try {
                const response = await axios.get(`${BASE_API_URL}employee/sortorder?order=${sortDirection}&coloum=${sortColumn}`);
                settableData(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // If a new column is clicked, set it as the sorting column and reset the direction
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const closePopup = () => {
        setIsOpen(false);
    };

//=========================================================
//it's showing on ui side with functinality
    return(
        <>                           
          
          <Nav />
            <div >
 
                <div style={{ backgroundColor: '#28769a' }}>
                {/* WELCOME TO EMPLOYEE PAGE (current state) */}
                    <h1 className='headerData'>WELCOME TO EMPLOYEE PAGE</h1>                       
                </div>
                <div >
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body text-center">

                                    <div>
                                        <button className="backButton" onClick={openPopup}>
                                            {/* for single space (nbsp) */}
                                            Add &nbsp;<FontAwesomeIcon icon={faPlusCircle} />                      
                                        </button>
                                    </div>

                                    <div> <span> <button className="multiDeleteButton" onClick={() => { Deletemulti() }}    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button></span></div>
                                    
                                    {isOpen && (
                                        <div>
                                            <div>
                                                <div>
                                                    <div class="row">
                                                        <div class="col-md-6 offset-md-3">
                                                            <div class="signup-form">


                                                                <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                                                                    <div style={{ textAlign: 'center' }}>
                                                                        <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Create Your Account</h4>
                                                                        <button style={{ float: 'right', fontSize: '20px', backgroundColor: '#ddc7c7', border: 'none' }} className="close" onClick={closePopup}>&times;</button>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>First Name</b></label>

                                                                            <input type="text" name="employee_first_name" value={formData.employee_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
                                                                            {errors.employee_first_name && <span className="error" style={{ color: 'red' }}>{errors.employee_first_name}</span>}

                                                                            
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Last Name</b></label>

                                                                            <input type="text" name="employee_last_name" value={formData.employee_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
                                                                              {errors.employee_last_name && <span className="error" style={{ color: 'red' }}>{errors.employee_last_name}</span>}

                                                                             
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Mobile No.</b></label>

                                                                            <input type="text" name="employee_mobile" value={formData.employee_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
                                                                            {errors.employee_mobile && <span className="error" style={{ color: 'red' }}>{errors.employee_mobile}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Alternate Mobile No.</b></label>

                                                                            <input type="text" name="employee_alternate_mobile" value={formData.employee_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Email</b></label>

                                                                            <input type="email" name="employee_email" value={formData.employee_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
                                                                            {errors.employee_email && <span className="error" style={{ color: 'red' }}>{errors.employee_email}</span>}

                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Password</b></label>

                                                                            <input type="text" name="employee_password" value={formData.employee_password} onChange={handleInputChange} class="form-control" placeholder="Password" />
                                                                             {errors.employee_password && <span className="error" style={{ color: 'red' }}>{errors.employee_password}</span>}

                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >

                                                                        <label> <b>Address</b></label>

                                                                            <input type="text" name="employee_address" value={formData.employee_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>City</b></label>

                                                                            <input type="text" name="employee_city" value={formData.employee_city} onChange={handleInputChange} class="form-control" placeholder="City" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b> State</b></label>

                                                                            <input type="text" name="employee_state" value={formData.employee_state} onChange={handleInputChange} class="form-control" placeholder="State" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Other Info</b></label>

                                                                            <input type="text" name="employee_other_info" value={formData.employee_other_info} onChange={handleInputChange} class="form-control" placeholder="Employee Info" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                            <label><b>DOB</b></label>
                                                                            <input type="date" name="employee_dob" value={formData.employee_dob} onChange={handleInputChange} class="form-control" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                            <label ><b>DOJ</b></label>
                                                                            <input type="date" name="employee_doj" value={formData.employee_doj} onChange={handleInputChange} class="form-control" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b> Skills</b></label>

                                                                            <input type="text" name="employee_skills" value={formData.employee_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Experience</b></label>

                                                                            <input type="text" name="employee_experience" value={formData.employee_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
                                                                             {errors.employee_experience && <span className="error" style={{ color: 'red' }}>{errors.employee_experience}</span>}

                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Resume</b></label>

                                                                            <input type="text" name="employee_resume" value={formData.employee_resume} onChange={handleInputChange} class="form-control" placeholder="Resume" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>ID Proof</b></label>

                                                                            <input type="text" name="employee_id_proof" value={formData.employee_id_proof} onChange={handleInputChange} class="form-control" placeholder="Id Proof" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Permanant Address Proof</b></label>

                                                                            <input type="text" name="employee_permanant_address_proof" value={formData.employee_permanant_address_proof} onChange={handleInputChange} class="form-control" placeholder="Permanant address proof" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Local Address Proof</b></label>

                                                                            <input type="text" name="employee_local_address_proof" value={formData.employee_local_address_proof} onChange={handleInputChange} class="form-control" placeholder="Local address proof" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Reference First Name</b></label>

                                                                            <input type="text" name="employee_reference_one_name" value={formData.employee_reference_one_name} onChange={handleInputChange} class="form-control" placeholder="Reference One Name" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Reference First Mobile</b></label>

                                                                            <input type="text" name="employee_reference_one_mobile" value={formData.employee_reference_one_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference One Mobile" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Reference Second Name</b></label>

                                                                            <input type="text" name="employee_reference_two_name" value={formData.employee_reference_two_name} onChange={handleInputChange} class="form-control" placeholder="Reference Two Name" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" >
                                                                        <label> <b>Reference Second Mobile</b></label>

                                                                            <input type="text" name="employee_reference_two_mobile" value={formData.employee_reference_two_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference Two Mobile" />
                                                                        </div>
                                                                        {/* <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info1" value={formData.employee_info1} onChange={handleInputChange} class="form-control" placeholder="Info 1" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info2" value={formData.employee_info2} onChange={handleInputChange} class="form-control" placeholder="Info 2" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info3" value={formData.employee_info3} onChange={handleInputChange} class="form-control" placeholder="Info 3" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info4" value={formData.employee_info4} onChange={handleInputChange} class="form-control" placeholder="Info 4" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info5" value={formData.employee_info5} onChange={handleInputChange} class="form-control" placeholder="Info 5" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info6" value={formData.employee_info6} onChange={handleInputChange} class="form-control" placeholder="Info 6" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info7" value={formData.employee_info7} onChange={handleInputChange} class="form-control" placeholder="Info 7" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info8" value={formData.employee_info8} onChange={handleInputChange} class="form-control" placeholder="Info 8" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info9" value={formData.employee_info9} onChange={handleInputChange} class="form-control" placeholder="Info 9" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="employee_info10" value={formData.employee_info10} onChange={handleInputChange} class="form-control" placeholder="Info 110" />
                                                                        </div> */}
                                                                        <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                                    </div>
                                                                    <div class="col-md-12">
                                                                        <button type="submit">Add Employee</button>
                                                                    </div>
                                                                </form>
                                                                <label className="formLabelAgain">If you want to login <u><Link to="/login" style={{ color: 'black' }}>Login</Link></u>,
                                                                </label>                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>       </div>
                                        </div>
                                    )}
                                </div>
                                {/* for searching------ */}
                                <div class="containerOnce">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={handleChange}
                                        placeholder="Search "
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-light">
                                            <tr>

                                                {/* <th  scope="col">ID  </th> */}
                                                {/* <th  scope="col">NAME  </th> */}
                                                <th scope="col" onClick={() => handleSort('employee_first_name')}>NAME {sortColumn === 'employee_first_name' && (            //for sorting
                                                    <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                                                )}</th>
                                                {/* <th  scope="col">EMAIL  </th> */}
                                                <th scope="col" onClick={() => handleSort('employee_email')}>EMAIL {sortColumn === 'employee_email' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                                                )}</th>
                                                <th  scope="col"> MOBILE  </th>
                                                <th scope="col" >ACTIONS</th>  
                                                <th>
                                                    <label className="customcheckbox m-b-20">
                                                        <input type="checkbox" id="mainCheckbox" />
                                                    </label>
                                                </th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody className="customtable">
                                            {/* {sortedData().slice(offset, offset + itemsPerPage).map((data, index) => ( */}
                                            {/* {tableData.map((data, index) => ( */}
                                            {tableData.slice(offset, offset + itemsPerPage).map((data, index) => (               //for pagination

                                                <tr key={index}>

                                                    {/* <td>{data._id}</td> */}
                                                    {/* (nbsp) use for single space */}
                                                    <td>{data.employee_first_name}&nbsp;{data.employee_last_name}</td>    
                                                    <td>{data.employee_email}</td>
                                                    <td>{data.employee_mobile}</td>
                                                    <td>
                                                        <button className="editButton" onClick={() => DeleteData(data._id)} >  <FontAwesomeIcon icon={faTrash} /></button>
                                                         
                                                        <button className="editButton" onClick={() => openModal(data._id)} >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>

                                                    </td>

                                                    <td>
                                                        <label className="customcheckbox">
                                                            <input type="checkbox" className="listCheckbox" onChange={(e) => handleCheckboxChange(e, data._id)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </td>
                                                     
                                                    <ModalBox isOpen={modalIsOpen} employeeId={selectedEmployeeId} onRequestClose={closeModal}>
                                                        <h2>Modal Title</h2>
                                                        <p>Modal Content</p>
                                                    </ModalBox>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* for pagination */}
                                <ReactPaginate
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    breakLabel={'...'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageChange}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />

                            </div>
                        </div>
                    </div>

                </div>

             


            </div>
   
  <Footer />
               </>
        
    )
}

export default Employee;
