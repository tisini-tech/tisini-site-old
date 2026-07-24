/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";

import { AxiosError } from "axios";
import Loader from "@/components/Loader/Loader";
import { NavLink } from "react-router-dom";
import React from "react";
import { SignInUserInterface } from "@/lib/types";
import TisiniValidator from "@/lib/validators/tisini";
import { loginSuccess } from "@/store/slices/auth.slice";
import { Cookie } from "@/lib/services";
import { tisiniAxios } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    // email: yup.string().email("Please provide valid email").required(),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must be at most 10 characters")
      .matches(TisiniValidator.phoneRegex, {
        message: "Phone number  format is invalid (0(7|1)xxxxxxxx)",
        excludeEmptyString: true,
      }),
  })
  .required();
type Props = {
  setTabs: React.Dispatch<React.SetStateAction<"login" | "register">>;
};
export default function LoginPage({ setTabs }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserInterface>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const { isAuthenticated} = useAppSelector((state) => state.persist.auth);
  return (
    <div className="w-full">
      {isLoading && <Loader isLoading />}
      <ToastContainer />
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
            <span className="text-xl font-bold">Login to Play</span>
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
          onSubmit={handleSubmit(async (data) => {
            try {
              // dispatch(loginStart())
              const response = await (
                await tisiniAxios.post("/auth/login/", data)
              ).data;
              console.log(response);
              const { access_token, refresh_token, ...profile } = response;
              // const {  } = JSON.parse(tokens as string) as {
              //   access: string;
              //   refresh: string;
              // };
              if (!access_token || !refresh_token) {
                toast.error("Something went wrong, please try again later");
                return;
              }
              Cookie.setCookieToken("ck_63hsG-sscWPkl", {
                accessToken: access_token,
                refreshToken: refresh_token,
              });
              dispatch(
                loginSuccess({
                  access_token: access_token,
                  refresh_token: refresh_token,
                  user: profile,
                  error: "",
                  isAuthenticated: true,
                  loading: false,
                }),
              );

              // console.log(response);
            } catch (error: any) {
              if (error instanceof AxiosError) {
                // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-member-access
                toast.error((error.response?.data).detail);
              }
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <div className="flex items-center justify-center">
            {/* Image placeholder */}
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-center">
              Welcome to your account {isLoading && "Loading..."}
            </h1>
          </div>
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
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              aria-invalid={errors.password ? "true" : "false"}
              autoComplete="current-password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-primary text-white font-bold py-2 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
            >
              Login
            </button>
          </div>
          <br />
          <div className="flex flex-col">
            <NavLink
              to="/auth/forgot-password"
              className="text-primary hover:text-primary-light"
            >
              Forgot Password?
            </NavLink>
          </div>
          <hr />
          <p className="text-center">
            {"Don't have an account? "}
            <button
              className="text-primary"
              onClick={() => {
                setTabs("register");
              }}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
