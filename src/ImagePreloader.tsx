import { memo, useState } from 'react';
import { IImagePreloader } from './ImagePreloader.type';

const ImagePreloader = ({
  imagePaths = [],
  imageUrls = [],
  fallback = <span>Loading...</span>,
  indicator = <></>,
}: IImagePreloader) => {
  const [loading, setLoading] = useState(true);

  const asyncImages = (images: string[]): Promise<HTMLImageElement[]> => {
    const promises = images.map((url) => {
      const obj = new Image();
      return new Promise<HTMLImageElement>((resolve, reject) => {
        obj.src = url;
        obj.onload = () => resolve(obj);
        obj.onerror = () => reject();
      });
    });

    return Promise.all(promises);
  };

  if (loading) {
    asyncImages([...imagePaths, ...imageUrls]).then(() => {
      setLoading(false);
    });
  }

  return loading ? fallback : indicator;
};

export default memo(ImagePreloader);
