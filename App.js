import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import ForensicDashboard from './src/screens/ForensicDashboard';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication tracking state

  useEffect(() => {
    async function prepareSystem() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepareSystem();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <View style={styles.brandingBox}>
          <Text style={styles.title}>TWO-BRAIN HYBRID</Text>
          <Text style={styles.subtitle}>SECURE FORENSIC ENCLAVE</Text>
        </View>
        <ActivityIndicator size="large" color="#748ffc" style={styles.spinner} />
        <Text style={styles.statusText}>Initializing Core Neural Layers...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      {isAuthenticated ? (
        // Render main engine dashboard when user enters credentials
        <ForensicDashboard />
      ) : (
        // Show secure gateway screen initially
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0b0e14',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  brandingBox: {
    marginBottom: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2
  },
  subtitle: {
    fontSize: 10,
    color: '#748ffc',
    letterSpacing: 4,
    fontWeight: '700',
    marginTop: 6
  },
  spinner: {
    transform: [{ scale: 1.2 }]
  },
  statusText: {
    color: '#495057',
    fontSize: 12,
    marginTop: 20,
    letterSpacing: 1,
    fontWeight: '600'
  }
});