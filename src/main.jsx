import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Protected from "./components/Protected.jsx";
import Home from "../src/pages/Home.jsx";
import Login from "../src/pages/Login.jsx";
import Signup from "../src/pages/Signup.jsx";
import AddPost from "../src/pages/AddPost.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import EditPost from "../src/pages/EditPost.jsx";
import Post from "../src/pages/Post.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/myposts"
        element={
          <Protected authentication>
            <MyPosts />
          </Protected>
        }
      />
      <Route
        path="/addpost"
        element={
          <Protected authentication>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path="/editpost/:slug"
        element={
          <Protected authentication>
            <EditPost />
          </Protected>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <Protected authentication>
            <Post />
          </Protected>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>
);
