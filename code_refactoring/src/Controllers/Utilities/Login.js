import { LoginServices } from "../../Services/Utilities/Login";
import { ERROR_MESSAGE } from "../../Utility/Constant";

export const AuthenticateController = async (pass) => {
    try {
        const result = await LoginServices(pass);
        if (result.isSuccess == true) {
            return result;
        } else {
            alert("Crendentials are incorrect");
            return { isSuccess: false, result: false };
        }
    } catch (err) {
        return { isSuccess: false, result: err };
    }
}