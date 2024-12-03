import React, { useEffect, useState } from 'react';
import appwriteServices from '../appwrite/config';
import { useSelector } from 'react-redux';
import Postcard from '../components/Postcard';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await appwriteServices.getPosts();
      if (response) {
        const myPosts = response.documents.filter(post => post.userId === userData.$id);
        setPosts(myPosts);
      }
    };

    fetchMyPosts();
  }, [userData]);

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Posts</h1>
        <div className="flex flex-wrap -mx-4 justify-center">
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

export default MyPosts;
