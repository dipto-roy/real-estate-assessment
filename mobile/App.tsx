import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import './i18n';
import { useLocalization } from './hooks/useLocalization';
import { authService } from './services/api';
import LoginScreen from './screens/LoginScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

function LanguageToggle() {
  const { currentLanguage, changeLanguage } = useLocalization();

  return (
    <TouchableOpacity
      style={styles.languageButton}
      onPress={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')}
    >
      <Text style={styles.languageButtonText}>
        {currentLanguage === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
      </Text>
    </TouchableOpacity>
  );
}

function LogoutButton({ navigation }: any) {
  const handleLogout = async () => {
    await authService.logout();
    navigation.replace('Login');
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const { t } = useLocalization();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authenticated = await authService.isAuthenticated();
    setIsAuthenticated(authenticated);
  };

  if (isAuthenticated === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Projects' : 'Login'}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={({ navigation }) => ({
              title: t('projects.title'),
              headerLeft: () => <LogoutButton navigation={navigation} />,
              headerRight: () => <LanguageToggle />,
            })}
          />
          <Stack.Screen
            name="ProjectDetails"
            component={ProjectDetailsScreen}
            options={{
              title: t('projects.projectDetails'),
              headerRight: () => <LanguageToggle />,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: t('messages.chatRoom'),
              headerRight: () => <LanguageToggle />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  languageButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  languageButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  logoutButton: {
    marginLeft: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
