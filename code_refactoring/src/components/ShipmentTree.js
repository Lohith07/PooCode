import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import $ from "jquery";
import { userRoleController,getRoleListController,getTreeDetailsController,BatchDrugDetailsController } from "../Controllers/Utilities/utilities";

export default function ShipmentTree() {
  const search = useLocation().search;
  const serialNo = new URLSearchParams(search).get("id");
  const [TreeArr, setTreearr] = useState([]);
  const [drug, setDrug] = useState({});
  const [roles, setRoles] = useState([]);
  const [booeleanArray, setBooleanArray] = useState([]);
  const [currentRole, setCurrentRole] = useState('');
  const currentUser = localStorage.getItem("currentUser");
  var boolArray = new Array(false);
  var users = [];
  var mapFlag = 1;
  var TreeCount = 0;
  var sourcee,
    destinationn,
    ImportingTemp,
    ExportingTemp,
    ImportingTime,
    exportingTime,
    Statuss;

  useEffect(() => {
  }, [booeleanArray]);

  useEffect(() => {
    getDrugDetails();
  }, []);

  async function getDrugDetails() {
    const currentRole = await userRoleController(currentUser);
    setCurrentRole(currentRole.result);
    let rolelist = await getRoleListController();
    let x = rolelist.result.slice(1)
    setRoles(x);
    boolArray = new Array(x.length);
    x.map((role, index) => {
      boolArray[index] = false;
    })
    setBooleanArray(boolArray)
    let res = await BatchDrugDetailsController(serialNo);
    setDrug(res.result);
    InitiateTree();
  }

  const handleClick = event => {
    event.currentTarget.classList.toggle('show-full');
  }

  function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
    const date = new Date(epoch * 1000);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  async function InitiateTree() {
    let arr = await getTreeDetailsController(serialNo);
    setTreearr(arr.result);
  }

  function getStatus(i, role) {
    try {
      if (i < TreeArr.length) {
        if (i == 0 && TreeArr[i].DrugStatus === "Shipped") {
          $("#" + i).addClass("first active");
          return "first active";
        } else if (TreeArr[i].DrugStatus === ("Exceeded Max temperature" || "Drug Expired")) {
          $("#" + i).addClass("return");
          return "return";
        } else if (TreeArr[i].DrugStatus === "Shipped" || "Received") {
          $("#" + i).addClass("active");
          return "active";
        }
      }
    } catch (error) {
      $("#" + i).addClass("");
      return "";
    }
  }

  function setDetails(i) {
    if (i >= TreeArr.length) {
      [sourcee, destinationn, ImportingTemp, ExportingTemp, Statuss] = "";
      exportingTime = 0;
      ImportingTime = 0;
    } else {
      Statuss = TreeArr[i].DrugStatus;
      exportingTime = TreeArr[i].ExportingDateTime;
      ImportingTime = TreeArr[i].ImportingDateTime;
      ExportingTemp = TreeArr[i].ExportingTemparature;
      ImportingTemp = TreeArr[i].ImportingTemparature;
      sourcee = TreeArr[i].FromUserName;
      destinationn = TreeArr[i].ToUserName;
      users.push(destinationn);
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
                <li className="breadcrumb-item">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shipment Progress
                </li>
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
              <h2 className="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">
                Shipment Progress - {drug.DrugName}
              </h2>
            </div>
          </div>
        </section>
        <section className="shipment-progress mt-3 mx-4">
          <div className="container-fluid">
            <div className="row">
              <div className="shipment-block bg-white p-4 mb-5 rounded position-relative">
                <div className="col-12 ">
                  <div className="card1">
                    <ul
                      id="d-none"
                      className="text-center p-0 position-absolute"
                    ></ul>
                  </div>
                </div>

                {roles.map((role, indexx) => {
                  mapFlag++;
                  var BoardSide;
                  if (mapFlag % 2 == 0) {
                    BoardSide =
                      "col-12 shipment-details  mt-3 position-relative d-flex justify-content-md-start";
                  } else {
                    BoardSide =
                      "col-12 shipment-details  mt-3 position-relative d-flex justify-content-end ";
                  }
                  getStatus(indexx, role)
                  setDetails(TreeCount);
                  TreeCount++;

                  return (
                    <div className={BoardSide} id="" onClick={handleClick}>
                      <div class="col-11 col-md-11 col-lg-5">
                        <div className="card shadow" >
                          <div className="card-header border-0 mt-3 bg-white">
                            <h4 className="text-uppercase main-color">
                              {role}
                            </h4>
                            <div className="block-header-text d-flex overflow-hidden mt-3 pb-4">
                            </div>
                          </div>
                          <div className="card-body" >
                            <div className="details " >
                              <table className="table table-borderless" >
                                <tbody>
                                  <tr>
                                    <th scope="row">Serial Number</th>
                                    <td>{serialNo}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Product Name</th>
                                    <td>{drug.DrugName}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Status</th>
                                    <td>{Statuss || "NA"}</td>
                                  </tr>
                                  <>
                                    <tr>
                                      <th scope="row">Batch ID</th>
                                      <td>{drug.BatchID}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Source</th>
                                      <td>
                                        {sourcee && TreeCount != 1
                                          ? sourcee
                                          : "NA"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Destination</th>
                                      <td>{destinationn || "NA"}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Importing Temparature </th>
                                      <td>
                                        {ImportingTemp && TreeCount != 1
                                          ? ImportingTemp
                                          : "NA"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Exporting Temp.</th>
                                      <td>{ExportingTemp || "NA"}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Importing Timestamp</th>
                                      <td>
                                        {ImportingTime != 0 && TreeCount != 1
                                          ? epochToDate(ImportingTime)
                                          : "NA"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Exporting Timestamp</th>
                                      <td>
                                        {exportingTime != 0
                                          ? epochToDate(exportingTime)
                                          : "NA"}
                                      </td>
                                    </tr>
                                  </>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="shipment_progress" className="progressbar me-5">
                        <div id={indexx} className="status_icon "></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
