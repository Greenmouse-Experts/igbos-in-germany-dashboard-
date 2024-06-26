import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import "../stylesheet/login.css";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import logo from "../image/logo.png";
import loginImg from "../image/login-img.svg";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };

  const [isLoading, setIsLoading] = useState(false);

  const [logData, setLogData] = useState({
    login_details: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const usenavigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (logValidate()) {
      const fd = new FormData();
      Object.entries(logData).forEach(([key, value]) => {
        fd.append(key, value);
      });
      setIsLoading(true);
      axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            localStorage.setItem("igbo_token", res.data.token);
            toast.success(res.data.message);
            localStorage.setItem(
              "fName",
              res.data.data.name_of_member_organization
            );
            localStorage.setItem("igbo_sub", res.data.data.isSubscribed);
            localStorage.setItem("igbo_email", res.data.data.email);
            usenavigate("/dashboard/");
          } else {
            toast.error("Email or Passward is Incorrect");
          }
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            toast.error(err?.response?.data?.message);
          }
          if (err?.response?.data?.errors) {
            Object.entries(err?.response?.data?.errors).forEach(
              ([key, value]) => {
                toast.error(value[0]);
              }
            );
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const logValidate = () => {
    let result = true;
    if (logData.login_details === "" || logData.login_details === null) {
      result = false;
      toast.error("Please enter Email");
    }

    if (logData.password === "" || logData.password === null) {
      result = false;
      toast.error("Please enter Password");
    }
   

    return result;
  };
  return (
    <section className="px-0 py-0 grid xl:grid-cols-2 grid-cols-1 items-center">
      <div className="">
        <form onSubmit={handleSubmit} action="submit" className="login md:w-[32rem] w-full mx-auto">
          <a href="http://ndiigbogermany.org">
            <img src={logo} alt="logo" />
          </a>
          <div className="log_head">
            <h3>Sign in</h3>
            
            <p>  Please login to continue</p>
          </div>
          <div className="input_log">
            <label htmlFor="email">Email or Username</label>
            <div>
              {" "}
              <HiOutlineMail />{" "}
              <input
                type="text"
                name="login_details"
                placeholder="Enter Email or Username"
                onChange={handleInput}
                value={logData.login_details}
              />
            </div>
          </div>
          <div className="input_log">
            <label htmlFor="password">Password</label>
            <div>
              {" "}
              <GoLock />{" "}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleInput}
                value={logData.password}
              />{" "}
              <span className="toggle-password" onClick={togglePassword}>
                <span className="eye-icon">
                {showPassword ? (
                    <IoMdEyeOff size={27} color="#015907" />
                  ) : (
                    <IoMdEye size={27} color="#015907" />
                  )}
                </span>{" "}
              </span>
            </div>
          </div>

          <p className="text-grey-800 font-normal mt-2 ">
                 Forgot Password?{" "}
               <Link to="/forgot-password"
                  className="text-[#015907] font-medium underline pb-1 cursor-pointer"
                
                >
                  Click here
                </Link>
              </p>

          <button type="submit" className="login_btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Login"}
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/">
              <span className="text-[#015907] font-medium">Create Account</span>
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden xl:block h-full">
        <img
          src={loginImg}
          alt=""
          className="object-cover object-center h-full"
        />
      </div>
    </section>
  );
};

export default Login;
