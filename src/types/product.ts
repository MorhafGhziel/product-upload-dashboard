/**
 * Base product information
 */
export interface BaseProduct {
  /** Unique identifier */
  id?: string;
  /** Product title */
  title: string;
  /** Product category identifier */
  category: string;
  /** Array of product tags */
  tags: string[];
}

/**
 * Form data structure for product upload
 * @extends Omit<BaseProduct, 'id' | 'tags'>
 */
export interface ProductFormData extends Omit<BaseProduct, "id" | "tags"> {
  /** Comma-separated tags string */
  tags: string;
  /** Array of image files */
  images: File[];
}

/**
 * Category option in the dropdown
 */
export interface CategoryOption {
  /** Unique identifier for the category */
  value: string;
  /** Display label for the category */
  label: string;
}

/**
 * Form validation errors
 */
export type FormErrors = Partial<Record<keyof ProductFormData, string>>;

/**
 * Common form field props
 */
export interface FormFieldProps {
  /** Field label */
  label: string;
  /** Error message */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
}

/**
 * Image details for API
 */
export interface ImageDetails {
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  type: string;
  /** Last modified timestamp */
  lastModified?: number;
}

/**
 * Formatted product data for submission
 */
export interface FormattedProductData extends BaseProduct {
  /** Array of image details */
  images: ImageDetails[];
}
