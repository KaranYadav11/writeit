import { IKImage } from "imagekitio-react";

function Image({ src, alt, className, w, h }) {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      width={w}
      height={h}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      transformation={[{ height: h, width: w }]}
      alt={alt}
    />
  );
}

export default Image;
