import React from "react";
import Loader from "@/components/Loader/Loader.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Toaster, toast } from "react-hot-toast";
import ResetPasswordService from "@/pages/ForgotPassword/Service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  setCurrentTab: React.Dispatch<React.SetStateAction<"OTP" | "PASSWORD">>;
};

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    // email: yup.string().email("Please provide valid email").required(),
    otp: yup
      .string()
      .required("OTP is required")
      .min(6, "OTP must be at least 6 characters")
      .max(6, "OTP must be at most 6 characters"),

    confirm_password: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  })
  .required();
const SubmitPassword = ({ setCurrentTab }: Props) => {
  // const queryClient = useQueryClient();
  const { isLoading, mutate: resetPassword } = useMutation({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    mutationFn: ResetPasswordService.submitPassword,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_data) => {
      // console.log("data", data);
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
      // setCurrentTab("OTP");
    },
    onError: (error: AxiosError) => {
      console.log("error", error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = error.response?.data as any;
      console.log("errorData", errorData);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      toast.error(errorData.error ?? "Password reset failed");
    },
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // console.log(errors);
  // const [didNotReceiveOTP, setDidNotReceiveOTP] = React.useState(false);
  // const [timer, setTimer] = React.useState(60);
  // const timerId = React.useRef<number | undefined>();

  // const startTimer = () => {
  //   timerId.current = window.setInterval(() => {
  //     setTimer((prevTimer) => prevTimer - 1);
  //   }, 1000);
  // };

  // React.useEffect(() => {
  //   if (timer === 60) {
  //     startTimer();
  //   }

  //   if (timer === 0) {
  //     if (timerId.current) {
  //       clearInterval(timerId.current);
  //     }
  //     setDidNotReceiveOTP(true);
  //   }

  //   return () => {
  //     if (timerId.current) {
  //       clearInterval(timerId.current);
  //     }
  //   };
  // }, [timer]);

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
        </div>
        <form
          action=""
          className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md w-full md:max-w-[40rem]  "
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => {
            console.log("Submitted data", data);

            resetPassword(data);
          })}
        >
          <div className="flex items-center justify-center">
            {/* Image placeholder */}
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">OTP</label>
            <input
              type="number"
              id="otp"
              placeholder="OTP"
              autoComplete=""
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary"
              {...register("otp", { required: true })}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
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
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Password"
              aria-invalid={errors.confirm_password ? "true" : "false"}
              autoComplete="current-password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary"
              {...register("confirm_password", { required: true })}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <div className="flex">
            <label htmlFor="">Did not receive OTP?</label>
            <button
              type="button"
              className="text-primary px-2 rounded-md focus:outline-none focus:ring-0 "
              onClick={() => {
                setCurrentTab("OTP");
              }}
            >
              Resend OTP
            </button>
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-primary text-white font-bold py-2 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
            >
              Reset Password
            </button>
          </div>
          <hr />
        </form>
      </div>
    </div>
  );
};
export default SubmitPassword;
