import AdminDashboard from "./AdminDashboard";
import { useEffect, useState } from "react";
import ManufacturerDashboard from "./ManufacturerDashboard";
import DistributorDashboard from "./DistributorDashboard";
import web3 from '../../web3';
import { userRoleController } from "../../Controllers/Utilities/utilities";

export default function Dashboard() {
  const [role, setRole] = useState('');
  async function getUserRole() {
    let accounts = await web3.eth.getAccounts();
    let a = accounts[0];
    const role = await userRoleController(a);
    setRole(role.result);
  }

  useEffect(() => {
      getUserRole();
  }, [])

  return (<div>{role && ((role.toUpperCase() === 'ADMIN' && <AdminDashboard />)
    || (role.toUpperCase() === 'MANUFACTURER' && <ManufacturerDashboard />)
    || <DistributorDashboard />)
  }
  </div>
  )
}
