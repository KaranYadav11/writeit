import { Bookmark, SquarePen, Trash } from "lucide-react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useDeletePost } from "../hooks/useDeletePost";
import { useSavePost } from "../hooks/useSavePost";
import { Link, useNavigate } from "react-router-dom";
import { useSavedPosts } from "../hooks/useGetSavedPosts.js";

function Button({ data }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  let isAuthor = false;
  const { data: savedPosts } = useSavedPosts();
  const {
    mutate: deletePostHandler,
    isError: useDeletePostError,
    isLoading: isDeletePending,
    error: deletePostError,
  } = useDeletePost();
  const isSaved = savedPosts?.some((p) => p?._id.toString() === data?._id);
  isAuthor = user?._id === data?.user?._id;
  const {
    mutate: savePostHandler,
    isLoading: isSavePending,
    error: savePostError,
    isError: useSavePostError,
  } = useSavePost();

  return (
    <div className="flex flex-col my-8">
      <motion.div
        className="bg-purple-80 p-2 h-fit  flex items-center justify-evenly  w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <button
          disabled={isSavePending}
          onClick={() => {
            if (!user) {
              return navigate("/login");
            }
            savePostHandler(data?._id);
          }}
          className="bg-white text-black  py-2 px-4  rounded-full"
        >
          <Bookmark fill={isSaved ? "black" : "none"} />
        </button>
        {isAuthor && (
          <button
            disabled={isDeletePending}
            onClick={() => deletePostHandler(data?._id)}
            className="bg-white text-black  py-2 px-4  rounded-full"
          >
            <Trash />
          </button>
        )}
        {isAuthor && (
          <Link
            disabled={isDeletePending}
            to={`/update/${data?.slug}`}
            className="bg-white text-black  py-2 px-4  rounded-full"
          >
            <SquarePen />
          </Link>
        )}
      </motion.div>
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p
          className={`text-white ${
            isDeletePending || isSavePending ? "flex" : "hidden"
          } font-light h-8 lg:h-12 w-full  items-center justify-center text-center`}
        >
          {isDeletePending && "Deleting Post..."}
          {useDeletePostError && deletePostError?.response?.data?.error}
          {isSavePending && "In Progress..."}
          {useSavePostError && savePostError?.response?.data?.error}
        </p>
      </motion.div>
    </div>
  );
}

export default Button;
