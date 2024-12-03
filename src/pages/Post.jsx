import React, { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteservices from "../appwrite/config.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteservices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const handleDelete = () => {
    appwriteservices.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteservices.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-slate-50 w-full">
      <div className="container mx-auto p-4">
        <div className="relative w-full flex justify-center mb-4 border rounded-xl p-2">
          <img
            src={appwriteservices.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full max-w-xl"
          />
          {isAuthor && (
            <div className="absolute top-4 right-4">
              <Link to={`/editpost/${post.$id}`}>
                <Button buttonText="Edit" className="bg-green-500 mr-3" />
              </Link>
              <Button buttonText="Delete" onClick={handleDelete} className="bg-red-500" />
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">{post.title}</h1>
          <div className="">{parse(post.content)}</div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Post;
