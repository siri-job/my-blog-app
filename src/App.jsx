import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.jsx";
import authService from "./appwrite/auth.js";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return loading ? null : (
    <div className="bg-gray-400 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#c6c0b9] ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;




{/* <main className="flex-grow bg-cover bg-center bg-[url('https://images.pexels.com/photos/17036353/pexels-photo-17036353/free-photo-of-screens-mockup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]"></main> */}