import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ForensicDashboard from './src/screens/ForensicDashboard';

export default function App() {
  return (
    <>
      <ForensicDashboard />
      <StatusBar style="light" />
    </>
  );
}