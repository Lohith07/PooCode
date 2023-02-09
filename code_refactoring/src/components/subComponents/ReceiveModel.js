import { useEffect, useState } from "react";
import { ReceivingController } from "../../Controllers/Utilities/utilities";

export default function ReceiveModel(props) {
    const { selectedDrugDetails, Toastmsg } = props;
    const [serialNumber, setSerialNumber] = useState(null);
    const [importingTemp, setImportingTemp] = useState(null);
    
    useEffect(() => {
        if (selectedDrugDetails) {
            setSerialNumber(selectedDrugDetails.serialNumber);
        }
    }, [props, selectedDrugDetails]);
    
    const resetFields = (e) => {
    }

    async function ReceiveDrug() {
        const params={
            serialNumber:serialNumber,
            importingTemp:importingTemp
        }
        let ret = await ReceivingController(params);
        props.updateReceiving('success', 'Drug receiving details updated successfully.');
    }

    async function processReceiving(e) {
        e.preventDefault();
        ReceiveDrug()
    }

    return (
        <div className="modal fade" id="receive-product" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h4 className="modal-title helvetica-medium main-color fw-bold" id="modal-title">Receive Product</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className=" g-3 helvetica-light sub-color">
                            <div className="row mb-2">
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="product-name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="product-name" disabled value={selectedDrugDetails.name} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="serial-number" className="form-label">Serial Number</label>
                                    <input type="text" className="form-control" id="serial-number" disabled value={selectedDrugDetails.serialNumber} />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="batch-id" className="form-label">Batch ID</label>
                                    <input type="text" className="form-control" id="batch-id" disabled value={selectedDrugDetails.batchId} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="source" className="form-label">Source</label>
                                    <select id="source" className="form-select" disabled>
                                        <option defaultValue={selectedDrugDetails.location}>{selectedDrugDetails.location}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row  mb-2">
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="col-6 me-2">
                                        <label htmlFor="current-temp" className="form-label">Current Temp..</label>
                                        <input id="current-temp" type="text" className="form-control" value={importingTemp} onChange={(e) => { setImportingTemp(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 text-end">
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal" onClick={(e) => { processReceiving(e) }}>Receive</button>
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
    );
}

