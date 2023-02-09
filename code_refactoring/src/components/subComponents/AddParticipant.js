import { useEffect, useState } from "react";
import $ from "jquery";
import AdminDashboard from "../Dashboard/AdminDashboard";
import { getRoleListController } from "../../Controllers/Utilities/utilities";
import { setUserController } from "../../Controllers/Admin";

export default function AddParticipant(props) {
  const { title, selectedUser } = props;
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    getRoles();
    if (selectedUser) {
      document.getElementById("passs").style.display = "none"
      setName(selectedUser.name);
      setUserName(selectedUser.userName);
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
      setcontactNo(selectedUser.contact);
      setRole(selectedUser.role);
      setStatus(selectedUser.status === "Active" ? true : false);
      getRoles();
    }
  }, [props, selectedUser]);

  function resetFields() {
    setName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setcontactNo("");
    setRole("");
    setStatus(true);
    $("#status").prop("checked", true);
  }

  async function getRoles() {
    let rolelist = await getRoleListController();
    setRoles(rolelist.result.slice(1));
  }

  async function createParticipant() {
    try {
      let params = {
        name: name,
        contactNo: contactNo,
        userName: userName,
        password: password,
        email: email,
        role: role,
        value: false,
        status: status
      }
      let res = await setUserController(params);
      AdminDashboard.SpinnerControl(true);
      let result = res.result.events.AddParticipant.returnValues.username;
      if (result == userName) {
        props.saveParticipant("Success", "Participant Added Successfully");
        resetFields();
      } else {
        props.saveParticipant(
          "Failed",
          "Something went wrong. Please check the values you have entered and try again"
        );
        resetFields();
      }
    } catch (Error) {
      throw Error;
    }
  }

  async function UpdateParticipant() {
    try {
      let rolz = document.getElementById("role").value;
      const params = {
        name: name,
        contactNo: contactNo,
        userName: userName,
        password: '',
        email: email,
        rolz: rolz,
        value: true,
        status: status

      }
      let res = await setUserController(params);
      if (true) {
        props.saveParticipant("Success", "Participant Added Successfully");
        resetFields();
      }
    } catch (Error) {
      throw Error;
    }
  }

  const saveParticipant = (event) => {
    event.preventDefault();
    if (title === "update") {
      UpdateParticipant();
    } else {
      createParticipant();
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="add-participant"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h4
                className="modal-title helvetica-medium main-color fw-bold"
                id="modal-title"
              >
                {title}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className=" g-3 helvetica-light sub-color">
                <div className="row mb-2">
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Participant Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12 col-md-6">
                    <label htmlFor="user-name" className="form-label">
                      User Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div id="passs" className="col-12 col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12 col-md-6">
                    <label htmlFor="contact-number" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact-number"
                      value={contactNo}
                      onChange={(e) => setcontactNo(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="email-id" className="form-label">
                      Email ID
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email-id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12 col-md-6">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      id="role"
                      className="form-select text-muted"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option defaultValue=""></option>
                      {roles.map((r) => {
                        return <option value={r}>{r}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-end mt-3">
                    <div className="form-check status-check form-switch d-flex justify-content-between ps-0">
                      <label className="form-check-label" htmlFor="status">
                        Participant Status
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="status"
                        defaultChecked
                        onChange={(e) => {
                          setStatus(!status);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12 text-end">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      data-bs-dismiss="modal"
                      onClick={(e) => saveParticipant(e)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
