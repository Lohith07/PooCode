import Contract from '../../helper';
import web3 from '../../web3';

export const LoginServices = async (pass) => {
    try {
        let accounts = await web3.eth.getAccounts();
        let result = await Contract.methods.Authenticate(pass).call({ from: accounts[0] });
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}