import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosInstance } from "../lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";

const fetchSavedPosts = async (pageParam) => {
  const res = await axiosInstance.get(`/users/saved`, {
    params: { page: pageParam, limit: 3 },
  });
  return res.data;
};

const SavedPostList = () => {
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["savedPosts"],
    queryFn: ({ pageParam = 1 }) => fetchSavedPosts(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "loading")
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin duration-300 transition-all size-12 lg:size-16 xl:size-20" />
      </div>
    );
  if (status === "error") return "Something went wrong!";
  if (error) return "Something went wrong!";

  const savedPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={savedPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="text-white flex items-center justify-center">
          <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
            Fetching More Posts...
          </p>
        </div>
      }
      endMessage={
        <p className="lg:my-8 my-4 text-center text-lg lg:text-xl font-montserrat text-zinc-600">
          All Saved Posts Loaded!
        </p>
      }
    >
      <AnimatePresence>
        {savedPosts.map((post) => (
          <PostListItem key={post?._id} post={post} />
        ))}
      </AnimatePresence>
    </InfiniteScroll>
  );
};

export default SavedPostList;