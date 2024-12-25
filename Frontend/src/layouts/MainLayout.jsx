import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ToastStyles.css";

function MainLayout() {
  return (
    <div className="px-4 scrollbar-hide md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      <Navbar />
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={2200}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        toastClassName={() =>
          "bg-black flex items-center justify-center py-2 px-1 border-[3px] border-white rounded-full text-white font-montserrat font-medium"
        }
        bodyClassName={() => "font-montserrat flex font-medium"}
      />
    </div>
  );
}

export default MainLayout;
