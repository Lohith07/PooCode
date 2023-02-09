import { useEffect, useState } from "react";
import Header from "../Header/Header";
import AddParticipant from "../subComponents/AddParticipant";
import { AddRoleController } from '../../Controllers/Admin';
import { ERROR_MESSAGE } from "../../Utility/Constant";
import { UserNamesController, userRoleController, getRoleListController, BatchUserDetailsController } from "../../Controllers/Utilities/utilities";
import Toast from "../subComponents/Toast";
import React from "react";

export default function AdminDashboard() {

    const [userList, setUserList] = useState([]);
    const [modelType, setModelType] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [AdminName, setAdminName] = useState('');
    const [Toastmsg,setToastmsg] =useState({
        isToastActive : false,
        message: false ? 'Saving Participant is failed.': 'Saving Participant completed successfully.',
        messageType: false ? 'failure' : 'success'
    });
    var textInput = React.createRef();

    useEffect(() => {
        fetchUserAddress();
        getRoles()
    }, [])

    async function getRoles() {
        let rolelistResponse = await getRoleListController();
        setRoles((rolelistResponse.result).slice(1));
    }

    async function addrole() {
        await AddRoleController(textInput.current.value);
    }

    async function fetchUserAddress() {
        try {
            let userAddresses = await UserNamesController();
            userAddresses.result.forEach(async userAddress => {
                let BatchUserResponse = await BatchUserDetailsController(userAddress);
                let userRoleResponse = await userRoleController(userAddress);
                let result = BatchUserResponse.result;
                if (userRoleResponse.result === 'Admin') {
                    setAdminName(result[0]);
                }
                setUserList(oldUserList => [...oldUserList, { name: result.Name, role: userRoleResponse.result, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive', userAddress: result.UserName }]);
                setAllUsers(oldUserList => [...oldUserList, { name: result.Name, role: userRoleResponse.result, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive', userAddress: result.UserName }]);
            });
        }
        catch  {
            return ERROR_MESSAGE.ERROR_FETCHING;
        }
    }

    const sendUpdateDetails = (user) => {
        setModelType('update');
        setSelectedUser(user);
    }

    const saveParticipant = (type, msg) => {
        const data = {
            isToastActive: true,
            message: msg,
            messageType: type
        }
        setToastmsg(data);
        fetchUserAddress();
        window.location.reload(false);
    }

    function filterByParam(filterValue, name = 'name') {
        filterValue === 'All' ? setUserList(allUsers) : setUserList(allUsers.filter(user => user[name] === filterValue));
    }

    function doSearch(filterValue, name = 'name') {
        filterValue === 'All' ? setUserList(allUsers) : setUserList(allUsers.filter(user => user[name].toLowerCase().includes(filterValue.toLowerCase())));
    }

    return (
        <div>
            <Header />
            <section className="breadcrumb-section">
                <div className="container-fluid">
                    <div className="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Participants</li>
                            </ol>
                            <p style={{ textAlign: 'right', fontStyle: 'italic' }}>Logged in as, <b>{AdminName}</b></p>
                        </nav>
                    </div>
                </div>
            </section>
            <main id="main">
                <section class="page-title mt-4 mx-4">
                    <div class="container-fluid">
                        <div class="row ">
                            <h2 class="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Participants</h2>
                        </div>
                    </div>
                </section>
                <section className="participants mt-4 mx-4">
                    <div className="container-fluid">
                        <div className="row">   
                            <div className="table-block bg-white p-4 mb-5 rounded">
                                <div className="block-header d-flex justify-content-between">
                                    <h5 className="text-uppercase helvetica-medium fw-bold main-color">Participants</h5>
                                    <div className="search-block d-flex">
                                        <button className="btn btn-primary me-3" type="button" data-bs-toggle="modal" data-bs-target="#add-participant" onClick={() => setModelType('add')}>
                                            Add Participant
                                        </button>
                                        <form className="d-flex">
                                            <input id="key" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { doSearch(e.target.value, 'name') }} />
                                        </form>
                                    </div>
                                </div>
                                <div className="block-filters mt-3 d-flex justify-content-between">
                                    <div className="filters-list d-flex">
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Name</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="name selection option" onChange={(e) => filterByParam(e.target.value, 'name')}>
                                                <option defaultValue>All</option>
                                                {allUsers.map((user, index) => {
                                                    return (
                                                        <option value={user.name}>{user.name}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Role</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Role selection option" onChange={(e) => filterByParam(e.target.value, 'role')}>
                                                <option defaultValue>All</option>
                                                {roles.map((role) => {
                                                    return (
                                                        <option value={role} >{role}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Status selection option" onChange={(e) => filterByParam(e.target.value, 'status')}>
                                                <option defaultValue>All</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-container mt-3">
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr className="text-capitalize">
                                                    <th scope="col" className="sorting asc">Name</th>
                                                    <th scope="col" className="sorting asc">Role</th>
                                                    <th scope="col">Contact Number</th>
                                                    <th scope="col">Email ID</th>
                                                    <th scope="col" className="sorting desc">Status</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.name}</td>
                                                            <td><span className={user.role}>{user.role}</span></td>
                                                            <td>{user.contact}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.status}</td>
                                                            <td><button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#add-participant" onClick={() => sendUpdateDetails(user)}>Update</button></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        <div className=" table-footer d-flex  justify-content-between align-items-baseline">
                                            <div className="total_items text-muted">Total Items: {userList && userList.length || 0}</div>
                                            {userList.length > 10 && <div className="Tables_paginate d-flex me-2">
                                                <div className="table-count me-3">
                                                    <label htmlFor="inputcount" className="form-label me-2 text-muted">Items per page:</label>
                                                    <select id="inputcount" className="form-select d-inline-block w-auto">
                                                        <option value="10" defaultValue>10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>
                                                </div>
                                                <div className="paginate-block ">
                                                    <nav aria-label="Page navigation">
                                                        <ul className="pagination">
                                                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>}
                                        </div>
                                        <div>
                                            <input ref={textInput} type="text" />
                                            <button className="btn btn-primary" onClick={addrole}>Add Role</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="model-section">
                    <AddParticipant id="add-participant" title={modelType === 'add' ? 'Add Participant' : 'Update Participant'}  selectedUser={selectedUser} saveParticipant={saveParticipant} />
                </div>
                {Toastmsg.isToastActive && <Toast Toastmsg={Toastmsg} />}
            </main>
        </div>
    )
}
