import { ProductDetailsProps } from "./ProductDetails";

// Default product details - basic clothing item
export const mockedProductDetailsDefault: ProductDetailsProps = {
  details: [
    { label: "Material", value: "100% Cotton" },
    { label: "Color", value: "Navy Blue" },
    { label: "Size", value: "Medium" },
    { label: "Brand", value: "ZARA" },
  ],
};

// Detailed product information - extensive details
export const mockedProductDetailsDetailed: ProductDetailsProps = {
  details: [
    { label: "SKU", value: "ZRA-TSH-001" },
    { label: "Material", value: "95% Cotton, 5% Elastane" },
    { label: "Color", value: "Charcoal Gray" },
    { label: "Size", value: "Large" },
    { label: "Fit", value: "Regular Fit" },
    { label: "Care Instructions", value: "Machine wash cold" },
    { label: "Country of Origin", value: "Portugal" },
    { label: "Weight", value: "180g" },
  ],
};

// Minimal product details - few details
export const mockedProductDetailsMinimal: ProductDetailsProps = {
  details: [
    { label: "Material", value: "Cotton Blend" },
    { label: "Size", value: "Small" },
  ],
};

// Numerical values - showing different data types
export const mockedProductDetailsWithNumbers: ProductDetailsProps = {
  details: [
    { label: "Price", value: "$29.99" },
    { label: "Discount", value: "20%" },
    { label: "Stock", value: 15 },
    { label: "Rating", value: "4.5/5" },
    { label: "Reviews", value: 127 },
  ],
};

// Long values - testing text wrapping
export const mockedProductDetailsLongValues: ProductDetailsProps = {
  details: [
    { label: "Material", value: "Premium organic cotton with sustainable bamboo fiber blend" },
    { label: "Description", value: "Comfortable everyday wear with moisture-wicking technology" },
    { label: "Care", value: "Machine wash cold, tumble dry low, do not bleach or iron directly" },
  ],
};
