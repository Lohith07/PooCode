import { ERROR_MESSAGE } from '../Utility/Constant';
import { addDrugDetailsServices } from '../Services/Manufacturer';

export const addDrugDetailsController = async (data) => {
    try {
        const result = await addDrugDetailsServices(data);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.USER_NAMES_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}