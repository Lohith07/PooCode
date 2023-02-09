import { UserNamesServices, userRoleServices,getTreeDetailsServices, getRoleListServices,getDrugKeyListServices,BatchDrugDetailsServices,BatchUserDetailsServices,ReceivingServices,ShippingServices } from "../../Services/Utilities/utilities";
import { ERROR_MESSAGE } from '../../Utility/Constant';

export const UserNamesController = async () => {
    try {
        const result = await UserNamesServices();
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.USER_NAMES_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const userRoleController = async (userAddress) => {
    try {
        const result = await userRoleServices(userAddress);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.USER_ROLE_FAILED };;
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const getRoleListController = async () => {
    try {
        const result = await getRoleListServices();
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.GET_ROLELIST_FAILED };;
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const getDrugKeyListController = async () => {
    try {
        const result = await getDrugKeyListServices();
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.GET_DRUGKEYLIST_FAILED };;
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const BatchDrugDetailsController = async (drug) => {
    try {
        const result = await BatchDrugDetailsServices(drug);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.BATCH_DRUGDETAILS_FAILED };;
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const BatchUserDetailsController = async (userAddress) => {
    try {
        const result = await BatchUserDetailsServices(userAddress);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.BATCH_USER_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const ReceivingController = async (data) => {
    try {
        const result = await ReceivingServices(data);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.BATCH_USER_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const ShippingController = async (data) => {
    try {
        const result = await ShippingServices(data);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.BATCH_USER_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}

export const getTreeDetailsController = async (data) => {
    try {
        const result = await getTreeDetailsServices(data);
        if (result.isSuccess == true) {
            return result;
        } else {
            return { isSuccess: false, result: ERROR_MESSAGE.BATCH_USER_FAILED };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}