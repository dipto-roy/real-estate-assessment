import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalization } from '../hooks/useLocalization';
import { authService } from '../services/api';

export default function LoginScreen({ navigation }: any) {
  const { t } = useLocalization();
  const [email, setEmail] = useState('buyer@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      navigation.replace('Projects');
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Invalid credentials'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>🏠 Real Estate</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.demoAccounts}>
          <Text style={styles.demoTitle}>Demo Accounts:</Text>
          <TouchableOpacity
            onPress={() => {
              setEmail('buyer@example.com');
              setPassword('password123');
            }}
          >
            <Text style={styles.demoText}>👤 Buyer: buyer@example.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmail('seller@example.com');
              setPassword('password123');
            }}
          >
            <Text style={styles.demoText}>👤 Seller: seller@example.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmail('realtor@example.com');
              setPassword('password123');
            }}
          >
            <Text style={styles.demoText}>👤 Realtor: realtor@example.com</Text>
          </TouchableOpacity>
          <Text style={styles.demoPassword}>Password: password123</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoAccounts: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  demoText: {
    fontSize: 13,
    color: '#007AFF',
    marginBottom: 8,
  },
  demoPassword: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});
