import { useMutation } from "@tanstack/react-query";
import { updatePostRequest } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";

export const useUpdatePost = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  return useMutation(updatePostRequest, {
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post?.slug] });
      navigate(`/${post?.slug}`);
      toast.success("Post Updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error?.message);
      console.error("Post failed:", error.response?.data || error.message);
    },
  });
};
