import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
  const slideAnim = useRef(new Animated.Value(50)).current; // Initial position: 50px below

  useEffect(() => {
    // Start the fade-in and slide-up animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // 1 second
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000, // 1 second
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleLogin = () => {
    const validUsername = 'anis';
    const validPassword = '123';

    if (username === validUsername && password === validPassword) {
      // Show welcome popup
      Alert.alert("Login Berhasil", `Selamat datang, ${username}!`, [
        { text: "OK", onPress: () => navigation.replace('Main') } // Redirect to Main screen after dismissing the popup
      ]);
    } else {
      Alert.alert("Login Gagal", "Masukkan Username dan Password dengan benar.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/02/09/42/020942579c9dd1fc8b13b5b222f775ad.jpg' }}
      style={styles.background}
    >
      <Animated.Text style={[styles.appName, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        Doa HarianKu
      </Animated.Text>
      
      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Login</Text>
        
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={20} color="#4B5320" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#7A7A7A"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#4B5320" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7A7A7A"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: 320,
    padding: 25,
    backgroundColor: 'rgba(210, 180, 140, 0.7)', // Light brown with transparency
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#1B4332', // Greenish gold
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
