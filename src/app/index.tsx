import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { useMemo, useState } from 'react';
import { router } from 'expo-router';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

import FilterPanel, {
  CatalogFilters,
} from '../components/FilterPanel';

import { products } from '../data/products';


type SortType =
  | 'newest'
  | 'priceAsc'
  | 'priceDesc';


export default function Index() {

  // Получаю ширину экрана, чтобы понять, телефон это или планшет.
  const { width } = useWindowDimensions();

  const isTablet = width >= 600;


  // Нахожу самую маленькую и самую большую цену из товаров.
  const minPrice = Math.min(
    ...products.map(product => product.price)
  );

  const maxPrice = Math.max(
    ...products.map(product => product.price)
  );


  // Здесь храню все выбранные фильтры.
  const [filters, setFilters] =
    useState<CatalogFilters>({
      priceRange: [
        minPrice,
        maxPrice,
      ],

      series: [],
      storage: [],
      simCards: [],
      ram: [],
      colors: [],
    });


  // Храню, открыты ли фильтры на телефоне.
  const [
    showMobileFilters,
    setShowMobileFilters,
  ] = useState(false);


  // Здесь храню выбранную сортировку.
  const [
    sortType,
    setSortType,
  ] = useState<SortType>('newest');


  // Отдельно храню, открыт ли список сортировки.
  const [
    sortOpen,
    setSortOpen,
  ] = useState(false);


  // Здесь сначала фильтрую товары, а потом сортирую результат.
  const filteredProducts = useMemo(() => {

    const result = products.filter(product => {

      const priceOk =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];


      const seriesOk =
        filters.series.length === 0 ||
        filters.series.includes(product.series);


      const storageOk =
        filters.storage.length === 0 ||
        filters.storage.includes(product.storage);


      const simOk =
        filters.simCards.length === 0 ||
        filters.simCards.includes(product.simCards);


      const ramOk =
        filters.ram.length === 0 ||
        filters.ram.includes(product.ram);


      const colorOk =
        filters.colors.length === 0 ||
        filters.colors.includes(product.color);


      return (
        priceOk &&
        seriesOk &&
        storageOk &&
        simOk &&
        ramOk &&
        colorOk
      );
    });


    return [...result].sort((a, b) => {

      if (sortType === 'priceAsc') {
        return a.price - b.price;
      }

      if (sortType === 'priceDesc') {
        return b.price - a.price;
      }

      return b.newness - a.newness;
    });

  }, [
    filters,
    sortType,
  ]);


  // Этой функцией я сбрасываю вообще все выбранные фильтры.
  function clearFilters() {

    setFilters({
      priceRange: [
        minPrice,
        maxPrice,
      ],

      series: [],
      storage: [],
      simCards: [],
      ram: [],
      colors: [],
    });
  }


  type MultiFilterKey =
    | 'series'
    | 'storage'
    | 'simCards'
    | 'ram'
    | 'colors';


  // Удаляю только один конкретный фильтр, когда нажимаю на крестик возле него.
  function removeSelectedFilter(
    key: MultiFilterKey,
    value: string
  ) {

    setFilters(prev => ({
      ...prev,

      [key]: prev[key].filter(
        item => item !== value
      ),
    }));
  }


  // Собираю выбранные фильтры в один массив, чтобы вывести их сверху.
  const selectedFilters = [

    ...filters.series.map(value => ({
      key: 'series' as const,
      value,
      label: `Серия: ${value}`,
    })),

    ...filters.storage.map(value => ({
      key: 'storage' as const,
      value,
      label: `Память: ${value}`,
    })),

    ...filters.simCards.map(value => ({
      key: 'simCards' as const,
      value,
      label: `SIM: ${value}`,
    })),

    ...filters.ram.map(value => ({
      key: 'ram' as const,
      value,
      label: `ОЗУ: ${value}`,
    })),

    ...filters.colors.map(value => ({
      key: 'colors' as const,
      value,
      label: `Цвет: ${value}`,
    })),
  ];


  return (
    <View style={styles.screen}>

      <View
        style={[
          styles.page,
          isTablet && styles.pageTablet,
        ]}
      >

        <Header />


        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          <Text style={styles.breadcrumbs}>
            Главная  {'>'}  Apple  {'>'}  iPhone  {'>'}  iPhone 17
          </Text>


          <Text style={styles.heading}>
            Apple iPhone 17 Pro
          </Text>


          <View style={styles.selectedButton}>

            <Text style={styles.selectedButtonText}>
              Выбранные параметры:
            </Text>

          </View>


          {selectedFilters.length > 0 ? (

            <View style={styles.selectedList}>

              {selectedFilters.map(item => (

                <View
                  key={`${item.key}-${item.value}`}
                  style={styles.selectedParameter}
                >

                  <Pressable
                    style={styles.removeCircle}
                    onPress={() =>
                      removeSelectedFilter(
                        item.key,
                        item.value
                      )
                    }
                  >

                    <Text style={styles.removeText}>
                      ×
                    </Text>

                  </Pressable>


                  <Text style={styles.parameterText}>
                    {item.label}
                  </Text>

                </View>

              ))}

            </View>

          ) : (

            <Text style={styles.noFilters}>
              Фильтры не выбраны
            </Text>

          )}


          <Pressable onPress={clearFilters}>

            <Text style={styles.clearText}>
              Очистить все
            </Text>

          </Pressable>


          <View
            style={[
              styles.catalogLayout,
              isTablet && styles.catalogLayoutTablet,
            ]}
          >

            {isTablet && (

              <View style={styles.sidebar}>

                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />

              </View>

            )}


            <View style={styles.catalogMain}>


              {!isTablet && (

                <>

                  <Pressable
                    style={styles.filterButton}
                    onPress={() =>
                      setShowMobileFilters(
                        !showMobileFilters
                      )
                    }
                  >

                    <Text style={styles.filterButtonText}>
                      Фильтры
                    </Text>


                    <View style={styles.filterArrowBox}>

                      <Text
                        style={[
                          styles.filterArrow,
                          showMobileFilters &&
                          styles.filterArrowOpen,
                        ]}
                      >
                        ⌄
                      </Text>

                    </View>

                  </Pressable>


                  {showMobileFilters && (

                    <View style={styles.mobileFilters}>

                      <FilterPanel
                        filters={filters}
                        setFilters={setFilters}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                      />

                    </View>

                  )}

                </>

              )}


              <View style={styles.sortRow}>

                <Text style={styles.sortLabel}>
                  сортировка:
                </Text>


                <View style={styles.sortWrapper}>

                  <Pressable
                    style={styles.sortSelect}
                    onPress={() =>
                      setSortOpen(
                        !sortOpen
                      )
                    }
                  >

                    <Text style={styles.sortText}>

                      {
                        sortType === 'newest'
                          ? 'Новинки'
                          : sortType === 'priceAsc'
                          ? 'Меньшая цена'
                          : 'Большая цена'
                      }

                    </Text>


                    <Text style={styles.sortArrow}>
                      ⌄
                    </Text>

                  </Pressable>


                  {sortOpen && (

                    <View style={styles.sortMenu}>

                      <SortOption
                        text="Новинки"
                        active={
                          sortType === 'newest'
                        }
                        onPress={() => {
                          setSortType('newest');
                          setSortOpen(false);
                        }}
                      />


                      <SortOption
                        text="Меньшая цена"
                        active={
                          sortType === 'priceAsc'
                        }
                        onPress={() => {
                          setSortType('priceAsc');
                          setSortOpen(false);
                        }}
                      />


                      <SortOption
                        text="Большая цена"
                        active={
                          sortType === 'priceDesc'
                        }
                        onPress={() => {
                          setSortType('priceDesc');
                          setSortOpen(false);
                        }}
                      />

                    </View>

                  )}

                </View>

              </View>


              <Text style={styles.resultCount}>
                Найдено товаров:{' '}
                {filteredProducts.length}
              </Text>


              <View style={styles.productGrid}>

                {filteredProducts.map(product => (

                  <ProductCard
                    key={product.id}
                    product={product}

                    cardWidth={
                      isTablet
                        ? '48%'
                        : '90%'
                    }

                    onPress={() => {

                      // При нажатии передаю id товара и открываю его полную страницу.
                      router.push({
                        pathname: '/product/[id]',

                        params: {
                          id: product.id,
                        },
                      });

                    }}
                  />

                ))}

              </View>


              {filteredProducts.length === 0 && (

                <Text style={styles.emptyText}>
                  По выбранным фильтрам товаров нет
                </Text>

              )}

            </View>

          </View>

        </ScrollView>

      </View>

    </View>
  );
}


