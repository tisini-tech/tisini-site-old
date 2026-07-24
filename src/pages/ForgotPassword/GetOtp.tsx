import React from "react";
import Loader from "@/components/Loader/Loader.tsx";
import { Toaster, toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import ResetPasswordService from "./Service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

type Props = {
  setCurrentTab: React.Dispatch<React.SetStateAction<"OTP" | "PASSWORD">>;
};
interface GetOTPInterface {
  phone_number: string;
}
export const GetOtp = ({ setCurrentTab }: Props) => {
  const { isLoading, mutate: getOtp } = useMutation({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    mutationFn: ResetPasswordService.resetPassword,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_data) => {
    //   console.log("data", data);
      toast.success("OTP sent successfully");
      setCurrentTab("PASSWORD");
    },
    onError: (error: AxiosError) => {
      console.log("error", error);
      toast.error("OTP not sent");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetOTPInterface>();

  return (
    <div className="w-full">
      {isLoading && <Loader isLoading />}
      <Toaster />
      <div className="flex p-4 md:p-8 flex-col items-center justify-center max-w-7xl min-h-screen mx-auto">
        <div className="py-4">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17l-2 2m0 0l-2-2m2 2v-6"
              />
            </svg>
            <span className="text-xl font-bold">Tisini Quiz</span>
          </NavLink>

          {/* <p className="text-center text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/auth/login"
              className="text-blue-500 hover:text-blue-600"
            >
              Login
            </NavLink>
          </p> */}
        </div>
        <form
          action=""
          className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md w-full md:max-w-[40rem]  "
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => {
            console.log("Submitted data", data);
            getOtp(data);
          })}
        >
         
          <div className="flex items-center justify-center">
            {/* Image placeholder */}
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
          </div>
          {/* <p>
            Please enter your phone number to get OTP that will be used to reset
            your password,
          </p> */}
          <div className="flex flex-col">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              placeholder="Phone Number"
              aria-invalid={errors.phone_number ? "true" : "false"}
              autoComplete="tel-national"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary
                  "
              {...register("phone_number", { required: true })}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-primary text-white font-bold py-2 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
            >
              Get password reset OTP
            </button>
          </div>
          <hr />
        </form>
      </div>
    </div>
  );
};
