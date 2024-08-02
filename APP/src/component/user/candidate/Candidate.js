import React, { useState, useEffect } from 'react';
import './Candidate.css'
import 'bootstrap/dist/css/bootstrap.min.css';                       //for css manage
import axios from 'axios';    
import ModalBox from '../../user/candidate/EditCandidate'                                  //  Axios using for feching (Axios hr browser me work krta h)
 import Nav from '../../NavComponent/Nav';
import Footer from '../../FooterModule/footer'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';            //for icon (delete, add)
import ReactPaginate from 'react-paginate';                               //for manage paging(windows)
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
 import { BASE_API_URL } from '../../../lib/constants';
import { Link } from 'react-router-dom';

//working for states-----------------

const Candidate = () =>{

    const [isOpen, setIsOpen] = useState(false);                         
    const [tableData, settableData] = useState([]);                      //id,name,
    const [togle, settogle] = useState([true]);                               //delete, add(action ke acording reaction krta h )
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedcandidateId, setSelectedCandidateId] = useState(null);
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
    candidate_first_name: '',
    candidate_last_name: '',
    candidate_mobile: '',
    candidate_alternate_mobile: '',
    candidate_email: '',
    candidate_skype: '',
    candidate_profile: '',
    candidate_skills: '',
    candidate_experience: '',
    candidate_expected_salary: '',
    candidate_expected_joining_date: '',
    candidate_joining_immediate: '',
    candidate_marrital_status: '',
    candidate_written_round: '',
    candidate_machine_round: '',
    candidate_technical_interview_round: '',
    candidate_hr_interview_round: '',
    candidate_selection_status: '',
    candidate_feedback: '',
    candidate_from_consultancy: '',
    });
   

    const openPopup = () => {
        setIsOpen(true);
    };
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`${BASE_API_URL}candidate/getcandidate`);
                console.log(response.data.data);
                settableData(response.data.data)
    
            }
            catch(error){
                console.log('Error:', error);
                
            }
        };
        fetchData();
       },[togle]);

    //    const openPopup = () => {
    //     setIsOpen(true);
    // };

    const closePopup = () => {
        setIsOpen(false);
    }
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
                const response = await axios.post(`${BASE_API_URL}candidate/postcandidate`, formData);
                settogle(!togle)
                console.log(response.data); // Handle the response as needed
                setMessage(response.data.msg);
            } catch (error) {
                console.error('Error:', error);
            }}
        
    };

    
    const DeleteData = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // Check if the user confirmed
        if (isConfirmed) {
            // Delete logic here
            try {
                console.log('id', id)
                const response = axios.delete(`${BASE_API_URL}candidate/deletecandidate?id=${id}`)

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

    const openModal = (candidateId) => {
        console.log('candidateId', candidateId)
        setModalIsOpen(true);
        setSelectedCandidateId(candidateId);

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
            const response = await axios.delete(`${BASE_API_URL}candidate/deletemanycandidate`, {
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
    candidate_first_name: "",
    candidate_last_name: "",
    candidate_mobile: "",
    candidate_email: "",
    candidate_skills: "",
    candidate_experience: "",
    candidate_expected_salary: "",
    candidate_written_round: "",
    candidate_machine_round: "",
    candidate_selection_status: "",
    candidate_feedback: "",
   });

   const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.candidate_first_name.trim()) {
        newErrors.candidate_first_name = "candidate_first_name is required";
        isValid = false;
    }

    if (!formData.candidate_last_name.trim()) {
        newErrors.candidate_last_name = "candidate_last_name is required";
        isValid = false;
    }

    if (!formData.candidate_mobile.trim()) {
        newErrors.candidate_mobile = "candidate_mobile is required";
        isValid = false;
    }

    if (!formData.candidate_email.trim()) {
        newErrors.candidate_email = "candidate_email is required";
        isValid = false;
    }

    if (!formData.candidate_skills.trim()) {
        newErrors.candidate_skills = "candidate_skills is required";
        isValid = false;
    }

    if (!formData.candidate_experience.trim()) {
        newErrors.candidate_experience = "candidate_experience is required";
        isValid = false;
    }

    if (!formData.candidate_expected_salary.trim()) {
        newErrors.candidate_expected_salary = "candidate_expected_salary is required";
        isValid = false;
    }

    
    if (!formData.candidate_written_round.trim()) {
        newErrors.candidate_written_round = "candidate_written_round is required";
        isValid = false;
    }

    if (!formData.candidate_machine_round.trim()) {
        newErrors.candidate_machine_round = "candidate_machine_round is required";
        isValid = false;
    }

    
    if (!formData.candidate_selection_status.trim()) {
        newErrors.candidate_selection_status = "candidate_selection_status is required";
        isValid = false;
    }

    
    if (!formData.candidate_feedback.trim()) {
        newErrors.candidate_feedback = "candidate_feedback is required";
        isValid = false;
    }


    setErrors(newErrors);
    return isValid;
};


//        return(
//         <>
//         <Nav />

//         <div >
 
//  <div style={{ backgroundColor: '#28769a' }}>
//      <h1 className='headerData'>WELCOME TO EMPLOYEE PAGE</h1>
//  </div>


//  </div>

//         <Footer />

//         </>
//        )
//     };


//     export default Candidate;
//======================================================
//for searching------------------

const handleChange = async (event) =>{
    setQuery(event.target.value);
    console.log(event.target.value)
    if(event.target.value !== ''){
        try {
            const response = await axios.get(`${BASE_API_URL}candidate/search?search=${event.target.value}`,{
               
            });
            console.log(query);
            settableData(response.data)

        }catch (error) {
            console.error('Error:', error);

        }

    }else{
        try{
            const response = await axios.get(`${BASE_API_URL}candidate/getcandidate`);
            console.log(response.data.data);
            settableData(response.data.data);
        }catch (error) {
            console.error('Error:', error)

        }
    }
};
//===========================================
//for sorting----------------------


const handleSort = async (column) => {
    console.log("Sort column clicked:", column);
    console.log("Current sort direction:", sortDirection);
    if (column === sortColumn) {
        // If the same column is clicked again, reverse the sorting direction
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

        try {
            const response = await axios.get(`${BASE_API_URL}candidate/sortorder?order=${sortDirection}&coloum=${sortColumn}`);
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
//=========================================================
//it's showing on ui side with functinality
return(
    <>                           
      
      <Nav />
        <div >

            <div style={{ backgroundColor: '#28769a' }}>
            {/* WELCOME TO EMPLOYEE PAGE (current state) */}
                <h1 className='headerData'>WELCOME TO CANDIDATE PAGE</h1>                       
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
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>First Name</b></label>

                                                                        <input type="text" name="candidate_first_name" value={formData.candidate_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
                                                                        {errors.candidate_first_name && <span className="error" style={{ color: 'red' }}>{errors.candidate_first_name}</span>}

                                                                        
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Last Name</b></label>

                                                                        <input type="text" name="candidate_last_name" value={formData.candidate_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
                                                                          {errors.candidate_last_name && <span className="error" style={{ color: 'red' }}>{errors.candidate_last_name}</span>}

                                                                         
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Mobile No.</b></label>


                                                                        <input type="text" name="candidate_mobile" value={formData.candidate_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
                                                                        {errors.candidate_mobile && <span className="error" style={{ color: 'red' }}>{errors.candidate_mobile}</span>}
                                                                    </div>

                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Alternate Mobile No.</b></label>

                                                                        <input type="text" name="candidate_alternate_mobile" value={formData.candidate_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Email</b></label>

                                                                        <input type="email" name="candidate_email" value={formData.candidate_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
                                                                        {errors.candidate_email && <span className="error" style={{ color: 'red' }}>{errors.candidate_email}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Skype</b></label>

                                                                        <input type="text" name="candidate_skype" value={formData.candidate_skype} onChange={handleInputChange} class="form-control" placeholder="skype" />
                                                                         {errors.candidate_skype && <span className="error" style={{ color: 'red' }}>{errors.candidate_skype}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Profile</b></label>

                                                                        <input type="text" name="candidate_profile" value={formData.candidate_profile} onChange={handleInputChange} class="form-control" placeholder="Profile" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Skills</b></label>

                                                                        <input type="text" name="candidate_skills" value={formData.candidate_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                                                        {errors.candidate_skills && <span className="error" style={{ color: 'red' }}>{errors.candidate_skills}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Experience</b></label>

                                                                        <input type="text" name="candidate_experience" value={formData.candidate_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
                                                                        {errors.candidate_experience && <span className="error" style={{ color: 'red' }}>{errors.candidate_experience}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Expected Salary</b></label>

                                                                        <input type="text" name="candidate_expected_salary" value={formData.candidate_expected_salary} onChange={handleInputChange} class="form-control" placeholder="Salary" />
                                                                        {errors.candidate_expected_salary && <span className="error" style={{ color: 'red' }}>{errors.candidate_expected_salary}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6" >
                                                                    <label><b>Expected Joining Date</b></label>
                                                                        <input type="date" name="candidate_expected_joining_date" value={formData.candidate_expected_joining_date} onChange={handleInputChange} class="form-control" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6" >
                                                                    <label><b>Join Immediate</b></label>
                                                                        <input type="date" name="candidate_joining_immediate" value={formData.candidate_joining_immediate} onChange={handleInputChange} class="form-control" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Marrital Status</b></label>

                                                                        <input type="text" name="candidate_marrital_status" value={formData.candidate_marrital_status} onChange={handleInputChange} class="form-control" placeholder="Marrital status" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Written Round</b></label>

                                                                        <input type="text" name="candidate_written_round" value={formData.candidate_written_round} onChange={handleInputChange} class="form-control" placeholder="Written Round" />
                                                                         {errors.candidate_written_round && <span className="error" style={{ color: 'red' }}>{errors.candidate_written_round}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Machine Round</b></label>

                                                                        <input type="text" name="candidate_machine_round" value={formData.candidate_machine_round} onChange={handleInputChange} class="form-control" placeholder="Machine Round" />
                                                                        {errors.candidate_machine_round && <span className="error" style={{ color: 'red' }}>{errors.candidate_machine_round}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Technical Interview Round</b></label>

                                                                        <input type="text" name="candidate_technical_interview_round" value={formData.candidate_technical_interview_round} onChange={handleInputChange} class="form-control" placeholder="Technical Interview Round" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>HR Interview Round</b></label>

                                                                        <input type="text" name="candidate_hr_interview_round" value={formData.candidate_hr_interview_round} onChange={handleInputChange} class="form-control" placeholder="HR Interview Round" />
                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Selection Status</b></label>

                                                                        <input type="text" name="candidate_selection_status" value={formData.candidate_selection_status} onChange={handleInputChange} class="form-control" placeholder="Selection Status" />
                                                                        {errors.candidate_selection_status && <span className="error" style={{ color: 'red' }}>{errors.candidate_selection_status}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Feedback</b></label>

                                                                        <input type="text" name="candidate_feedback" value={formData.candidate_feedback} onChange={handleInputChange} class="form-control" placeholder="Feedback" />
                                                                        {errors.candidate_feedback && <span className="error" style={{ color: 'red' }}>{errors.candidate_feedback}</span>}

                                                                    </div>
                                                                    <div class="mb-3 col-md-6">
                                                                    <label><b>Consultancy</b></label>

                                                                        <input type="text" name="candidate_from_consultancy" value={formData.candidate_from_consultancy} onChange={handleInputChange} class="form-control" placeholder="Consultancy" />
                                                                    </div>
                                                                   
                                                                    <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                                </div>
                                                                <div class="col-md-12">
                                                                    <button type="submit">Add Candidate</button>
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
                                            <th scope="col" onClick={() => handleSort('candidate_first_name')}>NAME {sortColumn === 'candidate_first_name' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                                                )}</th>
                                            {/* <th  scope="col">EMAIL  </th> */}
                                            <th scope="col" onClick={() => handleSort('candidate_email')}>EMAIL {sortColumn === 'candidate_email' && (
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
                                        {tableData.slice(offset, offset + itemsPerPage).map((data, index) => (                       //for pagination

                                            <tr key={index}>

                                                {/* <td>{data._id}</td> */}
                                                {/* (nbsp) use for single space */}
                                                <td>{data.candidate_first_name}&nbsp;{data.candidate_last_name}</td>    
                                                <td>{data.candidate_email}</td>
                                                <td>{data.candidate_mobile}</td>
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
                                                 
                                                <ModalBox isOpen={modalIsOpen} candidateId={selectedcandidateId} onRequestClose={closeModal}>
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

            <div>

            </div>


        </div>

<Footer />
           </>
    
)
}

export default Candidate;

