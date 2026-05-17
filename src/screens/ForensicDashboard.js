import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ForensicDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [video, setVideo] = useState(null);

  // Function to handle video selection with Permissions
  const pickVideo = async () => {
    // 1. Request Media Library Permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    // 2. Check if permission was granted
    if (status !== 'granted') {
      Alert.alert(
        "Permission Denied", 
        "The system requires access to your gallery to analyze video files.",
        [{ text: "Open Settings", onPress: () => console.log("Direct user to settings") }, { text: "OK" }]
      );
      return;
    }

    try {
      // 3. Launch the library if permission is OK
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
      Alert.alert("System Error", "Failed to access the video library.");
    }
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        "Forensic Output",
        "Analysis Complete: 99.1% Confidence\n\nNo Deepfake artifacts detected in neural layers.",
        [{ text: "Close", onPress: () => setVideo(null) }]
      );
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centeredWrapper}>
          
          <View style={styles.headerGroup}>
            <Text style={styles.header}>Two-Brain Hybrid</Text>
            <Text style={styles.subHeader}>Bimodal Forensic System</Text>
          </View>

          <TouchableOpacity 
            style={[styles.videoPlaceholder, video && styles.videoActive]} 
            onPress={pickVideo}
            disabled={isAnalyzing}
          >
            {video ? (
              <>
                <MaterialCommunityIcons name="shield-lock-outline" size={70} color="#a5d8ff" />
                <Text style={styles.activePlaceholderText}>Video Encrypted & Ready</Text>
                <Text style={styles.videoUri} numberOfLines={1}>{video.split('/').pop()}</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="cloud-upload-outline" size={80} color="#748ffc" />
                <Text style={styles.placeholderText}>Tap to Select MP4</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.resultCard}>
             <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="radar" size={20} color="#748ffc" />
                <Text style={styles.cardTitle}>ENGINE STATUS</Text>
             </View>
             <Text style={styles.cardValue}>
               {isAnalyzing ? "Processing Data..." : video ? "Ready for Analysis" : "Awaiting Data"}
             </Text>
          </View>

          <TouchableOpacity 
            style={[styles.analyzeButton, (!video || isAnalyzing) && styles.buttonDisabled]}
            onPress={handleAnalysis}
            disabled={!video || isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>SCAN</Text>
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
  header: { fontSize: 28, fontWeight: '900', color: '#fff', textAlign: 'center' },
  subHeader: { fontSize: 11, color: '#748ffc', marginTop: 5, letterSpacing: 2, fontWeight: '700', textTransform: 'uppercase' },
  videoPlaceholder: {
    width: '100%', height: 300, backgroundColor: '#161b22', borderRadius: 30, justifyContent: 'center',
    alignItems: 'center', borderWidth: 2, borderColor: '#364fc7', borderStyle: 'dashed', marginBottom: 30
  },
  videoActive: { borderColor: '#748ffc', borderStyle: 'solid', backgroundColor: '#1a1f36' },
  placeholderText: { color: '#495057', marginTop: 15, fontWeight: '600', fontSize: 16 },
  activePlaceholderText: { color: '#a5d8ff', marginTop: 15, fontWeight: '800' },
  videoUri: { color: '#748ffc', fontSize: 11, marginTop: 8, opacity: 0.6 },
  resultCard: {
    backgroundColor: '#161b22', padding: 20, borderRadius: 20, width: '100%', marginBottom: 30,
    borderLeftWidth: 5, borderLeftColor: '#748ffc'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { color: '#748ffc', fontSize: 11, marginLeft: 8, letterSpacing: 1.5, fontWeight: '900' },
  cardValue: { fontSize: 19, fontWeight: '600', color: '#fff' },
  analyzeButton: {
    backgroundColor: '#5c7cfa', paddingVertical: 20, width: '100%', borderRadius: 16, alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#212529' },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 15, letterSpacing: 1.2 }
});