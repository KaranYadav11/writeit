import { axiosInstance } from "./lib/axiosInstance.js";

export const loginRequest = async (credentials) => {
  try {
    const { data } = await axiosInstance.post("auth/login", credentials);

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while logging in"
    );
  }
};

export const registerRequest = async (credentials) => {
  try {
    const { data } = await axiosInstance.post("auth/register", credentials);

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while registering"
    );
  }
};

export const createPostRequest = async (credentials) => {
  try {
    const { data } = await axiosInstance.post("posts", credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while creating the post"
    );
  }
};

export const fetchPostRequest = async (slug) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${slug}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while fetching the post"
    );
  }
};

export const deletePostRequest = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while deleting the post"
    );
  }
};
export const savedPostsRequest = async () => {
  try {
    const { data } = await axiosInstance.get(`/users/saved`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while fetching the saved posts"
    );
  }
};
export const savePostRequest = async (postId) => {
  try {
    const { data } = await axiosInstance.patch(`/users/save`, { postId });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "An error occurred while fetching the saved posts"
    );
  }
};
