import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Profile from "./Profile";
import { userRoleController, UserNamesController, BatchUserDetailsController } from "../../Controllers/Utilities/utilities";

export default function UserList() {
    const [userList, setUserList] = useState([]);
    const [currentRole, setCurrentRole] = useState('');
    const currentUser = localStorage.getItem("currentUser");
    
    useEffect(() => {
        fetchUserAddress();
    }, [])

    async function fetchUserAddress() {
        const currentRole = await userRoleController(currentUser);
        setCurrentRole(currentRole.result);
        try {
            let userAddresses = await UserNamesController();
            userAddresses.result.forEach(async res => {
                let Role = await userRoleController(res);
                let BatchUserResponse = await BatchUserDetailsController(res);
                let result = BatchUserResponse.result;
                setUserList(oldUserList => [...oldUserList, { name: result.Name, role: Role.result, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive' }]);
            })
        }
        catch (error) {
            throw error;
        }
    }

    return (
        <>
            <Header />
            <section className="breadcrumb-section">
                <div className="container-fluid">
                    <div className="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">All Users</li>
                            </ol>
                            <p style={{ textAlign: 'right', fontStyle: 'italic' }}>Logged in as, <b>{currentRole}</b></p>
                        </nav>
                    </div>
                </div>
            </section>
            <main id="main">
                <section className="page-title mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row ">
                            <h2 className="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">All Users</h2>
                        </div>
                    </div>
                </section>
                <Profile />
                <section className="participants mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="table-block bg-white p-4 mb-5 rounded">
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.name}</td>
                                                            <td><span className={user.role.toLowerCase()}>{user.role}</span></td>
                                                            <td>{user.contact}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.status}</td>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}