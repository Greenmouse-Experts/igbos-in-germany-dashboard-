import React from "react";
import { useState } from "react";
// import usePostHook from "../../../hook/usePost";
import { toast } from "react-toastify";
// import useGetHook from "../../../hook/useGet";
// import dayjs from "dayjs";

const AddSubscription = ({ close, refetch }) => {
  // const { data } = useGetHook(`admin/category`);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [amt, setAmt] = useState("");
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  // const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Dues added successfully");
    close();
  };
  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    // fd.append("description", name);
    // fd.append("payment_category_id", accNo);
    // fd.append("payment_category_id", accNo);
    // fd.append("amount", amt);
    // fd.append("start_date", dayjs(sDate).format("DD/MM/YYYY"));
    // fd.append("end_date", dayjs(eDate).format("DD/MM/YYYY"));
    // handlePost(`admin/dues/post`, fd, `multipart/form-data`, onSuccess);
  };
  return (
    <>
      <div className="">
        <div>
          <label className="text-lg font-medium">Subscription Bank</label>
          <div className="border border-gray-400 rounded mt-2">
            <select
              className="w-full py-3 p-2 rounded"
              onChange={(e) => setAccNo(e.target.value)}
            >
              <option value={""}></option>
              {[" "]?.data?.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Subscription Name</label>
          <input type="text"
            className="border border-gray-400 w-full mt-2 p-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Amount</label>
          <input
            type="number"
            className="border border-gray-400 w-full mt-2 p-2 rounded"
            onChange={(e) => setAmt(e.target.value)}
          />
        </div>
       
      </div>
      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-[#015907] font-semibold text-lg rounded text-white"
        >
          {loading ? `Submiting...` : `Submit`}
        </button>
      </div>
    </>
  );
};

export default AddSubscription;
