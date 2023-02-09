import { useEffect, useState } from "react";
import Header from "./Header/Header";
import AddProduct from "./subComponents/AddProduct";
import Toast from "./subComponents/Toast";
import { userRoleController, getDrugKeyListController, BatchDrugDetailsController } from "../Controllers/Utilities/utilities";

export default function AllProducts() {

    const [modelType, setModelType] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState([]);
    const [allDrug, setAllDrug] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [currentRole, setCurrentRole] = useState('');
    const currentUser = localStorage.getItem("currentUser");
    const [Toastmsg, setToastmsg] = useState({
        isToastActive: false,
        message: '',
        messageType: false ? 'failure' : 'success'
    });
    
    useEffect(() => {
        drugListing();
    }, [])

    const saveProduct = (type, msg) => {
        const data = {
            isToastActive: true,
            message: msg,
            messageType: type
        }
        setToastmsg(data);
        drugListing();
    }

    const sendUpdateDetails = (product) => {
        setModelType('update');
        setSelectedProduct(product);
    }

    async function drugListing() {
        setAllDrug([]);
        setAllProducts([]);
        const currentRole = await userRoleController(currentUser);
        setCurrentRole(currentRole.result);
        try {
            let drugs_fetched = await getDrugKeyListController();
            drugs_fetched.result.forEach(async drug => {
                let BatchDrugDetailsResponse = await BatchDrugDetailsController(drug);
                let result=BatchDrugDetailsResponse.result;
                setAllDrug(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, idealTemp: result.MaxTemperature, currentTemp: result.CurrentTemperature, manufactureDate: result.MfgTimeStamp, expiryDate: result.ExpTimeStamp }])
                setAllProducts(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, idealTemp: result.MaxTemperature, currentTemp: result.CurrentTemperature, manufactureDate: result.MfgTimeStamp, expiryDate: result.ExpTimeStamp }])
                setProductList(drugs_fetched.result);
            })
        }
        catch (error) {
            throw error;
        }
    }

    function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
        const date = new Date(epoch * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    function filterByParam(filterValue, name = 'name') {
        let drugs;
        if (name === 'status') {
            if (filterValue.toLowerCase() == 'false') {
                filterValue = false;
                allDrug.forEach(drug => {
                    if (drug.status == filterValue) {
                        drugs.push(drug);
                    }
                })
                setAllDrug(drugs);
            }
            else if (filterValue.toLowerCase() == 'true') {
                filterValue = true;
                allDrug.forEach(drug => {
                    if (drug.status == filterValue) {
                        drugs.push(drug);
                    }
                })
                setAllDrug(drugs);
            }
            else if (filterValue.toLowerCase() == 'all') {
                setAllDrug(allProducts)
            }
        }
        filterValue === 'All' ? setAllDrug(allProducts) : setAllDrug(allProducts.filter(drug => drug[name] === filterValue));
    }

    function doSearch(filterValue) {
        filterValue === 'All' ? setAllDrug(allProducts) : setAllDrug(allProducts.filter(drug => drug['name'].toLowerCase().includes(filterValue.toLowerCase())));
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
                                <li className="breadcrumb-item active" aria-current="page">All Products</li>
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
                            <h2 className="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">All Products</h2>
                        </div>
                    </div>
                </section>
                <section className="participants mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="table-block bg-white p-4 mb-5 rounded">
                                <div className="block-header d-flex justify-content-between">
                                    <h5 className="text-uppercase helvetica-medium fw-bold main-color">All Products</h5>
                                    <div className="search-block d-flex">
                                        <button className="btn btn-primary me-3" type="button" data-bs-toggle="modal" data-bs-target="#add-product" onClick={() => setModelType('add')}>
                                            Add Products
                                        </button>
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => doSearch(e.target.value, 'drugs')} />
                                        </form>
                                    </div>
                                </div>
                                <div className="block-filters mt-3 d-flex justify-content-between">
                                    <div className="filters-list d-flex">
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Product Name</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Name option" onChange={(e) => filterByParam(e.target.value, 'name')}>
                                                <option defaultValue>All</option>
                                                {allProducts.map((product, index) => {
                                                    return (
                                                        <option key={index * 19} value={product.name}>{product.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Product Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => filterByParam(e.target.value, 'status')}>
                                                <option defaultValue>All</option>
                                                <option key={19} value="false">Active</option>
                                                <option key={19} value="true">InActive</option>
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
                                                <option value="Wholesaler">In-Transit</option>
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Shipment Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => filterByParam(e.target.value, 'shipmentStatus')}>
                                                <option defaultValue>All</option>
                                                <option value="Received">Received</option>
                                                <option value="Manufactured">Manufactured</option>
                                                <option value="Manufactured">Shipped</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-container mt-3">
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr className="text-capitalize">
                                                    <th scope="col">Drug ID</th>
                                                    <th scope="col" className="sorting desc">Product Name</th>
                                                    <th scope="col">Batch ID</th>
                                                    <th scope="col" className="sorting asc">Product Status</th>
                                                    <th scope="col" className="sorting asc">Present Location</th>
                                                    <th scope="col" className="sorting asc">Shipment Status</th>
                                                    <th scope="col">Mfg. Date</th>
                                                    <th scope="col">Expiry Date</th>
                                                    <th scope="col">Max. Temp.</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allDrug.map((product, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.drugId}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.batchId}</td>
                                                            <td>{product.status ? 'Inactive' : 'Active'}</td>
                                                            <td><span className={product.location}>{product.location}</span></td>
                                                            <td>{product.shipmentStatus}</td>
                                                            <td>{epochToDate(product.manufactureDate)}</td>
                                                            <td>{epochToDate(product.expiryDate)}</td>
                                                            <td>{`${product.idealTemp}°F` || 'NA'}</td>
                                                            <td><button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#add-product" onClick={() => sendUpdateDetails(product)}>Update</button></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        <div className=" table-footer d-flex  justify-content-between align-items-baseline">
                                            <div className="total_items text-muted">Total Items: {productList.length}</div>
                                            {productList.length > 10 && <div className="Tables_paginate d-flex me-2">
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
                    <AddProduct id="add-product" title={modelType === 'add' ? 'Add Product' : 'Update Product'} selectedProduct={selectedProduct} saveProduct={saveProduct} />
                </div>
                {Toastmsg.isToastActive && <Toast Toastmsg={Toastmsg} />}
            </main>
        </div>
    )
}