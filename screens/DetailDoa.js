import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  Dimensions, 
  StatusBar, 
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.35;

const DetailDoa = ({ route, navigation }) => {
  const { doa } = route.params;

  // State for audio control
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load and clean up audio when the component mounts/unmounts
  useEffect(() => {
    const loadAudio = async () => {
      try {
        setIsLoading(true);
        let audioFile;

        // Check the title of the doa and load the corresponding audio
        if (doa.doa === "Doa sebelum tidur") {
          audioFile = require('../assets/audio/sblmtidur.mp3');
        } else if (doa.doa === "Doa bangun tidur") {
          audioFile = require('../assets/audio/banguntidur.mp3');
        }else if (doa.doa === "Doa masuk kamar mandi") {
          audioFile = require('../assets/audio/masukkamarmandi.mp3');
        }else if (doa.doa === "Doa ketika bercermin") {
          audioFile = require('../assets/audio/bercermin.mp3');
        }else if (doa.doa === "Doa keluar rumah") {
          audioFile = require('../assets/audio/keluarrumah.mp3');
        }else if (doa.doa === "Doa masuk rumah") {
          audioFile = require('../assets/audio/masukrumah.mp3');
        }else if (doa.doa === "Doa memohon ilmu yang bermanfaat") {
          audioFile = require('../assets/audio/ilmubermanfaat.mp3');
        }else if (doa.doa === "Doa sebelum belajar") {
          audioFile = require('../assets/audio/sblmbljr.mp3');
        }else if (doa.doa === "Doa sesudah belajar") {
          audioFile = require('../assets/audio/sesudahbljr.mp3');
        }else if (doa.doa === "Doa sebelum wudhu") {
          audioFile = require('../assets/audio/sblmwudhu.mp3');
        }else if (doa.doa === "Doa setelah wudhu") {
          audioFile = require('../assets/audio/setelahwudhu.mp3');
        }

        // Load the selected audio file
        if (audioFile) {
          const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: false });
          setSound(sound);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading audio:", error);
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [doa]); // Run whenever the doa changes

  // Play audio
  const playAudio = async () => {
    if (sound) {
      setIsPlaying(true);
      await sound.playAsync();
    }
  };

  // Pause audio
  const pauseAudio = async () => {
    if (sound) {
      setIsPlaying(false);
      await sound.pauseAsync();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground 
          source={{ uri: 'https://cdn.pixabay.com/photo/2014/03/03/16/15/mosque-279015_640.jpg' }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(45, 106, 79, 0.5)', 'rgba(27, 67, 50, 0.9)']}
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{doa.doa}</Text>
              <TouchableOpacity 
                style={styles.favoriteIcon} 
                onPress={() => navigation.navigate('Favorite')}
              >
                <FontAwesome name="heart" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerSubtitle}>Detail Doa</Text>
          </LinearGradient>
        </ImageBackground>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainCard}>
          <View style={styles.bismillahContainer}>
            <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          </View>

          <View style={styles.doaCard}>
            {/* Audio Icon to play/pause audio */}
            <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio} style={styles.iconContainer}>
              <FontAwesome name={isPlaying ? "pause" : "volume-up"} size={24} color="#2D6A4F" />
            </TouchableOpacity>

            <Text style={styles.arabic}>{doa.ayat}</Text>
            <Text style={styles.latin}>{doa.latin}</Text>
            <View style={styles.divider} />
            <Text style={styles.translation}>{doa.artinya}</Text>
          </View>

          {/* Decoration Card */}
          <View style={styles.decorationCard}>
            <View style={styles.decorationIcon}>
              <FontAwesome name="star" size={20} color="#2D6A4F" />
            </View>
            <Text style={styles.decorationText}>
              "Sebaik-baik doa adalah doa yang dipanjatkan dengan keikhlasan hati"
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginTop: -5,
    marginBottom: 15,
  },
  favoriteIcon: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  mainCard: {
    padding: 20,
  },
  bismillahContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  bismillah: {
    fontSize: 24,
    color: '#2D6A4F',
    textAlign: 'center',
  },
  doaCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F8F4',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  arabic: {
    fontSize: 28,
    color: '#2D6A4F',
    textAlign: 'center',
    lineHeight: 45,
    marginBottom: 15,
  },
  latin: {
    fontSize: 18,
    color: '#C58F00',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 25,
  },
  divider: {
    height: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    width: '100%',
  },
  translation: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  decorationCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  decorationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  decorationText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
});

export default DetailDoa;
