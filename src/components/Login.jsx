import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSubmit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(login({ userData }));
        if (userData) {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-slate-200 w-full max-w-lg m-10 p-8 rounded-xl">
        <div className="text-center mt-2">Logo</div>
        <h1 className=" text-center mt-2 font-bold text-xl">
          Sign in to your account
        </h1>
        <p className=" text-center mt-2">
          Don't have any account ? &nbsp;
          <Link to="/signup" className=" font-semibold">
            Singup
          </Link>
        </p>
        {error && <p className="text-red-600 py-2">{error}</p>}
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Input
            label="Email Id: "
            type="email"
            placeholder="Enter Email Address"
            {...register("email", { required: true })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
          />
          <Button type="submit" buttonText="Singin" />
        </form>
      </div>
    </div>
  );
}

export default Login;
