import {
  ProductFormData,
  FormattedProductData,
  ImageDetails,
} from "../types/product";

/**
 * Formats tags string into an array
 * @param tagsString - Comma-separated tags string
 * @returns Array of trimmed, non-empty tags
 */
export const formatTags = (tagsString: string): string[] => {
  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

/**
 * Formats a File object into ImageDetails
 * @param file - File object
 * @returns Formatted image details
 */
export const formatImageDetails = (file: File): ImageDetails => ({
  name: file.name,
  size: file.size,
  type: file.type,
  lastModified: file.lastModified,
});

/**
 * Formats form data for submission
 * @param formData - Raw form data
 * @returns Formatted data ready for submission
 */
export const formatProductData = (
  formData: ProductFormData
): FormattedProductData => ({
  title: formData.title,
  category: formData.category,
  tags: formatTags(formData.tags),
  images: formData.images.map(formatImageDetails),
});
