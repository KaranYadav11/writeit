import PostList from "../components/PostList";

const PostListPage = () => {
  return (
    <div className="scrollbar-hide">
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
