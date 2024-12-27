import { useQuery } from "@tanstack/react-query";
import { savedPostsRequest } from "../utils";
import { useSelector } from "react-redux";

export const useSavedPosts = () => {
  const { user } = useSelector((state) => state.auth);

  return useQuery(["savedPosts"], savedPostsRequest, {
    enabled: !!user,
  });
};
