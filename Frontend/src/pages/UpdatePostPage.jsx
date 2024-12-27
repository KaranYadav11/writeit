import { useParams } from "react-router-dom";
import { fetchPostRequest } from "../utils";
import Write from "./Write";
import { useQuery } from "@tanstack/react-query";

function UpdatePostPage() {
  const { slug } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostRequest(slug),
  });
  if (isLoading)
    return (
      <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
        Loading Post...
      </p>
    );
  if (error)
    return (
      <p className="lg:my-8 my-4 lg:py-1 py-[2px] text-lg lg:text-xl font-montserrat text-center text-zinc-600">
        Something Went Wrong : {error?.response?.data?.error || error?.message}
      </p>
    );
  return (
    <div>
      <Write post={data} />
    </div>
  );
}

export default UpdatePostPage;
