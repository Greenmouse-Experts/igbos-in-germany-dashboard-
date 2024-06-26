import React from "react";
import { usePaystackPayment } from "react-paystack";
import useGetHook from "../hook/useGet";
import usePostHook from "../hook/usePost";
import { toast } from "react-toastify";

const SubscribeModal = () => {
  const { data } = useGetHook("member/subscription");
  const fname = localStorage.getItem("fName");
  const email = localStorage.getItem("igbo_email");
  const { handlePost } = usePostHook();
  // const config = {
  //   reference: new Date().getTime().toString(),
  //   email: email,
  //   amount: data?.data.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  //   publicKey: `pk_test_77297b93cbc01f078d572fed5e2d58f4f7b518d7`,
  // };
  const isSuccess = () => {
    localStorage.setItem("igbo_sub", "1")
    toast.success("Subscription paid successfully");
    window.location.reload();
  };
  // you can call this function anything
  const onSuccess = (reference) => {
    console.log(reference);
    const fd = new FormData();
    fd.append("subscription_id", data?.data.id);
    fd.append("ref_id", reference.reference);
    handlePost(`member/subscription/payment`, fd, `multipart/form-data`, isSuccess);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const PaystackHookButton = () => {
    // const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg"
          onClick={() => {
            // initializePayment(onSuccess, onClose);
          }}
        >
          Subscribe Now
        </button>
      </div>
    );
  };

  return (
    <div className="fixed flex justify-center items-center h-screen w-full top-0 left-0 bg-[#00000066]">
      <div className="w-11/12 lg:w-5/12 bg-white">
        <div className="p-5">
          <p className="font-bold text-2xl text-center">Welcome to Igbos in Germany</p>
          <p className="mt-8 text-center px-3">
            Hello {fname}, we are glad to have you on Igbos in Germany, Please subscribe
            to gain access to all services available on Igbos in Germany.
          </p>
          <div className="mt-6 flex justify-center">
            <PaystackHookButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
