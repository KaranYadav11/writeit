import { Loader2 } from "lucide-react";
import { useSavedPosts } from "../hooks/useGetSavedPosts.js";
import PostListItem from "../components/PostListItem.jsx";

function SavedPostPage() {
  const { isLoading, isError, error, data: savedPosts } = useSavedPosts();

  if (isLoading)
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin duration-300 transition-all size-12 lg:size-16 xl:size-20" />
      </div>
    );

  if (isError)
    return (
      <div>
        <h1 className="mb-2  lg:mb-4 xl:mb-8 font-montserrat lg:text-2xl text-xl">
          Saved Posts
        </h1>
        <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
          Something Went Wrong :{" "}
          {error?.response?.data?.error || error?.message}
        </p>
      </div>
    );

  return (
    <div className="mt-0 lg:mt-4 scrollbar-hide bg-red-40 flex flex-col gap-4">
      <div>
        <h1 className="mb-2  lg:mb-4 xl:mb-8 font-montserrat lg:text-2xl text-xl">
          Saved Posts
        </h1>
        {savedPosts.length === 0 && (
          <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
            Nothing Saved
          </p>
        )}
        {savedPosts.map((post) => (
          <PostListItem key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default SavedPostPage;
