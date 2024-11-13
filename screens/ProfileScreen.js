import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StatusBar,
  Linking,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.3;

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    id: 1,
    imageUrl: "https://i.pinimg.com/564x/d6/bd/ca/d6bdcaae508069779634dd1c4dc10067.jpg",
    nama: "Mazroha Anis Sugesti",
    nim: "21120122120020",
    kel: "Kelompok 30",
  });
  
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogout = () => {
    navigation.navigate('Login');
    // Add your logout logic here
  };

  const handleGithubLink = () => {
    Linking.openURL("https://github.com/example"); // Example GitHub URL
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
      
      {/* Header with background image */}
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/564x/56/d7/74/56d77492c80239373d30f0a781f5810d.jpg' }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(45, 106, 79, 0.5)', 'rgba(27, 67, 50, 0.9)']}
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Profile Pengguna</Text>
              <Text style={styles.headerSubtitle}>Informasi Anda</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Profile Card */}
        <View style={styles.card}>
          <TouchableOpacity onPress={handleGithubLink} style={styles.githubProfile}>
            <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user.nama}</Text>
            <Text style={styles.nim}>{user.nim}</Text>
            <Text style={styles.kel}>{user.kel}</Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.card}>
          <Text style={styles.text}>
            Tugas Akhir Praktikum PPB | Teknik Komputer 👩‍💻✨ | Angkatan 2022
          </Text>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  githubProfile: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100, // Set the desired width
    height: 100, // Set the desired height
    borderRadius: 5, // Making it circular
    borderWidth: 2, // Optional: add border
    borderColor: '#B7C9B5', // Optional: border color
    overflow: 'hidden',
  },

  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 5,
  },
  nim: {
    fontSize: 19,
    color: '#1B4332',
    marginBottom: 5,
  },
  kel: {
    fontSize: 17,
    color: '#1B4332',
    marginBottom: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B7C9B5',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff4500',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
