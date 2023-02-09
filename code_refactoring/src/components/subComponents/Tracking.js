
import React, { useEffect, useState } from "react";
import $ from 'jquery';
import { getRoleListController,getTreeDetailsController } from "../../Controllers/Utilities/utilities";

export default function Tracking(props) {

    const [style, setStyle] = useState({ display: 'none' });
    const [treeArray, setTreeArray] = useState([]);
    const { drugs, selectedDetails, sendUpdateDetails,roles } = props;
    const currentUser = localStorage.getItem('currentUser');

    useEffect(() => {
        if (treeArray.length == 0) {
            TreeDetails();
        }
    })

    useEffect(() => {
    }, [props])


    async function TreeDetails() {
        drugs.forEach(async element => {
            let arr = await getTreeDetailsController(element.serialNumber);
            treeArray.push(arr.result);
            setTreeArray(treeArray);
        });
    }

    function showSerialNumber(n) {
        $("." + n).css('display', 'block')
    }

    function hideSerialNumber(n) {
        $("." + n).css('display', 'none');
    }

    return (
        <>
            {drugs.map((drug, index1) => {
                return (
                    <tr key={index1}>
                        { }
                        <td className="qrcode" ><img src={`http://api.qrserver.com/v1/create-qr-code/?data=${drug.serialNumber}`}
                            alt="#" width="50" height="50"
                            onMouseEnter={e => {
                                showSerialNumber(drug.serialNumber)
                            }}
                            onMouseLeave={e => { hideSerialNumber(drug.serialNumber); }} />
                            <div style={style} className={drug.serialNumber}>{drug.serialNumber}</div>
                        </td>
                        <td>{drug.name}</td>
                        <td>{drug.batchId}</td>
                        <td>{drug.status ? 'Inactive' : 'Active'}</td>
                        {roles != "" && roles.map((role, index2) => {
                            console.log(drug.shipmentStatus);
                            return <>
                                <td>
                                    {treeArray.length != 0 && treeArray[index1][index2] != undefined &&
                                        treeArray[index1][index2].DrugStatus 
                                    }
                                    {treeArray.length != 0 && treeArray[index1][index2] == undefined &&
                                        <> NA </>}
                                </td>
                            </>
                        }
                        )}
                        <td><a href={`/shipment-progress?id=${drug.serialNumber}`} type="button" className="btn btn-outline-primary">Details</a></td>
                        {currentUser === drug.owner && drug.shipmentStatus === 'Manufactured' && <td><a href="#" data-bs-toggle="modal" data-bs-target="#shipped-product" type="button" className="btn btn-outline-primary" onClick={() => { selectedDetails(drug); sendUpdateDetails(drug) }}>Ship</a></td>}
                    </tr>
                );
            })}
        </>
    )
}