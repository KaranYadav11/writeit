import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost.js";
import { Loader2 } from "lucide-react";
import Upload from "../components/Upload.jsx";
import { motion } from "framer-motion";

const Write = () => {
  const [cover, setCover] = useState({});
  const [progress, setProgress] = useState(0);

  const {
    mutate: createPost,
    isError,
    isFetching,
    error: createPostError,
    reset: resetCreatePost,
    isLoading,
  } = useCreatePost();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    createPost(data);
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        resetCreatePost();
      }, 2100);
      return () => clearTimeout(timer);
    }
  }, [isError, createPostError, resetCreatePost]);

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      {/* Title Section with Fade-in animation */}
      <motion.h1
        className="text-clip font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Create a New Post
      </motion.h1>

      {/* Form Section with Slide In animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 flex-1 mb-6"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-6">
          {/* Cover Image Upload with Zoom-in animation */}
          <Upload type="image" setProgress={setProgress} setData={setCover}>
            <motion.button
              type="button"
              className="w-max p-2 shadow-md rounded-xl text-sm text-black bg-white/95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Add a cover image
            </motion.button>
          </Upload>
          <p className="text-white text-sm font-light">
            {progress === 100 ? "Uploaded ✓" : `Uploading ${progress}%`}
          </p>
        </div>

        {/* Title Input with Fade-in animation */}
        <motion.input
          className="text-4xl font-semibold bg-transparent placeholder:text-white/60 outline-none"
          type="text"
          placeholder="My Post's Title"
          name="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Category Select with Fade-in animation */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="" className="text-sm">
            Choose a category :
          </label>
          <select
            name="category"
            className="p-2 rounded-xl outline-none bg-white/20 shadow-md"
          >
            <option className="bg-black" value="general">
              General
            </option>
            <option className="bg-black" value="education">
              Education
            </option>
            <option className="bg-black" value="technology">
              Technology
            </option>
            <option className="bg-black" value="lifestyle">
              Lifestyle
            </option>
            <option className="bg-black" value="entertainment">
              Entertainment
            </option>
            <option className="bg-black" value="science">
              Science
            </option>
          </select>
        </motion.div>

        {/* Description Textarea with Fade-in animation */}
        <motion.textarea
          className="p-4 rounded-xl placeholder:text-white/60 bg-white/20 outline-none shadow-md"
          name="desc"
          placeholder="A Short Description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* ReactQuill Editor with Fade-in animation */}
        <motion.div
          className="flex flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl text-black bg-white/80 shadow-md"
            value={value}
            onChange={setValue}
          />
        </motion.div>

        {/* Submit Button with Pulse effect */}
        <motion.button
          disabled={isError || isLoading || (0 < progress && progress < 100)}
          className={`${
            isError ? "bg-red-700" : "bg-white/95"
          } text-black font-inter rounded-full md:mt-4 p-2 md:min-w-36 w-full font-medium z-20 disabled:cursor-not-allowed`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <p className="flex animate-spin items-center justify-center">
                <Loader2 />
              </p>
            </div>
          ) : isError ? (
            createPostError?.response?.data?.error || createPostError?.message
          ) : (
            "Post"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Write;
