import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";
import { loginRequest } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation(loginRequest, {
    onSuccess: (user) => {
      dispatch(setAuthUser(user));
      navigate("/");
      toast.success("Login Successful");
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data || error.message);
    },
  });
};
