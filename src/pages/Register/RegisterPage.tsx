/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as yup from "yup";

import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Loader from "@/components/Loader/Loader";
import React from "react";
import { SignupUserInterface } from "@/lib/types";
import TisiniValidator from "@/lib/validators/tisini";
import { tisiniAxios } from "@/lib/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";

const schema = yup
  .object({
    nickname: yup.string().required("Nickname is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    is_quiz_admin: yup.bool().default(false).optional(),
    is_author: yup.bool().default(false).optional(),
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
export default function RegisterPage({ setTabs }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUserInterface>({
    resolver: yupResolver(schema),
    defaultValues: { is_quiz_admin: false, is_author: false },
  });
  // const navigate = useNavigate();
  // const _redirectUrl = use


  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onSubmit = async (data: SignupUserInterface) => {
    setIsLoading(true);
    try {
      const response = (await tisiniAxios.post(`/auth/register/`, data)).data;
      response && toast.success("Account created successfully");
      setTimeout(() => {
        setTabs("login");
      }, 2000);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-member-access
        toast.error((error.response?.data).detail);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="">
      <ToastContainer />
      {<Loader isLoading={isLoading} />}
      <div className="flex flex-col items-center justify-center space-y-4 p-4 md:p-8 max-w-7xl min-h-screen mx-auto">
        <div>
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
          className="flex flex-col justify-center items-center space-y-4 w-full md:max-w-[30rem] border py-4 rounded px-4 md:px-8"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <h1 className="text-2xl font-bold text-center ">Register</h1>
          <div className="w-full flex flex-col">
            <label htmlFor="phone_number">Nick name</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nickname"
              type="text"
              {...register("nickname", { required: true })}
            />{" "}
            {errors.nickname && (
              <span className="text-red-500">{errors.nickname.message}</span>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="phone_number">Phone number</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Phone Number"
              type="tel"
              {...register("phone_number", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
            />
            {errors.phone_number && (
              <span className="text-red-500">
                {errors.phone_number.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button className="bg-primary text-white rounded py-2 px-4 w-full">
            Submit
          </button>
          <hr />
          <p className="text-center">
            {"Already have an account? "}
            <button
              className="text-primary"
              onClick={() => setTabs("login")}
            >
              Login
            </button>
          </p>
        </form>{" "}
      </div>
    </main>
  );
}
