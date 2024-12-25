import { useQuery } from "@tanstack/react-query";
import { savedPostsRequest } from "../utils";

export const useSavedPosts = () => {
  return useQuery(["savedPosts"], savedPostsRequest);
};
