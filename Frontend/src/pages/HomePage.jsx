import PostList from "../components/PostList";
import { AnimatePresence } from "motion/react";

const Homepage = () => {
  return (
    <AnimatePresence>
      <div className="mt-0 lg:mt-4 scrollbar-hide bg-red-40 flex flex-col gap-4">
        <div>
          <h1 className="lg:my-8 my-4  text-lg lg:text-xl font-montserrat text-zinc-600">
            Recent Posts
          </h1>
          <PostList />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Homepage;
