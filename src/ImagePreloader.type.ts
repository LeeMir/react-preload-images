export interface IImagePreloader {
  imagePaths?: string[];
  imageUrls?: string[];
  fallback?: React.ReactElement;
  indicator?: React.ReactElement;
}
