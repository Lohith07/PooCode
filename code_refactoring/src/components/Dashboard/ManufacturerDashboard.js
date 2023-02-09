import { useEffect, useState } from "react";
import Header from "../Header/Header";
import React from "react";
import Profile from "../subComponents/Profile";
import ShipModel from "../subComponents/ShipModel";
import Toast from "../subComponents/Toast";
import './styles/style.css';
import Tracking from "../subComponents/Tracking";
import Overview from "../subComponents/Overview";
import { UserNamesController, userRoleController, getRoleListController, BatchDrugDetailsController, getDrugKeyListController } from "../../Controllers/Utilities/utilities";

export default function ManufacturerDashboard() {
    const [userList, setUserList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [drugList, setDrugList] = useState([]);
    const [drugDetList, setDrugDetList] = useState([]);
    const [allDrug, setAllDrug] = useState([]);
    const [selectedDrugDetails, SetSelectedDrugDetails] = useState([]);
    const [isOverview, setIsOverview] = useState(true);
    const [nextowners, setNextOwners] = useState([]);
    const [Toastmsg, setToastmsg] = useState({
        isToastActive: false,
        message: '',
        messageType: false ? 'failure' : 'success'
    });
    const ManStatus = '';
    const distStatus = '';

    useEffect(() => {
        getDetails();
        fetchRoles();
    }, [])

    const sendUpdateDetails = (product) => {
        SetSelectedDrugDetails(product);
    }

    async function drugInfo() {
        try {
            let res = await getDrugKeyListController();
            fetchDetails(res.result);
        } catch (error) {
            throw error
        }
    }

    function fetchDetails(data) {
        {
            setDrugList(data);
            setDrugDetList([])
            setAllDrug([]);
            data.forEach(async drug => {
                let BatchDrugDetailsResponse = await BatchDrugDetailsController(drug);
                let result = BatchDrugDetailsResponse.result;
                setAllDrug(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, owner: result.CurrentproductOwner, manufacturerDetails: ManStatus, distDetails: distStatus }]);
                setDrugDetList(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, owner: result.CurrentproductOwner, manufacturerDetails: ManStatus, distDetails: distStatus }]);
            })
        }
    }

    async function getDetails() {
        try {
            var x = [];
            let UserNamesResponse = await UserNamesController();
            setUserList(UserNamesResponse.result)
            UserNamesResponse.result.forEach(async res => {
                let userRoleResponse = await userRoleController(res);
                let role = userRoleResponse.result
                if (role === "Distributor") {
                    x.push(res)
                    setNextOwners([...x]);
                }
                
            });
        } catch (error) {
            throw error;
        }
        drugInfo();
    }

    function selectedDetails(drug) {
        SetSelectedDrugDetails(drug);
    }

    function filterByParam(filterValue, name = 'name') {
        let drugs = [];
        filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name] === filterValue));
        if (name === 'status') {
            if (filterValue.toLowerCase() == 'false') {
                filterValue = true;
                allDrug.forEach(drug => {
                    if (drug.status == filterValue) {
                        drugs.push(drug);
                    }
                })
            }
            else {
                filterValue = false;
                allDrug.forEach(drug => {
                    if (drug.status == filterValue) {
                        drugs.push(drug);
                    }
                })
            }
            setDrugDetList(drugs);
        }
        if (name == 'shipmentstatus') {
            if (filterValue === 'All') {
                drugs = allDrug;
            }
            allDrug.forEach(drug => {
                if (drug.shipmentStatus === filterValue) {
                    drugs.push(drug);
                }
            });
            setDrugDetList(drugs)
        }
    }

    function doSearch(filterValue, name = 'name') {
        filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name].toLowerCase().includes(filterValue.toLowerCase())));
    }

    async function fetchRoles() {
        let rolelistResponse = await getRoleListController();
        setRoles((rolelistResponse.result).slice(1));
    }

    const updateShipment = (type, msg) => {
        const data = {
            isToastActive: true,
            message: msg,
            messageType: type
        }
        setToastmsg(data);
        drugInfo();
    }

    return (
        <div>
            <Header />
            <section className="breadcrumb-section">
                <div className="container-fluid">
                    <div className="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">All Users</li>
                            </ol>
                            <p style={{ textAlign: 'right', fontStyle: 'italic' }}>Logged in as, <b>{roles[0]}</b></p>
                        </nav>
                    </div>
                </div>
            </section>
            <main id="main">
                <section className="page-title mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row ">
                            <h2 className="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Dashboard</h2>
                        </div>
                    </div>
                </section>
                <Profile />
                <section className="data-count-section mt-4 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-6 ps-0">
                                <div className="participants-count d-flex bg-white w-100 flex-wrap bg-white p-4  rounded justify-content-between">
                                    <div className="count-block d-flex">
                                        <div className="count-img m-auto me-3">
                                            <img className="img-fluid p-3" alt="user image" src={require('../../assets/images/users.jpg').default} />
                                        </div>
                                        <div className="count main-color m-auto">
                                            <h5 className="helvetica-medium text-uppercase">PARTICIPANTS</h5>
                                            <div className="fs-1">{userList.length}</div>
                                        </div>
                                    </div>
                                    <div className="button-block">
                                        <a href="/user-list" className="btn btn-outline-primary">View</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 pe-0">
                                <div className="all-products-count d-flex bg-white w-100 flex-wrap bg-white p-4  rounded justify-content-between">
                                    <div className="count-block d-flex">
                                        <div className="count-img m-auto me-3">
                                            <img className="img-fluid p-3" alt="user image" src={require('../../assets/images/cube.jpg').default} />
                                        </div>
                                        <div className="count main-color m-auto">
                                            <h5 className="helvetica-medium text-uppercase">ALL PRODUCTS</h5>
                                            <div className="fs-1">{drugList.length}</div>
                                        </div>
                                    </div>
                                    <div className="button-block">
                                        <a href="/all-products" className="btn btn-outline-primary">Update</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="products table-section mt-4 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="table-block bg-white p-4 mb-5 rounded">
                                <div className="block-header d-flex justify-content-between">
                                    <h5 className="text-uppercase helvetica-medium fw-bold main-color">PRODUCTS</h5>
                                </div>
                                <div className="table-buttons mt-3">
                                    <div className="btn-group text-uppercase" role="group" aria-label="table buttons">
                                        <button type="button" className={`btn btn-outline-primary ${isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(true); drugInfo() }}>OVERVIEW</button>
                                        <button type="button" className={`btn btn-outline-primary ${!isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(false); drugInfo() }}>TRACKING</button>
                                    </div>
                                </div>
                                <div className="block-filters mt-4 d-flex justify-content-between flex-wrap">
                                    <div className="filters-list d-flex">
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Product Name</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Name option" onChange={(e) => filterByParam(e.target.value, 'name')}>
                                                <option defaultValue>All</option>
                                                {allDrug.map((product, index) => {
                                                    return (
                                                        <option value={product.name}>{product.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Product Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => filterByParam(e.target.value, 'status')}>
                                                <option defaultValue>All</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Present Location</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Present Location option" onChange={(e) => filterByParam(e.target.value, 'location')}>
                                                <option defaultValue>All</option>
                                                <option value="Distributor">Distributor</option>
                                                <option value="Manufacturer">Manufacturer</option>
                                                <option value="Pharmacy">Pharmacy</option>
                                                <option value="Wholesaler">Wholesaler</option>
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Shipment Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => filterByParam(e.target.value, 'shipmentstatus')}>
                                                <option defaultValue>All</option>
                                                <option value="Received">Received</option>
                                                <option value="Manufactured">Manufactured</option>
                                                <option value="Shipped">Shipped</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="search-block mt-2 align-self-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {
                                                doSearch(e.target.value, 'name')
                                            }} />
                                        </form>
                                    </div>
                                </div>
                                <div className="table-container mt-4">
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr className="text-capitalize">
                                                    <th scope="col">Serial No.</th>
                                                    <th scope="col" className="sorting desc">Product Name</th>
                                                    <th scope="col">Batch ID</th>
                                                    <th scope="col" className="sorting asc">Product Status</th>
                                                    {isOverview && <th scope="col" className="sorting asc">Present Location</th>}
                                                    {isOverview && <th scope="col" className="sorting asc">Shipment Status</th>}
                                                    {!isOverview && roles.map((product, index) => {
                                                        return (
                                                            <th>{product}</th>
                                                        )
                                                    })}
                                                    <th scope="col">Action</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {isOverview ? <Overview drugs={drugDetList} overview={isOverview} selectedDetails={selectedDetails} sendUpdateDetails={sendUpdateDetails} /> : <Tracking drugs={drugDetList} selectedDetails={selectedDetails} sendUpdateDetails={sendUpdateDetails} roles={roles} />}
                                            </tbody>
                                        </table>
                                        <div className=" table-footer d-flex  justify-content-between align-items-baseline">
                                            <div className="total_items text-muted">Total Items: {drugList.length}</div>
                                            {drugList.length > 10 && <div className="Tables_paginate d-flex me-2">
                                                <div className="table-count me-3">
                                                    <label for="inputcount" className="form-label me-2 text-muted">Items per page:</label>
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
                <div className="model-section">
                    <ShipModel id="shipped-product" selectedDrugDetails={selectedDrugDetails} roles={roles} currentRole={roles[0]} nextOwners={nextowners} updateShipment={updateShipment} />
                </div>
                {Toastmsg.isToastActive && <Toast Toastmsg={Toastmsg} />}
            </main>

        </div>
    );

}