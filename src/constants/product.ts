import { CategoryOption } from "../types/product";

/**
 * Available product categories
 */
export const CATEGORIES: CategoryOption[] = [
  { value: "t-shirt", label: "T-shirt" },
  { value: "dress", label: "Dress" },
  { value: "hoodie", label: "Hoodie" },
] as const;

/**
 * Form validation messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  TITLE_REQUIRED: "Product title is required",
  CATEGORY_REQUIRED: "Please select a category",
  IMAGES_REQUIRED: "Please upload at least one image",
} as const;

/**
 * Form configuration
 */
export const FORM_CONFIG = {
  MAX_IMAGES: 3,
  SUCCESS_MESSAGE_DURATION: 3000, // milliseconds
  MOCK_SUBMIT_DELAY: 1500, // milliseconds
} as const;

/**
 * Image upload configuration
 */
export const IMAGE_CONFIG = {
  ACCEPTED_TYPES: ["image/png", "image/jpeg", "image/gif"],
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
} as const;
