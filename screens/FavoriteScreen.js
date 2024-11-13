import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.25;

const FavoriteScreen = () => {
  const [favoriteDoaList, setFavoriteDoaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavoriteDoa = async () => {
      try {
        const response = await axios.get('https://doa-doa-api-ahmadramadhan.fly.dev/api');
        setFavoriteDoaList(response.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteDoa();
  }, []);

  const handleDoaPress = (doa) => {
    navigation.navigate('DetailDoa', { doa });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2D6A4F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/736x/ea/32/13/ea321312651e87dc8ea3eec50eabcf1a.jpg' }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(45, 106, 79, 0.6)', 'rgba(27, 67, 50, 1)']}
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Favorite Doa</Text>
              <Text style={styles.headerSubtitle}>Kumpulan doa yang telah Anda simpan</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <FlatList
          data={favoriteDoaList}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleDoaPress(item)} 
              style={styles.card}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#6a9e73', '#4a7d53']}  // Gradien hijau muda
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.doa}</Text>
                  <Text style={styles.cardArabic}>{item.ayat}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <FontAwesome name="heart" size={24} color="white" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4332',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B4332',
  },
  header: {
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: -30,
    borderBottomRightRadius: -30,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '110%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B7C9B5',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#1B4332',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardArabic: {
    fontSize: 16,
    color: 'white',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'System',
  },
  iconContainer: {
    alignSelf: 'flex-end',
  },
});

export default FavoriteScreen;
