import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";
import { registerRequest } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation(registerRequest, {
    onSuccess: (user) => {
      dispatch(setAuthUser(user));
      navigate("/");
      toast.success("User Registerd");
    },
    onError: (error) => {
      console.error("Register failed:", error.response?.data || error.message);
    },
  });
};
