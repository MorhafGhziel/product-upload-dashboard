import { useState, useRef, forwardRef, useImperativeHandle } from "react";

interface ImageUploaderProps {
  onImagesChange: (images: File[]) => void;
  error?: boolean;
}

const ImageUploader = forwardRef<
  { resetImages: () => void },
  ImageUploaderProps
>(({ onImagesChange, error }, ref) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    resetImages: () => {
      setUploadedImages([]);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  }));

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const updatedImages = [...uploadedImages, ...newFiles].slice(0, 3);
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDelete = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesChange(newImages);
  };

  const openPreview = (file: File) => {
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-4">
        <h1 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-gray-900">
          Product Images
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Image Previews */}
          {uploadedImages.map((file, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-md sm:rounded-lg border-2 border-gray-200 overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="absolute top-2 sm:top-2 right-2 sm:right-2 p-1.5 sm:p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer z-10"
              >
                <svg
                  className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                onClick={() => openPreview(file)}
              >
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs sm:text-sm font-medium">
                  Preview
                </span>
              </div>
            </div>
          ))}

          {/* Empty Preview Slots */}
          {Array.from({ length: Math.max(0, 3 - uploadedImages.length) }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileChange(e.dataTransfer.files);
                }}
                className={`
                    aspect-square rounded-md sm:rounded-lg border-2 border-dashed 
                    flex flex-col items-center justify-center gap-2
                    cursor-pointer transition-colors duration-200
                    ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : error
                        ? "border-red-500"
                        : "border-gray-200 hover:bg-gray-50"
                    }
                  `}
              >
                <svg
                  className="w-6 h-6 sm:w-6 sm:h-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-xs sm:text-sm text-gray-500">Upload</span>
              </div>
            )
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs gap-1">
          <span className="text-gray-500">
            {uploadedImages.length} of 3 images
          </span>
          {error && (
            <span className="text-xs sm:text-sm text-red-500">
              Please upload at least one image
            </span>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-lg overflow-hidden">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain bg-white"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
});

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
