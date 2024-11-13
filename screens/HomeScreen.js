import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
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
const HEADER_HEIGHT = height * 0.3;

const HomeScreen = () => {
  const [doaList, setDoaList] = useState([]);
  const [filteredDoaList, setFilteredDoaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllDoa = async () => {
      try {
        const response = await axios.get('https://doa-doa-api-ahmadramadhan.fly.dev/api');
        setDoaList(response.data);
        setFilteredDoaList(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDoa();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = doaList.filter((doa) =>
        doa.doa.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoaList(filteredData);
    } else {
      setFilteredDoaList(doaList);
    }
  };

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
          source={{ uri: 'https://cdn.pixabay.com/photo/2022/06/04/18/52/mosque-7242588_960_720.jpg' }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(45, 106, 79, 0.6)', 'rgba(27, 67, 50, 1)']} // Gradien yang sama
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Kumpulan Doa</Text>
              <Text style={styles.headerSubtitle}>Pedoman Doa Sehari-hari</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#B7C9B5" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Cari doa..."
            placeholderTextColor="#B7C9B5"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <FlatList
          data={filteredDoaList}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDoaPress(item)}>
              <LinearGradient
                colors={['rgba(45, 106, 79, 0.6)', 'rgba(27, 67, 50, 0.5)']} // Transparansi pada card
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.card}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.doa}</Text>
                  <Text style={styles.cardArabic}>{item.ayat}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <FontAwesome name="chevron-right" size={20} color="#B7C9B5" />
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
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B7C9B5',
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#1B4332',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 106, 79, 0.7)', // Card transparan
    borderRadius: 15,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    backgroundColor: 'rgba(183, 201, 181, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardArabic: {
    fontSize: 16,
    color: '#B7C9B5',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'System',
  },
  iconContainer: {
    backgroundColor: 'rgba(183, 201, 181, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default HomeScreen;