type SortOptionProps = {
  text: string;
  active: boolean;
  onPress: () => void;
};


function SortOption({
  text,
  active,
  onPress,
}: SortOptionProps) {

  return (
    <Pressable
      onPress={onPress}

      style={[
        styles.sortOption,
        active && styles.sortOptionActive,
      ]}
    >

      <Text
        style={[
          styles.sortOptionText,
          active && styles.sortOptionTextActive,
        ]}
      >

        {active ? '✓ ' : ''}

        {text}

      </Text>

    </Pressable>
  );
}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },


  page: {
    width: '100%',
    maxWidth: 430,
    flex: 1,
    backgroundColor: '#ffffff',
  },


  pageTablet: {
    maxWidth: 1100,
  },


  scroll: {
    flex: 1,
  },


  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 50,
  },


  breadcrumbs: {
    color: '#555555',
    fontSize: 13,
    marginBottom: 13,
  },


  heading: {
    color: '#292929',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 28,
  },


  selectedButton: {
    alignSelf: 'flex-start',

    height: 40,

    borderWidth: 1,
    borderColor: '#8d7cff',

    borderRadius: 5,

    justifyContent: 'center',

    paddingHorizontal: 12,
  },


  selectedButtonText: {
    color: '#6957ff',
    fontSize: 15,
    fontWeight: '700',
  },


  selectedList: {
    marginTop: 8,
  },


  selectedParameter: {
    marginTop: 10,

    flexDirection: 'row',

    alignItems: 'center',

    gap: 9,
  },


  removeCircle: {
    width: 17,
    height: 17,

    borderRadius: 9,

    borderWidth: 2,
    borderColor: '#6957ff',

    alignItems: 'center',
    justifyContent: 'center',
  },


  removeText: {
    color: '#6957ff',

    fontSize: 13,
    fontWeight: '700',

    lineHeight: 13,
  },


  parameterText: {
    color: '#333333',
    fontSize: 14,
  },


  noFilters: {
    color: '#999999',
    fontSize: 13,
    marginTop: 14,
  },


  clearText: {
    color: '#6957ff',
    fontSize: 16,

    marginTop: 20,
    marginBottom: 30,
  },


  catalogLayout: {
    width: '100%',
  },


  catalogLayoutTablet: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    gap: 20,
  },


  sidebar: {
    width: 280,

    flexShrink: 0,
  },


  catalogMain: {
    flex: 1,

    minWidth: 0,
  },


  filterButton: {
    alignSelf: 'flex-start',

    height: 42,

    flexDirection: 'row',

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#9d8fff',

    borderRadius: 5,

    paddingHorizontal: 18,

    gap: 5,
  },


  filterButtonText: {
    color: '#6957ff',
    fontSize: 15,
    fontWeight: '700',
  },


  filterArrowBox: {
    width: 20,
    height: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },


  filterArrow: {
    color: '#6957ff',

    fontSize: 20,
    lineHeight: 20,

    textAlign: 'center',

    includeFontPadding: false,

    transform: [
      {
        translateY: -2,
      },
    ],
  },


  filterArrowOpen: {
    transform: [
      {
        translateY: 2,
      },
      {
        rotate: '180deg',
      },
    ],
  },


  mobileFilters: {
    marginTop: 14,
  },


  sortRow: {
    marginTop: 35,
    marginBottom: 20,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    gap: 10,

    zIndex: 20,
  },


  sortLabel: {
    color: '#444444',
    fontSize: 13,
  },


  sortWrapper: {
    position: 'relative',
    zIndex: 50,
  },


  sortSelect: {
    width: 165,
    height: 43,

    borderRadius: 24,

    backgroundColor: '#ffffff',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,

    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },


  sortText: {
    color: '#444444',
    fontSize: 13,
  },


  sortArrow: {
    color: '#ffbf00',

    fontSize: 15,

    transform: [
      {
        translateY: -3,
      },
    ],
  },


  sortMenu: {
    position: 'absolute',

    top: 48,
    right: 0,

    width: 190,

    backgroundColor: '#ffffff',

    borderRadius: 0,

    paddingVertical: 7,

    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 12,

    elevation: 10,

    zIndex: 100,
  },


  sortOption: {
    minHeight: 40,

    justifyContent: 'center',

    paddingHorizontal: 15,
  },


  sortOptionActive: {
    backgroundColor: '#5c9df5',
  },


  sortOptionText: {
    color: '#333333',
    fontSize: 14,
  },


  sortOptionTextActive: {
    color: '#ffffff',
  },


  resultCount: {
    color: '#777777',
    fontSize: 12,
    marginBottom: 12,
  },


  productGrid: {
    width: '100%',

    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'center',

    gap: 12,
  },


  emptyText: {
    marginTop: 50,

    color: '#777777',

    fontSize: 16,

    textAlign: 'center',
  },

});