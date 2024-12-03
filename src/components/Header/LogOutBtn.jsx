import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogOutBtn() {
  const dispatch = useDispatch();
  return (
    <div>
      <button className=" px-6 py-2 hover:bg-orange-100 rounded-full"
        onClick={() => {
          authService.logout().then(() => {
            dispatch(logout());
          });
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default LogOutBtn;
