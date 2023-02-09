import Contract from '../../helper';
import web3 from '../../web3';

export const UserNamesServices = async () => {
    try {
        let result = await Contract.methods.UserNames().call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const userRoleServices = async (userAddress) => {
    try {
        let result = await Contract.methods.userRole(userAddress).call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const getRoleListServices = async () => {
    try {
        let result = await Contract.methods.getRoleList().call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const getDrugKeyListServices = async () => {
    try {
        let result = await Contract.methods.getDrugKeyList().call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const BatchDrugDetailsServices = async (drug) => {
    try {
        let result = await Contract.methods.BatchDrugDetails(drug).call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const BatchUserDetailsServices = async (userAddress) => {
    try {
        let result = await Contract.methods.BatchUserDetails(userAddress).call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const ReceivingServices = async (data) => {
    try {
        const accounts = await web3.eth.getAccounts();
        let result = await Contract.methods.Receving(data.serialNumber, data.importingTemp).send({ from: accounts[0] });
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const ShippingServices = async (data) => {
    try {
        const accounts = await web3.eth.getAccounts();
        let result = await Contract.methods.Shipping(data.serialNumber, data.destinationUName, data.exportingTemp).send({ from: accounts[0] });
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const getTreeDetailsServices = async (data) => {
    try {
        let result = await Contract.methods.getTreeDetails(data).call();
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

