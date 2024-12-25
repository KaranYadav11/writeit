import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePostRequest } from "../utils.js";
import { toast } from "react-toastify";

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation(savePostRequest, {
    onSuccess: (data) => {
      toast.success(data?.message);

      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error?.message);
      console.error("Post failed:", error.response?.data || error.message);
    },
  });
};
