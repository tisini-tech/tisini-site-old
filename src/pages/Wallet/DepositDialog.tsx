import * as yup from "yup";
import { Fragment, useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { privateAxios } from "@/lib/api";
import TisiniValidator from "@/lib/validators/tisini";

type Props = {
  isDepositOpen: boolean;
  amnt?: number;
  phn?: string;
  setIsDepositOpen: (x: boolean) => void;
};

const schema = yup
  .object({
    amount: yup
      .string()
      .required("Amount is required")
      .min(1, "Amount must be at least KES 1"),
    phone: yup
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

const DepositDialog = ({
  isDepositOpen,
  setIsDepositOpen,
  amnt,
  phn,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: phn || "",
      amount: amnt ? amnt.toString() : "0",
    },
  });

  useEffect(() => {
    // Reset the form whenever `amnt` or `phn` changes
    reset({
      phone: phn || "",
      amount: amnt ? amnt.toString() : "0", // Convert to string if it's a number
    });
  }, [amnt, phn, reset]); // Dependencies: amnt and phn

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await (
        await privateAxios.post("/users/deposit_account/", {
          deposit_amount: data.amount,
          phone_number: data.phone,
        })
      ).data;

      if (response.detail === "Deposit successful") {
        reset({ amount: "", phone: "" });
        setIsDepositOpen(false);
        toast.success("Enter your mpesa pin when prompted on your phone");
      } else {
        toast.error(response.detail);
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-member-access
        toast.error((error.response?.data).detail);
      }
    }
  });

  return (
    <Transition appear show={isDepositOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[600000]"
        onClose={() => setIsDepositOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full min-h-[20rem] max-w-xl p-4 md:p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Deposit
                </DialogTitle>

                <form>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This action will deposit money to your tisini wallet
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        id="phone_number"
                        placeholder="Phone Number"
                        aria-invalid={errors.phone ? "true" : "false"}
                        autoComplete="tel-national"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary
                  "
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="">Amount</label>
                      <input
                        type="number"
                        id="amount"
                        placeholder="Enter Amount"
                        aria-invalid={errors.amount ? "true" : "false"}
                        autoComplete="tel-national"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary
          "
                        {...register("amount", { required: true })}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDepositOpen(false)}
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => onSubmit()}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "loading..." : "Deposit"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DepositDialog;
