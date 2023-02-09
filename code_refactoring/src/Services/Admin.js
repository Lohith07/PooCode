import Contract from '../helper';
import web3 from '../web3';

export const AddRoleServices = async (text2) => {
    try {
        let accounts = await web3.eth.getAccounts();
        let result = await Contract.methods.AddRole(text2).send({ gas: "1000000", from: accounts[0] });
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}

export const setUserServices = async (data) => {
    try {
        debugger
        let accounts = await web3.eth.getAccounts();
        let result = await Contract.methods
        .setUser(
          data.name,
          data.contactNo,
          data.userName,
          data.password,
          data.email,
          data.role,
          data.value,
          data.status
        )
        .send({ gas: "1000000", from: accounts[0] });
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}