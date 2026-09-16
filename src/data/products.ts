export type Product = {
  id: string;

  name: string;
  price: number;
  image: string;

  series: string;
  storage: string;
  simCards: string;
  ram: string;
  color: string;

  article: string;
  code: string;

  inStock: boolean;

  description: string;

  newness: number;
};


export const products: Product[] = [
  {
    id: 'iphone-17-pro-512-silver',

    name: 'Apple iPhone 17 Pro 512GB eSIM (Silver)',

    price: 66399,

    image:
      'https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/5/9/594358279_3_2.jpg',

    series: 'iPhone 17 Pro',
    storage: '512GB',
    simCards: '1 SIM',
    ram: '12GB',
    color: 'Silver',

    article: 'MG7N4/MG894',

    code: '000086536',

    inStock: true,

    description:
      'Смартфон. Экран: 6,3"; OLED; 2622x1206; 120 Гц. Память: 512 ГБ. ОЗУ: 12 ГБ. Процессор: Apple A19 Pro. ОС: iOS 26. Аккумулятор: 4252 мА·ч. Камера: 48 Мп.',

    newness: 6,
  },


  {
    id: 'iphone-17-pro-1tb-silver',

    name: 'Apple iPhone 17 Pro 1TB eSIM (Silver)',

    price: 81899,

    image:
      'https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/5/9/594358279_3_2.jpg',

    series: 'iPhone 17 Pro',
    storage: '1TB',
    simCards: '1 SIM',
    ram: '12GB',
    color: 'Silver',

    article: 'MG7N4/MG895',

    code: '000086475',

    inStock: true,

    description:
      'Смартфон. Экран: 6,3"; OLED; 2622x1206; 120 Гц. Память: 1 ТБ. ОЗУ: 12 ГБ. Процессор: Apple A19 Pro. ОС: iOS 26. Камера: 48 Мп.',

    newness: 5,
  },


  {
    id: 'iphone-17-pro-512-blue',

    name: 'Apple iPhone 17 Pro 512GB eSIM (Deep Blue)',

    price: 67499,

    image:
      'https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/5/9/594372256_2.jpg',

    series: 'iPhone 17 Pro',
    storage: '512GB',
    simCards: '2 SIM',
    ram: '12GB',
    color: 'Deep Blue',

    article: 'MG7N4/MG896',

    code: '000086501',

    inStock: true,

    description:
      'Смартфон. Экран: 6,3"; OLED; 2622x1206; 120 Гц. Память: 512 ГБ. ОЗУ: 12 ГБ. Процессор: Apple A19 Pro. ОС: iOS 26. Камера: 48 Мп.',

    newness: 4,
  },


  {
    id: 'iphone-17-pro-1tb-blue',

    name: 'Apple iPhone 17 Pro 1TB eSIM (Deep Blue)',

    price: 83999,

    image:
      'https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/5/9/594372256_2.jpg',

    series: 'iPhone 17 Pro',
    storage: '1TB',
    simCards: '2 SIM',
    ram: '12GB',
    color: 'Deep Blue',

    article: 'MG7N4/MG897',

    code: '000086502',

    inStock: true,

    description:
      'Смартфон. Экран: 6,3"; OLED; 2622x1206; 120 Гц. Память: 1 ТБ. ОЗУ: 12 ГБ. Процессор: Apple A19 Pro. ОС: iOS 26. Камера: 48 Мп.',

    newness: 3,
  },


  {
    id: 'iphone-17-pro-max-256-orange',

    name: 'Apple iPhone 17 Pro Max 256GB (Cosmic Orange)',

    price: 71249,

    image:
      'https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/5/9/594364394_2.jpg',

    series: 'iPhone 17 Pro Max',
    storage: '256GB',
    simCards: '1 SIM',
    ram: '8GB',
    color: 'Cosmic Orange',

    article: 'MG7N4/MG898',

    code: '000086503',

    inStock: true,

    description:
      'Смартфон Apple iPhone 17 Pro Max. Память: 256 ГБ. ОЗУ: 8 ГБ. OLED-дисплей. Процессор Apple A19 Pro.',

    newness: 2,
  },


  {
    id: 'iphone-17-pro-max-256-silver',

    name: 'Apple iPhone 17 Pro Max 256GB eSIM (Silver)',

    price: 56899,

    image:
      'https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/5/9/594358279_3_2.jpg',

    series: 'iPhone 17 Pro Max',
    storage: '256GB',
    simCards: '2 SIM',
    ram: '8GB',
    color: 'Silver',

    article: 'MG7N4/MG899',

    code: '000086504',

    inStock: true,

    description:
      'Смартфон Apple iPhone 17 Pro Max. Память: 256 ГБ. ОЗУ: 8 ГБ. OLED-дисплей. Процессор Apple A19 Pro.',

    newness: 1,
  },
];