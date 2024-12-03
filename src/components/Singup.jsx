import { React, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const singup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-slate-200 w-full max-w-lg m-10 p-8 rounded-xl">
        <div className=" text-center">Logo</div>
        <div className="mt-3 text-center font-bold text-xl">
          Sing up to Create Account
        </div>
        <div className="mt-3 text-center">
          Already have an account? <Link to="/login">SignIN</Link>
        </div>
        {error && <p className="text-red-600 py-2">{error}</p>}
        <form onSubmit={handleSubmit(singup)}>
          <Input
            label="Full Name :"
            type="text"
            placeholder="Enter FullName"
            {...register("name", { requred: true })}
          />

          <Input
            label="Email :"
            type="emial"
            placeholder="Enter Email Id"
            {...register("email", { requred: true })}
          />

          <Input
            label="Password :"
            type="password"
            placeholder="Enter your password"
            {...register("password", { requred: true })}
          />

          <Button type="submit" buttonText="Create Account" />
        </form>
      </div>
    </div>
  );
}

export default Signup;
