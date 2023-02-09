import { useEffect, useState } from "react";
import web3 from '../../web3';
import { userRoleController,BatchUserDetailsController } from "../../Controllers/Utilities/utilities";

export default function Profile() {
  const [Role, setRole] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  async function fillDetails() {
    const a = await web3.eth.getAccounts();
    const addr = a[0];
    let R = await userRoleController(addr);
    setRole(R.result);
    let UserDetails = await BatchUserDetailsController(addr);
    setName(UserDetails.result.Name);
    setEmail(UserDetails.result.Email);
    setContact(UserDetails.result.ContactNo)
    return UserDetails;
  }
  
  useEffect(() => {
    fillDetails();
  }, []);

  return (
    <section class="profile-section mt-4 mx-4">
      <div class="container-fluid">
        <div class="row">
          <div class="profile-content d-flex flex-wrap bg-white px-4 py-3  rounded">
            <div class="profile-img me-4">
              <img
                class="img-fluid rounded-pill h-auto"
                alt="profile Image"
                src="./images/default-profile-img.jpg"
                width="100px"
              />
            </div>{" "}
            <div className="profile-details d-flex align-items-center flex-wrap mt-3">
              <div className="personal me-5">
                <div className="name d-flex ">
                  <h6 className="fw-bold me-3"> Name </h6>{" "}
                  <p> {name} </p>{" "}
                </div>
                <div className="role d-flex ">
                  <h6 className="fw-bold me-3"> Role </h6>{" "}
                  <p> {Role} </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="contact ms-md-5 me-3">
                <div className="contact d-flex">
                  <h6 className="fw-bold me-3"> Contact No. </h6>{" "}
                  <p> {contact} </p>{" "}
                </div>{" "}
                <div className="email d-flex">
                  <h6 className="fw-bold me-3"> Email ID </h6>{" "}
                  <p> {email} </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}