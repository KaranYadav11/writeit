import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import { useQuery } from "@tanstack/react-query";
import { fetchPostRequest } from "../utils.js";
import { format } from "timeago.js";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import { motion } from "motion/react";
import Button from "../components/Button.jsx";

const SinglePostPage = () => {
  const { slug } = useParams();
  const [formattedContent, setFormattedContent] = useState("");
  const { isLoading, isFetching, isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostRequest(slug),
  });
  const preprocessContent = (content) => {
    content = content?.replace(
      /<code>([\s\S]*?)<\/code>/g,
      '<pre><code class="language-javascript">$1</code></pre>'
    );
    content = content?.replace(
      /<pre class="ql-syntax"(.*?)>/g,
      '<pre class="language-javascript"$1>'
    );
    setFormattedContent(content);
    return;
  };

  useEffect(() => {
    if (data?.content) {
      preprocessContent(data?.content);
    }
  }, [data]);

  useEffect(() => {
    if (formattedContent !== "") {
      Prism.highlightAll();
    }
  }, [formattedContent]);

  if (isFetching || isLoading || isPending)
    return (
      <motion.div
        className="text-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
          Loading Post...
        </p>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        className="text-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
          Something Went Wrong :{" "}
          {error?.response?.data?.error || error?.message}
        </p>
      </motion.div>
    );

  if (!data)
    return (
      <motion.div
        className="text-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
          Post Not Found
        </p>
      </motion.div>
    );

  return (
    <div className="flex flex-col gap-8">
      {/* Detail Section with animation */}
      <motion.div
        className="flex gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="lg:w-3/5 flex flex-col gap-8">
          <motion.h1
            className="text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {data?.title}
          </motion.h1>
          <motion.div
            className="flex items-center gap-2 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white/70 lg:-tracking-normal tracking-tighter">
              Written By
            </span>
            <Link className="text-white/80 lg:-tracking-normal font-semibold tracking-tighter font-">
              {data?.user?.fullName}
            </Link>
            <span className="text-white/70 lg:-tracking-normal tracking-tighter">
              on
            </span>
            <Link className="text-white/80 lg:-tracking-normal tracking-tighter font-semibold">
              {data?.category}
            </Link>
            <span className="text-white/70 lg:-tracking-normal tracking-tighter">
              {format(data?.createdAt)}
            </span>
          </motion.div>
          <motion.p
            className="text-white/70  lg:text-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {data?.desc}
          </motion.p>
        </div>

        <div className="hidden lg:block w-2/5">
          <Image src={data?.img} w="600" className="rounded-2xl" />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-12 justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="flex flex-col gap-4 text-justify">
          <motion.div
            className="prose-base prose-ol:list-decimal prose-ul:list-inside prose-ul:list-disc  prose-h3:text-xl prose-h1:text-3xl prose-h2:text-2xl max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:underline prose-ul:ml-4 prose-ol:ml-4 prose-blockquote:italic"
            dangerouslySetInnerHTML={{
              __html: formattedContent,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          ></motion.div>
        </div>
      </motion.div>

      <Button data={data} />
    </div>
  );
};

export default SinglePostPage;
