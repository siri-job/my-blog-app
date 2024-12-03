import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import Input from "../components/Input";
import RTE from "../components/RTE";
import Button from "../components/Button";
import Select from "../components/Select";

function PostForm({ post }) {
  const { register, control, handleSubmit, watch, getValues, setValue, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (post)
      reset({
        title: post.title,
        slug: post.slug,
        featuredImage: post.featuredImage,
        content: post.content,
        status: post.status,
      });
  }, [post, reset]);

  const postFormSubmit = async (data) => {
    if (post) {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file && post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {  // Correct documentId here
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      const fileId = file.$id;

      if (fileId) {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id, // Ensuring we pass the correct user ID
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(postFormSubmit)}>
      <div className="flex flex-col p-4 md:flex-row">
        <div className="p-8 md:w-2/3">
          <Input
            label="Title"
            placeholder="Title..."
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Slug..."
            {...register("slug", { required: true })}
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full p-8 md:w-1/3">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4 bg-white"
            accept="image/png, image/jpg, image/jpeg"
            {...register("image", { required: !post })}
          />
          <Select label="Status" {...register("status", { required: true })} />
          <Button type="submit" buttonText={post ? "Update" : "Create"} />
        </div>
      </div>
    </form>
  );
}

export default PostForm;
