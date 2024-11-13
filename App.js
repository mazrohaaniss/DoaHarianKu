import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import ikon dari Ionicons
import { Text } from 'react-native'; // Import Text untuk menampilkan label
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import DetailDoa from './screens/DetailDoa';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const activeColor = '#9DC183'; // Warna hijau sage untuk tab aktif
const inactiveColor = '#888'; // Warna untuk tab tidak aktif

function MainTabNavigator() {
  const [activeTab, setActiveTab] = useState('Home'); // State untuk menyimpan tab yang aktif

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"}
              color={focused ? activeColor : inactiveColor} // Mengubah warna sesuai status
              size={size} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: focused ? activeColor : inactiveColor }}>
              Home
            </Text>
          ),
        }} 
        listeners={{
          tabPress: () => setActiveTab('Home'),
        }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "book" : "book-outline"}
              color={focused ? activeColor : inactiveColor} // Mengubah warna sesuai status
              size={size} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: focused ? activeColor : inactiveColor }}>
              Quiz
            </Text>
          ),
        }} 
        listeners={{
          tabPress: () => setActiveTab('Quiz'),
        }}
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteScreen} 
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "heart" : "heart-outline"}
              color={focused ? activeColor : inactiveColor} // Mengubah warna sesuai status
              size={size} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: focused ? activeColor : inactiveColor }}>
              Favorite
            </Text>
          ),
        }} 
        listeners={{
          tabPress: () => setActiveTab('Favorite'),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"}
              color={focused ? activeColor : inactiveColor} // Mengubah warna sesuai status
              size={size} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: focused ? activeColor : inactiveColor }}>
              Profile
            </Text>
          ),
        }} 
        listeners={{
          tabPress: () => setActiveTab('Profile'),
        }}
      />

      
    </Tab.Navigator>

    
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DetailDoa" component={DetailDoa} options={{ headerShown: true }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{headerShown: true}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
