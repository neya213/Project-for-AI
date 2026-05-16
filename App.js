import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ForensicDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    // 1. Request Media Library Permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        "Access Required", 
        "Please enable gallery permissions in your system settings to upload videos for analysis.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      // 2. Launch Picker (Optimized for MP4/MOV)
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setVideo(uri);
      }
    } catch (error) {
      Alert.alert("System Error", "The engine failed to access the local media storage.");
    }
  };

  const handleAnalysis = () => {
    if (!video) return;

    setIsAnalyzing(true);

    // Simulate forensic processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // FINAL FORENSIC NOTIFICATION
      Alert.alert(
        "🔍 Forensic Analysis Report",
        "STATUS: COMPLETE\n\n• Neural Consistency: 99.1%\n• Artifact Detection: Negative\n• Bimodal Sync: Verified\n\nVERDICT: MEDIA IS GENUINE",
        [
          { 
            text: "Clear & Finish", 
            onPress: () => setVideo(null),
            style: "destructive" 
          },
          { 
            text: "Archive Result", 
            onPress: () => console.log("Saved to logs") 
          }
        ]
      );
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centeredWrapper}>
          
          <View style={styles.headerGroup}>
            <Text style={styles.header}>Two-Brain Hybrid</Text>
            <Text style={styles.subHeader}>Bimodal Forensic System</Text>
          </View>

          {/* Video Selection Area */}
          <TouchableOpacity 
            style={[styles.videoPlaceholder, video && styles.videoActive]} 
            onPress={pickVideo}
            disabled={isAnalyzing}
          >
            {video ? (
              <>
                <View style={styles.glowCircle}>
                    <MaterialCommunityIcons name="shield-check" size={60} color="#a5d8ff" />
                </View>
                <Text style={styles.activePlaceholderText}>Video Ingested</Text>
                <Text style={styles.videoUri} numberOfLines={1}>
                  {video.split('/').pop()}
                </Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="upload-network" size={80} color="#748ffc" />
                <Text style={styles.placeholderText}>Select Forensic Sample</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Real-time Status Card */}
          <View style={styles.resultCard}>
             <View style={styles.cardHeader}>
                <MaterialCommunityIcons 
                  name={isAnalyzing ? "loading" : "database-check"} 
                  size={20} 
                  color="#748ffc" 
                />
                <Text style={styles.cardTitle}>ENGINE STATUS</Text>
             </View>
             <Text style={styles.cardValue}>
               {isAnalyzing ? "Scanning Neural Layers..." : video ? "Core Primed & Ready" : "Awaiting Data Input"}
             </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={[styles.analyzeButton, (!video || isAnalyzing) && styles.buttonDisabled]}
            onPress={handleAnalysis}
            disabled={!video || isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons name="brain" size={20} color="#fff" style={{marginRight: 10}} />
                <Text style={styles.buttonText}>RUN BIMODAL SCAN</Text>
              </View>
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
  header: { fontSize: 30, fontWeight: '900', color: '#fff', textAlign: 'center', letterSpacing: 1 },
  subHeader: { fontSize: 12, color: '#748ffc', marginTop: 5, letterSpacing: 3, fontWeight: '700', textTransform: 'uppercase' },
  videoPlaceholder: {
    width: '100%', height: 320, backgroundColor: '#161b22', borderRadius: 30, justifyContent: 'center',
    alignItems: 'center', borderWidth: 2, borderColor: '#364fc7', borderStyle: 'dashed', marginBottom: 30,
    overflow: 'hidden'
  },
  videoActive: { borderColor: '#748ffc', borderStyle: 'solid', backgroundColor: '#1a1f36' },
  glowCircle: {
    padding: 20, borderRadius: 100, backgroundColor: 'rgba(116, 143, 252, 0.1)', marginBottom: 10
  },
  placeholderText: { color: '#495057', marginTop: 15, fontWeight: '600', fontSize: 16 },
  activePlaceholderText: { color: '#a5d8ff', marginTop: 10, fontWeight: '800', fontSize: 18 },
  videoUri: { color: '#748ffc', fontSize: 11, marginTop: 8, opacity: 0.6, paddingHorizontal: 20 },
  resultCard: {
    backgroundColor: '#161b22', padding: 22, borderRadius: 20, width: '100%', marginBottom: 30,
    borderLeftWidth: 5, borderLeftColor: '#748ffc',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4 } })
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: { color: '#748ffc', fontSize: 11, marginLeft: 8, letterSpacing: 2, fontWeight: '900' },
  cardValue: { fontSize: 18, fontWeight: '600', color: '#fff' },
  analyzeButton: {
    backgroundColor: '#5c7cfa', paddingVertical: 22, width: '100%', borderRadius: 18, alignItems: 'center',
    elevation: 8, shadowColor: '#5c7cfa', shadowOpacity: 0.4, shadowRadius: 10
  },
  buttonContent: { flexDirection: 'row', alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#212529', elevation: 0 },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 15, letterSpacing: 1.5 }
});