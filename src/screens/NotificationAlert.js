import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ForensicDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Gallery access is required to pick a video.");
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        // Basic check for MP4
        if (uri.toLowerCase().endsWith('.mp4')) {
          setVideo(uri);
        } else {
          Alert.alert("Invalid Format", "Please select an MP4 file for forensic analysis.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not open gallery.");
    }
  };

  // Triggered when button is pressed
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);

    // Simulate the bimodal analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // THE FORENSIC ALERT OUTPUT
      Alert.alert(
        "Analysis Complete",
        "The Two-Brain Hybrid System has finished scanning.\n\n• Visual Integrity: 98.4%\n• Audio Sync: Match Detected\n\nVerdict: GENUINE",
        [
          { text: "Download Report", onPress: () => console.log("Report logic here") },
          { text: "Dismiss", style: "cancel" }
        ]
      );
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centeredWrapper}>
          
          <View style={styles.headerGroup}>
            <Text style={styles.header}>Two-Brain Hybrid System</Text>
            <Text style={styles.subHeader}>Bimodal Deepfake Detection Interface</Text>
          </View>

          <TouchableOpacity 
            style={[styles.videoPlaceholder, video && styles.videoActive]} 
            onPress={pickVideo}
            disabled={isAnalyzing}
          >
            {video ? (
              <>
                <MaterialCommunityIcons name="file-eye-outline" size={60} color="#a5d8ff" />
                <Text style={styles.activePlaceholderText}>MP4 Loaded & Secured</Text>
                <Text style={styles.videoUri} numberOfLines={1}>{video.split('/').pop()}</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="movie-search-outline" size={80} color="#748ffc" />
                <Text style={styles.placeholderText}>Upload MP4 Video</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.resultCard}>
             <View style={styles.cardHeader}>
                <MaterialCommunityIcons 
                    name={isAnalyzing ? "loading" : "cpu-64-bit"} 
                    size={24} 
                    color="#748ffc" 
                />
                <Text style={styles.cardTitle}>SYSTEM STATUS</Text>
             </View>
             <Text style={styles.cardValue}>
               {isAnalyzing ? "Scanning Biometrics..." : video ? "System Primed" : "Awaiting Input"}
             </Text>
          </View>

          <TouchableOpacity 
            style={[styles.analyzeButton, (!video || isAnalyzing) && styles.buttonDisabled]}
            onPress={handleStartAnalysis}
            disabled={!video || isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>START BIMODAL ANALYSIS</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0e14' },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  centeredWrapper: { padding: 30, width: '100%', alignItems: 'center' },
  headerGroup: { marginBottom: 40, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#f8f9fa', textAlign: 'center' },
  subHeader: { fontSize: 13, color: '#748ffc', textAlign: 'center', marginTop: 8, fontWeight: '600', textTransform: 'uppercase' },
  videoPlaceholder: {
    width: '100%', height: 280, backgroundColor: '#161b22', borderRadius: 24, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#364fc7', borderStyle: 'dashed', marginBottom: 30
  },
  videoActive: { borderColor: '#748ffc', borderStyle: 'solid', backgroundColor: '#1a1f36' },
  placeholderText: { color: '#495057', marginTop: 15, fontWeight: '600', fontSize: 16 },
  activePlaceholderText: { color: '#a5d8ff', marginTop: 15, fontWeight: '700', fontSize: 16 },
  videoUri: { color: '#748ffc', fontSize: 12, marginTop: 8, opacity: 0.8 },
  resultCard: {
    backgroundColor: '#161b22', padding: 20, borderRadius: 18, width: '100%', marginBottom: 30,
    alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#748ffc'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: { color: '#748ffc', fontSize: 12, marginLeft: 8, letterSpacing: 2, fontWeight: '800' },
  cardValue: { fontSize: 18, fontWeight: '600', color: '#fff' },
  analyzeButton: {
    backgroundColor: '#5c7cfa', paddingVertical: 20, width: '100%', borderRadius: 16, alignItems: 'center',
    elevation: 5, shadowColor: "#5c7cfa", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12,
  },
  buttonDisabled: { backgroundColor: '#25262b', shadowOpacity: 0 },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 1.5 }
});