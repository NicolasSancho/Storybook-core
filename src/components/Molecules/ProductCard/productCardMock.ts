// Self-contained t-shirt illustration (inline SVG), so stories never depend on a network.
const mockedImageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
    <rect width="300" height="400" fill="#f1f7fa"/>
    <ellipse cx="150" cy="365" rx="85" ry="9" fill="#90b5d2" opacity="0.5"/>
    <path d="M95 90 L122 78 Q150 108 178 78 L205 90 L268 128 L242 186 L210 166 L210 350 L90 350 L90 166 L58 186 L32 128 Z" fill="#00548a"/>
    <path d="M122 78 Q150 108 178 78 L184 86 Q150 124 116 86 Z" fill="#90b5d2"/>
    <path d="M90 166 L90 350 M210 166 L210 350" stroke="#003f69" stroke-width="2" opacity="0.4"/>
  </svg>`
)}`;

export const mockedProductDefault = {
  imageUrl: mockedImageUrl,
  title: "Basic T-Shirt",
  brand: "Acme",
  price: "$19.99",
};

export const mockedProductWithTag = {
  ...mockedProductDefault,
  tag: "New",
};

export const mockedProductOnSale = {
  ...mockedProductDefault,
  tag: "Sale",
  price: "$14.99",
  onClick: () => {},
};

export const mockedProductCardClickable = {
  ...mockedProductDefault,
  buttonLabel: "Add to Cart",
  onProductClick: () => {},
  onClick: () => {},
};

export const mockedProductCardNoButton = {
  ...mockedProductDefault,
  title: "Display Only Product",
};

export const mockedProductCardLink = {
  ...mockedProductDefault,
  href: "/products/basic-t-shirt",
  onClick: () => {},
};
