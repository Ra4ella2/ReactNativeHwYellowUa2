import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import Header from '../../components/Header';

import {
  products,
} from '../../data/products';


export default function ProductPage() {

  // Проверяю ширину экрана, чтобы полная карточка тоже была адаптивной.
  const { width } = useWindowDimensions();

  const isTablet = width >= 600;

  /*
   * Получаем ID из адреса.
   */
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();


  /*
   * Находим нужный товар.
   */
  const product =
    products.find(
      item =>
        item.id === id
    );


  /*
   * Если товара нет.
   */
  if (!product) {

    return (
      <View style={styles.notFound}>

        <Text style={styles.notFoundText}>
          Товар не найден
        </Text>

      </View>
    );
  }


  function formatPrice(price: number) {

    return String(price).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ' '
    );

  }


  return (
    <View style={styles.screen}>

      <View
        style={[
          styles.phone,
          isTablet && styles.phoneTablet,
        ]}
      >

        {/* HEADER */}

        <Header
          onBack={() =>
            router.back()
          }
        />


        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* Breadcrumbs */}

          <Text style={styles.breadcrumbs}>
            {"Главная  >  Apple  >  iPhone  >  iPhone 17"}
          </Text>


          {/* Небольшое название */}

          <Text style={styles.smallTitle}>
            {product.name}
          </Text>


          {/* Большое фото */}

          <Image
            source={{
              uri: product.image,
            }}

            style={styles.image}

            resizeMode="contain"
          />


          {/* Наличие + информация */}

          <View style={styles.infoRow}>

            <Text style={styles.stock}>
              {product.inStock
                ? 'Есть в наличии'
                : 'Нет в наличии'}
            </Text>


            <View style={styles.productCodes}>

              <Text style={styles.codeText}>
                Артикул:{' '}
                <Text style={styles.codeValue}>
                  {product.article}
                </Text>
              </Text>


              <Text style={styles.codeText}>
                Код товара:{' '}
                <Text style={styles.codeValue}>
                  {product.code}
                </Text>
              </Text>

            </View>

          </View>


          {/* Полное название */}

          <Text style={styles.name}>
            {product.name}
          </Text>


          {/* Описание */}

          <Text style={styles.description}>
            {product.description}
          </Text>


          {/* Цена */}

          <Text style={styles.price}>

            {formatPrice(
              product.price
            )}

            <Text style={styles.currency}>
              {' '}грн
            </Text>

          </Text>


          {/* Купить */}

          <View style={styles.buyRow}>

            <View style={styles.buyButton}>

              <Text style={styles.buyText}>
                Купить
              </Text>

            </View>


            {/* Пока заглушка сравнения */}

            <View style={styles.comparePlaceholder}>
              <Image
                source={require('../../../assets/images/but6.jpg')}
                style={styles.compareButtonImage}
                resizeMode="contain"
              />
            </View>

          </View>


          {/* Доставка */}

          <View style={styles.delivery}>

            <Text style={styles.deliveryTitle}>
              Доставка
            </Text>

          </View>

        </ScrollView>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,

    backgroundColor: '#ffffff',

    alignItems: 'center',
  },


  phone: {
    width: '100%',
    maxWidth: 430,

    flex: 1,

    backgroundColor: '#ffffff',
  },

  phoneTablet: {
    maxWidth: 850,
  },


  scroll: {
    flex: 1,
  },


  content: {
    paddingHorizontal: 18,

    paddingTop: 23,

    paddingBottom: 50,
  },


  breadcrumbs: {
    color: '#555555',

    fontSize: 13,
  },


  smallTitle: {
    color: '#aaaaaa',

    fontSize: 13,

    marginTop: 10,
  },


  image: {
    width: '100%',
    height: 405,

    marginTop: 24,
  },


  infoRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 5,
  },


  stock: {
    color: '#52b957',

    fontSize: 13,

    backgroundColor: '#f1faf1',

    paddingHorizontal: 9,
    paddingVertical: 3,

    borderRadius: 3,
  },


  productCodes: {
    alignItems: 'flex-end',

    gap: 5,
  },


  codeText: {
    color: '#aaaaaa',

    fontSize: 12,

    backgroundColor: '#fafafa',

    paddingHorizontal: 5,
    paddingVertical: 2,
  },


  codeValue: {
    color: '#111111',

    fontWeight: '600',
  },


  name: {
    color: '#222222',

    fontSize: 18,

    fontWeight: '700',

    marginTop: 28,
  },


  description: {
    color: '#222222',

    fontSize: 16,

    lineHeight: 23,

    marginTop: 20,
  },


  price: {
    color: '#000000',

    fontSize: 35,

    fontWeight: '700',

    marginTop: 20,
  },


  currency: {
    fontSize: 15,

    fontWeight: '700',
  },


  buyRow: {
    flexDirection: 'row',

    marginTop: 22,

    gap: 9,
  },


  buyButton: {
    flex: 1,

    height: 55,

    borderRadius: 5,

    backgroundColor: '#ffcc00',

    alignItems: 'center',
    justifyContent: 'center',
  },


  buyText: {
    color: '#000000',

    fontSize: 15,

    fontWeight: '700',
  },


  comparePlaceholder: {
    width: 55,
    height: 55,

    borderRadius: 8,

    borderWidth: 1,
    borderColor: '#dddddd',

    backgroundColor: '#ffffff',

    alignItems: 'center',
    justifyContent: 'center',
  },

  compareButtonImage: {
    width: 24,
    height: 24,
  },

  delivery: {
    marginTop: 40,

    minHeight: 100,

    backgroundColor: '#fafafa',

    padding: 15,
  },


  deliveryTitle: {
    color: '#111111',

    fontSize: 16,

    fontWeight: '700',
  },


  notFound: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#ffffff',
  },


  notFoundText: {
    color: '#111111',

    fontSize: 20,
  },
});