const mockedImageUrl = 'https://static.zara.net/assets/public/de6c/dc2c/3b62489db107/46bea3bb1e82/09598325712-p/09598325712-p.jpg?ts=1752056922646&w=1031';

export const mockedProductDefault = {
  imageUrl: mockedImageUrl,
  title: 'Basic T-Shirt',
  brand: 'Zara',
  price: '$19.99',
};

export const mockedProductWithTag = {
  ...mockedProductDefault,
  tag: 'New',
};

export const mockedProductOnSale = {
  ...mockedProductDefault,
  tag: 'Sale',
  price: '$14.99',
};
