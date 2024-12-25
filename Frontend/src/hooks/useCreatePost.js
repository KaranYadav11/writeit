import { useMutation } from "@tanstack/react-query";
import { createPostRequest } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = new QueryClient();

  const navigate = useNavigate();
  return useMutation(createPostRequest, {
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/${post?.slug}`);

      toast.success("Post Created");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error?.message);
      console.error("Post failed:", error.response?.data || error.message);
    },
  });
};
