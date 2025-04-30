import { useState, useRef } from "react";
import type { ProductFormData, FormErrors } from "../types/product";
import { CATEGORIES, FORM_CONFIG } from "../constants/product";
import { validateProductForm } from "../utils/validation";
import Button from "./ui/button";
import Select from "./ui/Select";
import TextField from "./ui/TextField";
import ImageUploader from "./ImageUploader";

const ProductUpload = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    category: "",
    tags: "",
    images: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const imageUploaderRef = useRef<{ resetImages: () => void } | null>(null);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      tags: "",
      images: [],
    });
    imageUploaderRef.current?.resetImages();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ProductFormData];
        return newErrors;
      });
    }
  };

  const handleImagesChange = (images: File[]) => {
    setFormData((prev) => ({ ...prev, images }));
    if (errors.images) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const formattedData = {
          ...formData,
          tags: formData.tags
            ? formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
            : [],
        };
        console.log("Form Data:", formattedData);

        // Simulate API call
        await new Promise((resolve) =>
          setTimeout(resolve, FORM_CONFIG.MOCK_SUBMIT_DELAY)
        );

        resetForm();
        setShowSuccess(true);
        setTimeout(
          () => setShowSuccess(false),
          FORM_CONFIG.SUCCESS_MESSAGE_DURATION
        );
      } catch (error) {
        console.error("Error processing form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
      {/* Success Toast */}
      <div
        className={`fixed top-4 right-4 left-4 sm:left-auto z-[200] transition-all duration-500 ease-in-out transform ${
          showSuccess
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Product published successfully!</span>
        </div>
      </div>

      <h1 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-900">
        Upload Product
      </h1>

      <div className="overflow-hidden rounded-lg sm:rounded-xl bg-white shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-4 sm:p-6">
            <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-gray-900">
              Product Information
            </h2>

            <TextField
              id="title"
              name="title"
              label="Product Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              error={errors.title}
              required
            />

            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="category-select"
                className="mb-1.5 sm:mb-2 block text-sm font-medium text-gray-900"
              >
                Category<span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                id="category-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={CATEGORIES}
                error={!!errors.category}
              />
              {errors.category && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            <TextField
              id="tags"
              name="tags"
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
              placeholder="summer, casual, new-arrival"
            />

            {/* Publish Button - Hidden on mobile */}
            <div className="hidden md:block">
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </div>
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <ImageUploader
              ref={imageUploaderRef}
              onImagesChange={handleImagesChange}
              error={!!errors.images}
            />
          </div>
        </div>

        {/* Publish Button - Shown only on mobile at the bottom */}
        <div className="md:hidden p-4 sm:p-6 border-t border-gray-200">
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="relative"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publishing...</span>
              </div>
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
