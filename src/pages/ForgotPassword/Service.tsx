import {tisiniAxios} from "@/lib/api";

type ResetPasswordType = {
    phone_number: string;
}

type SubmitPasswordType = {
    password: string;
    confirm_password: string;
    otp: string;
}
 class ResetPasswordService {
     async resetPassword(data:ResetPasswordType) {
        try {
            const { data: responseData } = await tisiniAxios.post("/auth/password_reset/", {
                phone_number: data.phone_number,
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return responseData;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error:any) {
            console.log(error);
            throw error;
        }
    }
     async submitPassword(data:SubmitPasswordType) {
        try {
            const { data: responseData } = await tisiniAxios.patch("/auth/password_reset_complete/", {
                password: data.password,
                new_password: data.confirm_password,
                otp: data.otp,
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return responseData;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new ResetPasswordService();