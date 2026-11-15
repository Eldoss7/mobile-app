export type FilterKey = 'category' | 'price' | 'color' | 'size' | 'review';

export const filterSections: { key: FilterKey; title: string; options: string[] }[] = [
  { key: 'category', title: 'Категория', options: ['ОБУВЬ', 'КУРТКИ', 'БРЮКИ', 'АКСЕССУАРЫ'] },
  { key: 'price', title: 'Ценовой диапазон', options: ['ДО 10 €', '10–15 €', 'ОТ 15 €'] },
  {
    key: 'color',
    title: 'Цвет',
    options: [
      'ЧЁРНЫЙ', 'БЕЛЫЙ', 'СЕРЫЙ', 'ЖЁЛТЫЙ', 'СИНИЙ', 'ФИОЛЕТОВЫЙ',
      'ЗЕЛЁНЫЙ', 'КРАСНЫЙ', 'РОЗОВЫЙ', 'ОРАНЖЕВЫЙ', 'ЗОЛОТОЙ', 'СЕРЕБРЯНЫЙ',
    ],
  },
  { key: 'size', title: 'Размер', options: ['38', '39', '40', '41', '42', '43'] },
  { key: 'review', title: 'Отзывы покупателей', options: ['4★ И ВЫШЕ', '3★ И ВЫШЕ'] },
];

export type Filters = Record<FilterKey, string[]>;

export const defaultFilters = (): Filters => ({
  category: ['ОБУВЬ'],
  price: [],
  color: ['ЗЕЛЁНЫЙ'],
  size: [],
  review: [],
});

// Простое общее состояние между экранами «Результаты» и «Фильтр»
export const filterStore: { value: Filters; query: string } = {
  value: defaultFilters(),
  query: 'Кроссовки',
};

export const activeCount = (f: Filters) => Object.values(f).filter((v) => v.length > 0).length;

export const recent = ['Кроссовки', 'Куртка', 'Брюки'];

export const products = [
  { name: 'Потрясающие кроссовки', price: 12 },
  { name: 'Невероятные кроссовки', price: 15 },
  { name: 'Фантастические кроссовки', price: 15 },
  { name: 'Великолепные кроссовки', price: 12 },
  { name: 'Сногсшибательные кроссовки', price: 12 },
  { name: 'Чудесные кроссовки', price: 15 },
];
