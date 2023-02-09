import { useEffect, useState } from "react";
import React from "react";
import Header from "../Header/Header";
import Profile from "../subComponents/Profile";
import ShipModel from "../subComponents/ShipModel";
import Toast from "../subComponents/Toast";
import ReceiveModel from "../subComponents/ReceiveModel";
import Tracking from "../subComponents/Tracking";
import Overview from "../subComponents/Overview";
import { getDrugKeyListController, BatchDrugDetailsController } from "../../Controllers/Utilities/utilities";
import { getRoleListController, userRoleController, UserNamesController } from "../../Controllers/Utilities/utilities";

export default function DistributorDashboard() {

    const currentUser = localStorage.getItem("currentUser");
    const [drugList, setDrugList] = useState([]);
    const [drugDetList, setDrugDetList] = useState([]);
    const [isOverview, setIsOverview] = useState(true);
    const [allDrug, setAllDrug] = useState([]);
    const [selectedDrugDetails, SetSelectedDrugDetails] = useState([]);
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState('');
    const [nextowners, setNextOwners] = useState([]);
    const [Toastmsg,setToastmsg] =useState({
        isToastActive : false,
        message:'',
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
            const currentRole = await userRoleController(currentUser);
            setCurrentRole(currentRole.result);
            let res = await getDrugKeyListController();
            fetchDetails(res.result);
        } catch (error) {
            throw error
        }
    }

    async function fetchDetails(data) {
        setDrugList(data);
        setAllDrug([]);
        setDrugDetList([]);
        data.forEach(async drug => {
            let BatchDrugDetailsResponse = await BatchDrugDetailsController(drug);
            let result = BatchDrugDetailsResponse.result;
            setAllDrug(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, owner: result.CurrentproductOwner, manufacturerDetails: ManStatus, distDetails: distStatus }]);
            setDrugDetList(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, owner: result.CurrentproductOwner, manufacturerDetails: ManStatus, distDetails: distStatus }]);
        });
    }

    async function getDetails() {
        try {
            var x = [];
            let UserNamesResponse = await UserNamesController();
            var rolez = await getRoleListController();
            setRoles(rolez.result);
            let userRoleResponse = await userRoleController(currentUser);
            setCurrentRole(userRoleResponse.result)
            var nextIndex;
            rolez.result.forEach((rol, index) => {
                if (rol === userRoleResponse.result) {
                    nextIndex = index + 1;
                }
            })
            UserNamesResponse.result.forEach(async res => {
                let userRoleResponse = await userRoleController(res);
                let role = userRoleResponse.result
                if (role === rolez.result[nextIndex]) {
                    x.push(res)
                    setNextOwners([...x]);
                }
            });
            fetchRoles();
            drugInfo();
        } catch (error) {
            throw error;
        }
    }

    function selectedDetails(drug) {
        SetSelectedDrugDetails(drug);
    }

    function filterByParam(filterValue, name = 'name') {
        let drugs = [];
        filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name] === filterValue));
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
                    drugs.push(drug)
                }
            });
            setDrugDetList(drugs);
        }
    }

    async function fetchRoles() {
        let ret = await getRoleListController();;
        ret = ret.result.slice(1);
        setRoles(ret);
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

    const updateReceiving = (type, msg) => {
        const data = {
            isToastActive: true,
            message: msg,
            messageType: type
        }
        setToastmsg(data);
        drugInfo();
    }

    function doSearch(filterValue, name = 'name') {
        filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name].toLowerCase().includes(filterValue.toLowerCase())));
    }

    return (
        <>
            <Header />
            <section class="breadcrumb-section">
                <div class="container-fluid">
                    <div class="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                            <p style={{ textAlign: 'right', fontStyle: 'italic' }}>Logged in as, <b>{currentRole}</b></p>
                        </nav>
                    </div>
                </div>
            </section>
            <main id="main">
                <section class="page-title mt-3 mx-4">
                    <div class="container-fluid">
                        <div class="row ">
                            <h2 class="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Dashboard</h2>
                        </div>
                    </div>
                </section>
                <Profile />
                <section class="products table-section mt-4 mx-4">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="table-block bg-white p-4 mb-5 rounded">
                                <div class="block-header d-flex justify-content-between">
                                    <h5 class="text-uppercase helvetica-medium fw-bold main-color">PRODUCTS</h5>
                                    <div class="search-block d-flex d-none">
                                        <form class="d-flex">
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button class="btn btn-outline-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="table-buttons mt-3">
                                    <div className="btn-group text-uppercase" role="group" aria-label="table buttons">
                                        <button type="button" className={`btn btn-outline-primary ${isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(true); drugInfo() }}>OVERVIEW</button>
                                        <button type="button" className={`btn btn-outline-primary ${!isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(false); drugInfo() }}>TRACKING</button>
                                    </div>
                                </div>
                                <div class="block-filters mt-4 d-flex justify-content-between flex-wrap">
                                    <div class="filters-list d-flex">
                                        <div class="filter me-3">
                                            <h6 class="sub-color">Product Name</h6>
                                            <select class="form-select main-color helvetica-light" aria-label="Product Name option" onChange={(e) => filterByParam(e.target.value, 'name')}>
                                                <option defaultValue>All</option>
                                                {allDrug.map((product, index) => {
                                                    return (
                                                        <option value={product.name}>   {product.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div class="filter me-3">
                                            <h6 class="sub-color">Product Status</h6>
                                            <select class="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => { filterByParam(e.target.value, 'status') }}>
                                                <option selected>All</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        <div class="filter me-3">
                                            <h6 class="sub-color">Present Location</h6>
                                            <select class="form-select main-color helvetica-light" aria-label="Present Location option" onChange={(e) => { filterByParam(e.target.value, 'location') }}>
                                                <option selected>All</option>
                                                <option value="Distributor">Distributor</option>
                                                <option value="Manufacturer">Manufacturer</option>
                                                <option value="Pharmacy">Pharmacy</option>
                                                <option value="Wholesaler">Wholesaler</option>
                                            </select>
                                        </div>
                                        <div class="filter me-3">
                                            <h6 class="sub-color">Shipment Status</h6>
                                            <select class="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => { filterByParam(e.target.value, 'shipmentstatus') }}>
                                                <option selected>All</option>
                                                <option value="Received">Received</option>
                                                <option value="Manufactured">Manufactured</option>
                                                <option value="Shipped">Shipped</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="search-block mt-2 align-self-end">
                                        <form class="d-flex">
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => doSearch(e.target.value)} />
                                        </form>
                                    </div>
                                </div>
                                <div class="table-container mt-4">
                                    <div class="table-responsive">
                                        <table class="table align-middle">
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

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {isOverview ? <Overview drugs={drugDetList} overview={isOverview} selectedDetails={selectedDetails} sendUpdateDetails={sendUpdateDetails} /> : <Tracking drugs={drugDetList} selectedDetails={selectedDetails} sendUpdateDetails={sendUpdateDetails} roles={roles} />}
                                            </tbody>
                                        </table>
                                        <div class=" table-footer d-flex  justify-content-between align-items-baseline">
                                            <div class="total_items text-muted">Total Items: {drugList.length}</div>
                                            <div class="Tables_paginate d-flex me-2">
                                                <div class="table-count me-3">
                                                    <label for="inputcount" class="form-label me-2 text-muted">Items per page:</label>
                                                    <select id="inputcount" class="form-select d-inline-block w-auto">
                                                        <option value="10" selected>10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>
                                                </div>
                                                <div class="paginate-block ">
                                                    <nav aria-label="Page navigation">
                                                        <ul class="pagination">
                                                            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                                                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="model-section">
                    <ReceiveModel id="receive-product" selectedDrugDetails={selectedDrugDetails} updateReceiving={updateReceiving} Toastmsg={Toastmsg}/>
                </div>
                <div className="model-section">
                    <ShipModel id="shipped-product" selectedDrugDetails={selectedDrugDetails} roles={roles} nextOwners={nextowners} currentRole={currentRole} updateShipment={updateShipment} Toastmsg={Toastmsg}/>
                </div>
                {Toastmsg.isToastActive &&<Toast Toastmsg={Toastmsg} />}
            </main>
        </>
    )
}