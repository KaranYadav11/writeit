import { IKContext, IKUpload } from "imagekitio-react";
import { axiosInstance } from "../lib/axiosInstance";
import { useRef } from "react";

const authenticator = async () => {
  try {
    const response = await axiosInstance.get("/posts/upload-auth");
    if (response.status < 200 || response.status >= 300) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }
    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null);
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        accept={`${type}/*`}
        className="hidden"
        ref={ref}
        useUniqueFileName={true}
        onError={(err) => {
          console.log(err);
        }}
        onSuccess={(res) => {
          setData(res);
          console.log(res);
        }}
        onUploadProgress={(progress) => {
          setProgress(Math.round(progress.loaded / progress.total) * 100);
        }}
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};
export default Upload;
