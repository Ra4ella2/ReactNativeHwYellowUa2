import {
  Pressable,
  StyleSheet,
  View,
  Image
} from 'react-native';


type HeaderProps = {
  onBack?: () => void;
};


export default function Header({
  onBack,
}: HeaderProps) {
  return (
    <View style={styles.header}>

      <Pressable
        onPress={onBack}
        disabled={!onBack}
      >
        <Image
          source={require('../../assets/images/but1.jpg')}
          style={styles.menuImage}
          resizeMode="contain"
        />
      </Pressable>


      <View style={styles.logoPlaceholder}> 
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.rightButtons}>

        {/* Весы */}
        <Image
          source={require('../../assets/images/but2.jpg')}
          style={styles.headerIcon}
          resizeMode="contain"
        />


        {/* Корзина */}
        <Image
          source={require('../../assets/images/but3.jpg')}
          style={styles.headerIcon}
          resizeMode="contain"
        />

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 78,

    backgroundColor: '#191919',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 50
  },


  menuPlaceholder: {
    width: 38,
    height: 38,

    borderRadius: 5,

    backgroundColor: '#777777',
  },


  logoPlaceholder: {
    width: 110,
    height: 38,

    borderRadius: 5,
  },

  logoImage: {
    width: 110,
    height: 45,
  },

  rightButtons: {
    flexDirection: 'row',

    gap: 12,
  },


  iconPlaceholder: {
    width: 32,
    height: 32,

    borderRadius: 5,

    backgroundColor: '#777777',
  },
  headerIcon: {
    width: 32,
    height: 32,
  },
  menuImage: {
    width: 40,
    height: 40,
  },
});