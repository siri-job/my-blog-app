import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import PostForm from "../components/PostForm";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  return (
    <div className='container mx-auto py-6'>
      <h1 className='text-2xl font-bold mb-4'>Edit Post</h1>
      {post ? <PostForm post={post} /> : <p>Loading...</p>}
    </div>
  );
}

export default EditPost;


// import React from 'react'

// function EditPost() {
//   return (
//     <div>
//       ddd
//     </div>
//   )
// }

// export default EditPost
