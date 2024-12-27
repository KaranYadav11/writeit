import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Write from "./pages/Write";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SinglePostPage from "./pages/SinglePostPage";
import PostListPage from "./pages/PostListPage";
import MainLayout from "./layouts/MainLayout.jsx";
import store, { persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedWrite from "./components/ProtectedWrite.jsx";
import SavedPostPage from "./pages/SavedPostPage.jsx";
import UpdatePostPage from "./pages/UpdatePostPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/write",
        element: (
          <ProtectedWrite>
            <Write />
          </ProtectedWrite>
        ),
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/savedposts",
        element: (
          <ProtectedWrite>
            <SavedPostPage />
          </ProtectedWrite>
        ),
      },
      {
        path: "/update/:slug",
        element: (
          <ProtectedWrite>
            <UpdatePostPage />
          </ProtectedWrite>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
