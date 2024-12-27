import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function PostListItem({ post }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.09,
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col xl:flex-row gap-8 mb-8 rounded-xl p-6 shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {post?.img && (
        <motion.div
          className="relative md:hidden my-auto xl:block xl:w-1/3 overflow-hidden rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <Link to={`/${post?.slug}`}>
            <Image
              src={post?.img}
              className="rounded-2xl object-cover w-full h-full"
              w="735"
            />
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col gap-4 xl:gap-2 my-auto xl:w-2/3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <Link
            className="text-2xl  xl:text-2xl font-semibold text-white"
            to={`/${post?.slug}`}
          >
            {post?.title}
          </Link>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 text-xs text-gray-400 xl:text-xs"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 15 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: "easeOut",
          }}
        >
          <span className="text-white/70 truncate lg:-tracking-normal tracking-tighter">
            Written By
          </span>
          <Link className="text-white/80 truncate lg:-tracking-normal font-semibold tracking-tighter">
            {post?.user?.fullName}
          </Link>
          <span className="text-white/70 lg:-tracking-normal tracking-tighter">
            on
          </span>
          <Link className="text-white/80 lg:-tracking-normal tracking-tighter font-semibold">
            {post?.category}
          </Link>
          <span className="text-white/70 lg:-tracking-normal truncate tracking-tighter">
            {format(post?.createdAt)}
          </span>
        </motion.div>

        <motion.p
          className="xl:text-sm text-sm text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          {post?.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default PostListItem;
