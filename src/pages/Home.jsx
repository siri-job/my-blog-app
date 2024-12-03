import React, { useEffect, useState } from "react";
import appwriteServices from "../appwrite/config";
import Postcard from "../components/Postcard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await appwriteServices.getPosts();
      if (response) {
        setPosts(response.documents);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-wrap -mx-4 justify-evenly">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <Postcard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center text-gray-500">
              <p className="text-xl">No posts available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
