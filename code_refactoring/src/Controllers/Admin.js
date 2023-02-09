import { AddRoleServices } from '../Services/Admin';
import { setUserServices } from '../Services/Admin';
import { ERROR_MESSAGE } from '../Utility/Constant';

export const AddRoleController = async (text) => {
    try {
        const result = await AddRoleServices(text);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.ADD_ROLE_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const setUserController = async (data) => {
    try {
        const result = await setUserServices(data);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.ADD_ROLE_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}