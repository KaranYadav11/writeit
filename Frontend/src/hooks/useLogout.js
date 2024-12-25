import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../lib/axiosInstance.js";
import { toast } from "react-toastify";
import { setAuthUser } from "../redux/authSlice.js";

const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutation = useMutation(
    async () => {
      await axiosInstance.get("auth/logout");
    },
    {
      onSuccess: () => {
        queryClient.resetQueries("savedPosts");
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success("Logout successful");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed");
      },
    }
  );

  return logoutMutation;
};
export default useLogout;
