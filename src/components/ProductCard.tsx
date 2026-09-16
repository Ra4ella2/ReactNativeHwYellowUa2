import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Product } from '../data/products';


type ProductCardProps = {
  product: Product;

  onPress: () => void;
  cardWidth: '48%' | '90%';
};


export default function ProductCard({
  product,
  onPress,
  cardWidth,
}: ProductCardProps) {

  function formatPrice(price: number) {

    return String(price).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ' '
    );

  }

  return (
    <Pressable
      onPress={onPress}

      style={({ pressed }) => [
        styles.card,

        {
          width: cardWidth,
        },

        pressed &&
        styles.cardPressed,
      ]}
    >

      <View style={styles.productTop}>

        <View style={styles.cardIcons}>

          <Image
            source={require('../../assets/images/but4.jpg')}
            style={styles.cardIconImage}
            resizeMode="contain"
          /> 

          <Image
            source={require('../../assets/images/but5.jpg')}
            style={styles.cardIconImage}
            resizeMode="contain"
          /> 

        </View>

        <Image
          source={{
            uri: product.image,
          }}

          style={styles.image}

          resizeMode="contain"
        />

      </View>

      <Text
        style={styles.name}
        numberOfLines={3}
      >
        {product.name}
      </Text>

      <Text style={styles.price}>

        {formatPrice(product.price)}

        <Text style={styles.currency}>
          {' '}грн
        </Text>

      </Text>

      <View style={styles.buyRow}>

        <View style={styles.buyButton}>

          <Text style={styles.buyText}>
            Купить
          </Text>

        </View>


        <Text style={styles.credit}>
          В кредит
        </Text>

      </View>

      <View style={styles.bottomRow}>

        <Text style={styles.stock}>

          {product.inStock
            ? 'Есть в наличии'
            : 'Нет в наличии'}

        </Text>


        <Text style={styles.code}>
          код: {product.code}
        </Text>

      </View>

    </Pressable>
  );
}


const styles = StyleSheet.create({
  card: {
    minHeight: 340,

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#dddddd',

    borderRadius: 13,

    padding: 10,
  },


  cardPressed: {
    opacity: 0.7,
  },


  productTop: {
    height: 180,

    position: 'relative',

    justifyContent: 'center',
    alignItems: 'center',
  },


  cardIcons: {
    position: 'absolute',

    left: 0,
    top: 15,

    zIndex: 2,

    gap: 16,
  },

  cardIconImage: {
    width: 18,
    height: 18,
  },

  smallIcon: {
    width: 18,
    height: 18,

    borderRadius: 3,

    backgroundColor: '#777777',
  },


  image: {
    width: '90%',
    height: '100%',
  },


  name: {
    minHeight: 56,

    color: '#111111',

    fontSize: 14,
    lineHeight: 18,

    fontWeight: '600',

    marginTop: 20,
    },


  price: {
    color: '#111111',

    fontSize: 19,
    fontWeight: '700',

    marginTop: 3,
  },


  currency: {
    fontSize: 11,

    fontWeight: '600',
  },


  buyRow: {
    marginTop: 10,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },


  buyButton: {
    width: 88,
    height: 37,

    borderRadius: 20,

    backgroundColor: '#ffcc00',

    alignItems: 'center',
    justifyContent: 'center',
  },


  buyText: {
    color: '#000000',

    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4
  },


  credit: {
    color: '#111111',

    fontSize: 14,
    fontWeight: '600',
  },


  bottomRow: {
    marginTop: 13,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },


  stock: {
    color: '#34c759',

    fontSize: 9,
  },


  code: {
    color: '#c4c4c4',

    fontSize: 8,
  },

});