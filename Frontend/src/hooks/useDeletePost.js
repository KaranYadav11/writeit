import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostRequest } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(deletePostRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success(data?.message || "Post Deleted");

      setTimeout(() => {
        navigate(`/`);
      }, 500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error?.message);
      console.error("Deletion failed:", error.response?.data || error.message);
    },
  });
};
