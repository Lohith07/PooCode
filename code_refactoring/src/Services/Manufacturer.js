import Contract from '../helper';
import web3 from '../web3';

export const addDrugDetailsServices = async (data) => {
    try {
    
        const accounts = await web3.eth.getAccounts();
        let result = await Contract.methods.addDrugDetails(
            data.drugId,
            data.batchId,
            data.name,
            data.location,
            data.ManufDate,
            data.ExpDate,
            data.currTemp,
            data.temperature,
            data.serialNumber,
            data.status,
            data.tokenURI
        ).send({ from: accounts[0] });
        return { isSuccess: true, result: result }
    } catch (err) {
        return { isSuccess: false, result: null, errorMsg: err };
    }
}