import { ProductFormData, FormErrors } from "../types/product";
import { VALIDATION_MESSAGES, IMAGE_CONFIG } from "../constants/product";

/**
 * Validates the product form data
 * @param formData - The form data to validate
 * @returns An object containing any validation errors
 */
export const validateProductForm = (formData: ProductFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.title) {
    errors.title = VALIDATION_MESSAGES.TITLE_REQUIRED;
  }

  if (!formData.category) {
    errors.category = VALIDATION_MESSAGES.CATEGORY_REQUIRED;
  }

  if (formData.images.length === 0) {
    errors.images = VALIDATION_MESSAGES.IMAGES_REQUIRED;
  }

  return errors;
};

/**
 * Validates a single image file
 * @param file - The file to validate
 * @returns An error message if invalid, undefined if valid
 */
export const validateImage = (file: File): string | undefined => {
  if (
    !IMAGE_CONFIG.ACCEPTED_TYPES.includes(
      file.type as (typeof IMAGE_CONFIG.ACCEPTED_TYPES)[number]
    )
  ) {
    return "Invalid file type. Please upload PNG, JPEG, or GIF images.";
  }

  if (file.size > IMAGE_CONFIG.MAX_SIZE) {
    return "File size exceeds 5MB limit.";
  }

  return undefined;
};
