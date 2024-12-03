import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function Postcard({ $id, featuredImage, title }) {
  const filePreview = appwriteService.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="p-4 bg-gray-200">
          <img
            src={filePreview}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold text-cneter">{title}</p>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
