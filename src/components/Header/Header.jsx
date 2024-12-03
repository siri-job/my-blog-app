import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogOutBtn from "./LogOutBtn"

function Header() {
  const authStatus = useSelector((state) => {
    return state.auth.status;
  });

  const navigate = useNavigate();

  const navItems = [
    {
      path: "/",
      name: "Home",
      status: true,
    },
    {
      path: "/login",
      name: "Login",
      status: !authStatus,
    },
    {
      path: "/signup",
      name: "Signup",
      status: !authStatus,
    },
    {
      path: "/myposts",
      name: "My Posts",
      status: authStatus,
    },
    {
      path: "/addpost",
      name: "Add Post",
      status: authStatus,
    },
  ];

  return (
    <header className="bg-[#AEA79C] py-3 ">
      <nav className="container mx-auto px-2 flex">
        <div className=" mr-2 md:mr-6 text-lg font-bold">Logo</div>
        <ul className="flex  ml-auto">
          {navItems.map((item) =>
            item.status ? (
              <li key={item.name}>
                <button
                  className=" px-6 py-2 hover:bg-orange-100 rounded-full"
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogOutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

// import React from 'react'

// function Header() {
//   return (
//     <div>
//       head
//     </div>
//   )
// }

// export default Header
