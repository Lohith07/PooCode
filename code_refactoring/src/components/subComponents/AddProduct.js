import { useEffect, useState } from "react";
import $ from "jquery";
import axios from 'axios';
import web3 from '../../web3';
import { addDrugDetailsController } from "../../Controllers/Manufacturer";

export default function AddProduct(props) {
    const { title, selectedProduct } = props;
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);
    const [drugId, setDrugId] = useState('');
    const [currTemp, setCurrTemp] = useState('');
    const [temperature, setTemperature] = useState('');
    const [batchId, setBatchId] = useState('');
    const [location, setLocation] = useState('Manufacturer');
    const [manufacturedDate, setManufacturedDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [scale, setScale] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [tokenURI, setTokenURI] = useState('')
    const [image, setImage] = useState()

    function dateToEpoch(date) {
        return Math.floor(new Date(date).getTime() / 1000.0)
    }

    function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
        const date = new Date(epoch * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    async function createProduct(drugId, batchId, name, location, manufacturedDate, expiryDate, currTemp, temperature) {
        const accounts = await web3.eth.getAccounts();
        const ManufDate = dateToEpoch(manufacturedDate);
        const ExpDate = dateToEpoch(expiryDate);
        const params = {
            drugId: drugId,
            batchId: batchId,
            name: name,
            location: location,
            ManufDate: ManufDate,
            ExpDate: ExpDate,
            currTemp: currTemp,
            temperature: temperature,
            serialNumber: "0x0000000000000000000000000000000000000000",
            status: status,
            tokenURI: tokenURI
        }
        let result = await addDrugDetailsController(params);
        window.location.reload(false)
        resetFields();
    }

    async function UpdateProduct(selectedProduct) {
        const accounts = await web3.eth.getAccounts();
        try {
            const ManufDate = dateToEpoch(manufacturedDate);
            const ExpDate = dateToEpoch(expiryDate);
            const params = {
                drugId: drugId,
                batchId: batchId,
                name: name,
                location: location,
                ManufDate: ManufDate,
                ExpDate: ExpDate,
                currTemp: currTemp,
                temperature: temperature,
                serialNumber: serialNumber,
                status: status,
                tokenURI: tokenURI
            }
            let res = await addDrugDetailsController(params);
            let drug = {
                "CurrentUser": localStorage.getItem('currentUser'),
                "DrugID": drugId,
                "BatchID": "" + batchId,
                "DrugName": name,
                "Location": location,
                "Mfg": dateToEpoch(manufacturedDate),
                "Exp": dateToEpoch(expiryDate),
                "CurrentTemp": currTemp,
                "MaxTemp": temperature,
                "SerialNumber": serialNumber,
                "IsBad": status,
            };

        }
        catch (Error) {
            throw Error;
        }
        window.location.reload(false)
    }

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setDrugId(selectedProduct.drugId);
            setBatchId(selectedProduct.batchId);
            setSerialNumber(selectedProduct.serialNumber);
            setCurrTemp(selectedProduct.currentTemp);
            setTemperature(selectedProduct.idealTemp);
            setManufacturedDate(epochToDate(selectedProduct.manufactureDate));
            setExpiryDate(epochToDate(selectedProduct.expiryDate));
            setSerialNumber(selectedProduct.serialNumber);
        }
    }, [props, selectedProduct])

    const saveProduct = (event) => {
        event.preventDefault();
        if (title === 'Add Product') {
            let fd = new FormData();
            fd.append('file', image)
            let url = 'http://10.0.183.244:4000/image'
            axios.post(url, fd)
                .then(res => {
                    setTokenURI(res.data);
                })
            if (tokenURI != null) {
                createProduct(drugId, batchId, name, location, manufacturedDate, expiryDate, currTemp, temperature);
            }
        }
        else {
            UpdateProduct(selectedProduct);
        }
    }

    const resetFields = () => {
        $("#").children("input").value = "";
    }

    const fileHandler = event => {
        setImage(event.target.files[0])
    }

    return (
        <div className="modal fade" id="add-product" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h4 className="modal-title helvetica-medium main-color fw-bold" id="modal-title">{title || 'Add Product'}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => { resetFields(e) }}></button>
                    </div>
                    <div className="modal-body">
                        <form className=" g-3 helvetica-light sub-color">
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="serial-number" className="form-label">Drug ID</label>
                                    <input type="text" className="form-control" id="serial-number" value={drugId} onChange={(e) => setDrugId(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="product-name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="product-name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="batch-id" className="form-label">Batch ID</label>
                                    <input type="text" className="form-control" id="batch-id" value={batchId} onChange={(e) => setBatchId(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="location" className="form-label">Present Location</label>
                                    <select id="location" className="form-select" onChange={(e) => setLocation(e.target.value)} value={location}>
                                        {
                                            (selectedProduct) ? <option defaultValue={selectedProduct.location}>{selectedProduct.location}</option> : <option defaultValue={location}>{location}</option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="manufactured-date" className="form-label">Manufactured Date</label>
                                    <input type="text" className="form-control" id="manufactured-date" placeholder="mm/dd/yyyy" value={manufacturedDate} onChange={(e) => setManufacturedDate(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="expiry-date" className="form-label">Expiry Date</label>
                                    <input type="text" className="form-control" id="expiry-date" placeholder="mm/dd/yyyy" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="row  mb-2">
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="col-6 me-2">
                                        <label htmlFor="maximum-temp" className="form-label">Max Temp.</label>
                                        <input type="text" className="form-control" id="maximum-temp" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="scale" className="form-label">Scale</label>
                                        <select id="scale" className="form-select" value={scale} onChange={(e) => setScale(e.target.value)}>
                                            <option value disabled>Select</option>
                                            <option defaultValue="°F">°F</option>
                                            <option value="na">°C</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="col-6 me-2">
                                        <label htmlFor="current-temp" className="form-label">Current Temp.</label>
                                        <input type="text" className="form-control" id="current-temp" value={currTemp} onChange={(e) => setCurrTemp(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="scale" className="form-label">Scale</label>
                                        <select id="scale" className="form-select" value={scale} onChange={(e) => setScale(e.target.value)}>
                                            <option value disabled>Select</option>
                                            <option defaultValue="°F">°F</option>
                                            <option value="na">°C</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 d-flex align-items-end mt-3">
                                <div className="form-check status-check form-switch d-flex justify-content-between ps-0">
                                    <label className="form-check-label" htmlFor="status">Drug Status</label>
                                    <input className="form-check-input" defaultChecked type="checkbox" id="status" onChange={(e) => { setStatus(!status); }} />
                                </div>
                            </div>
                            <input type='file' onChange={fileHandler} />
                            <div className="row mb-2">
                                <div className="col-12 text-end">

                                    <button className="btn btn-primary" data-bs-dismiss="modal" type="submit" onClick={(e) => saveProduct(e)}>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer d-none">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { resetFields(e) }}>Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}