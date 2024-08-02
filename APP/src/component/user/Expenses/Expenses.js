import React, { useState, useEffect } from 'react';      //this is a package
import './Expenses.css'
import 'bootstrap/dist/css/bootstrap.min.css';                       //for css manage(Footer)
import axios from 'axios';                                                //  Axios using for feching API(Axios hr browser me work krta h)
import ModalBox from '../../user/Expenses/EditExpenses'                  //for Edit             
 import Nav from '../../NavComponent/Nav';
import Footer from '../../FooterModule/footer'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';            //for icon (delete, add)
import ReactPaginate from 'react-paginate';                               //for manage paging(windows)
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
 import { BASE_API_URL } from '../../../lib/constants';                       //for url
import { Link } from 'react-router-dom';                                      //for routing

  
//make a fat arrow function
const Expenses = () =>{
    //working for states-----------------
        const [isOpen, setIsOpen] = useState(false);                         
        const [tableData, settableData] = useState([]);                      //id,name,
        const [togle, settogle] = useState([true]);                               //delete, add(action ke acording reaction krta h )
        const [modalIsOpen, setModalIsOpen] = useState(false);                    //edit Model
        const [selectedExpensesId, setSelectedExpensesId] = useState(null);
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

            expenses_purpose: '',
            expenses_bill: '',
            expenses_amount: '',
            expenses_voucher: '',
            expenses_remark: '',
            expenses_by_cash: '',
            expenses_by_cheque: '',
            expenses_cash_recieved_by: '',
            
        });
            // const handlePageChange = ({ selected }) => {
    //     setCurrentPage(selected); // //Update the current page when pagination changes
    // };

    const openPopup = () => {                     //for open poppup
        setIsOpen(true);
    };

     //for get data--------------------------
     useEffect(() => {
        const fetchData = async () => {                            //
            try {
                const response = await axios.get(`${BASE_API_URL}expenses/getexpenses`);            //axios use for showing data frome server side

                console.log(response.data.data); // Handle the response as needed
                settableData(response.data.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [togle]);

    //for ADD data----------------
    
const handleSubmit = async (e) => {
    e.preventDefault();                                   //default behavior n hone de
    // Handle form submission here, for example, send data to backend or perform validation
    console.log('', formData);
    if (validateForm()) {

         try {
            const response = await axios.post(`${BASE_API_URL}expenses/postexpenses`, formData);
            settogle(!togle)
            console.log(response.data); // Handle the response as needed
            setMessage(response.data.msg);
        } catch (error) {
            console.error('Error:', error);
        }}
    
};

//FOR DELETE DATA-------------------

const DeleteData = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    // Check if the user confirmed
    if (isConfirmed) {
        // Delete logic here
        try {
            console.log('id', id)
            const response = axios.delete(`${BASE_API_URL}expenses/deleteexpenses?_id=${id}`)

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

//FOR mULTY DELETE DATA--------------
const Deletemulti = async () => {
    const data = {
        "ids": ids
    };
    console.log('ids', data);

    try {
        const response = await axios.delete(`${BASE_API_URL}expenses/deletemanyexpenses`, {            //BASE_API_URL= dynamic data ko fetch krne ke liye
            data: data // IDs ko data body mein bhejna
        });
        console.log(response.data); // Response ke saath kuch karne ke liye
        settogle(!togle);                              //for any changes
    } catch (error) {
        console.error('Error:', error);
    }
};

   
   const handleCheckboxChange = (e, id) => {
    // If the checkbox is checked, add the ID to the list of selected IDs
    if (e.target.checked) {
        setId(prevIds => [...prevIds, id]);
    } else {
        // If the checkbox is unchecked, remove the ID from the list of selected IDs
        setId(prevIds => prevIds.filter(prevId => prevId !== id));
    }
};

 {/* for edit----- */}
 const openModal = (expensesId) => {
    console.log('ExpensesId', expensesId)
    setModalIsOpen(true);
    setSelectedExpensesId(expensesId);

};

const closeModal = () => {
    settogle(!togle)
    setModalIsOpen(false);
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

//for error

const [errors, setErrors] = useState({
    expenses_purpose: "",
    expenses_bill: "",
   });

const validateForm = () => {
    let isValid = true;
    const newErrors = {};                                   //newErrors this is a objec

    if (!formData.expenses_purpose.trim()) {              //whide space htane ke liye
        newErrors.expenses_purpose = "expenses_purpose is required";
        isValid = false;
    }

    if (!formData.expenses_bill.trim()) {
        newErrors.expenses_bill = "expenses_bill is required";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
};


    const closePopup = () => {
        setIsOpen(false);
    };

      //============================================
    //for searching-------------------

    const handleChange = async (event) => {
        setQuery(event.target.value);
        console.log(event.target.value)
        if (event.target.value !== '') {
            try {
                const response = await axios.get(`${BASE_API_URL}expenses/search?search=${event.target.value}`, {
                });
                console.log(query)
                settableData(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            try {
                const response = await axios.get(`${BASE_API_URL}expenses/getexpenses`);
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
                const response = await axios.get(`${BASE_API_URL}expenses/sortorder?order=${sortDirection}&coloum=${sortColumn}`);
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
    //=======================================

    return(
        <>

        <Nav />

        <div >
 
 <div style={{ backgroundColor: '#28769a' }}>
 {/* WELCOME TO EXPENSES PAGE (current state) */}
     <h1 className='headerData'>WELCOME TO EXPENSES PAGE</h1>                       
 </div>
 <div >
     <div class="row">
         <div class="col-12">
             <div class="card">
                 <div class="card-body text-center">

                     <div>
                        {/* for single space (nbsp) */}
                         <button className="backButton" onClick={openPopup}>Add &nbsp;<FontAwesomeIcon icon={faPlusCircle} />                      
                         </button>
                     </div> 

                     <div> 
                    <span> 
                     <button className="multiDeleteButton" onClick={() => { Deletemulti() }}><FontAwesomeIcon icon={faTrashAlt} />
                     </button>
                     </span>
                     </div>
                     
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
                                                         <label><b>Purpose</b></label>

                                                             <input type="text" name="expenses_purpose" value={formData.expenses_purpose} onChange={handleInputChange} class="form-control" placeholder="Purpose" />
                                                             {errors.expenses_purpose && <span className="error" style={{ color: 'red' }}>{errors.expenses_purpose}</span>}

                                                             
                                                         </div>
                                                         <div class="mb-3 col-md-6">
                                                         <label><b>Bill</b></label>

                                                             <input type="text" name="expenses_bill" value={formData.expenses_bill} onChange={handleInputChange} class="form-control" placeholder="Bill" />
                                                               {errors.expenses_bill && <span className="error" style={{ color: 'red' }}>{errors.expenses_bill}</span>}

                                                              
                                                         </div>
                                                         
                                                         <div class="mb-3 col-md-6">
                                                         <label><b>Amount</b></label>


                                                             <input type="text" name="expenses_amount" value={formData.expenses_amount} onChange={handleInputChange} class="form-control" placeholder="Amount" />
                                                         </div>
                                                         <div class="mb-3 col-md-6">
                                                         <label><b>Voucher</b></label>

                                                             <input type="text" name="expenses_voucher" value={formData.expenses_voucher} onChange={handleInputChange} class="form-control" placeholder="Voucher" />

                                                         </div>
                                                         <div class="mb-3 col-md-6" >
                                                         <label><b>Remark</b></label>

                                                             <input type="text" name="expenses_remark" value={formData.expenses_remark} onChange={handleInputChange} class="form-control" placeholder="Remark" />

                                                         </div>
                                                         <div class="mb-3 col-md-6">
                                                         <label><b>Cash</b></label>

                                                          <input type="text" name="expenses_by_cash" value={formData.expenses_by_cash} onChange={handleInputChange} class="form-control" placeholder="Cash" />
                                                         </div>
                                                         <div class="mb-9 col-md-6" >
                                                         <label><b>Cheque</b></label>

                                                             <input type="text" name="expenses_by_cheque" value={formData.expenses_by_cheque} onChange={handleInputChange} class="form-control" placeholder="Cheque" />
                                                         </div>
                                                         <div class="mb-3 col-md-6">
                                                         <label><b>Cash Recieved By</b></label>

                                                         <input type="text" name="expenses_cash_recieved_by" value={formData.expenses_cash_recieved_by} onChange={handleInputChange} class="form-control" placeholder="Cash Recieved BY" />
                                                         </div>
    
                                                         
                                                       
                                                         
                                                         <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                     </div>
                                                     <div class="col-md-12">
                                                         <button type="submit">Add Expenses</button>
                                                     </div>
                                                 </form>
                                                 <label className="formLabelAgain">If you want to login <u><Link to="/login" style={{ color: 'black' }}>Login</Link></u>,
                                                 </label>                                                            
                                                 </div>
                                         </div>
                                     </div>
                                 </div>       
                                 </div>
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
                                {/* <th  scope="col">ID</th> */}
                                 {/* <th  scope="col">PURPOSE </th> */}
                                 <th scope="col" onClick={() => handleSort('expenses_purpose')}>NAME {sortColumn === 'expenses_purpose' && (            //for sorting
                                                    <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                                                )}</th>
                                 {/* <th  scope="col">BILL</th> */}
                                 <th scope="col" onClick={() => handleSort('expenses_bill')}>BILL {sortColumn === 'expenses_bill' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                                                )}</th>
                                 <th  scope="col">REMARK</th>
                                 <th scope="col" >ACTIONS</th>  
                                 <th>
                                 {/* smjh ni aya */}
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
                                     <td>{data.expenses_purpose}</td> 
                                     <td>{data.expenses_bill}</td>
                                     <td>{data.expenses_remark}</td>

                                   

                            {/* for edit----- */}

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
                                      
                            {/* for edit----- */}
                                      <ModalBox isOpen={modalIsOpen} expensesId={selectedExpensesId} onRequestClose={closeModal}>
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


export default Expenses;