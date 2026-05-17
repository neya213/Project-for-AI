import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ForensicDashboard({ isDarkMode, theme }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [video, setVideo] = useState(null);
  
  // Track system analytical findings state
  const [showEvidence, setShowEvidence] = useState(false);
  const [analysisVerdict, setAnalysisVerdict] = useState(null);

  const pickVideo = async () => {
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
        if (uri.toLowerCase().endsWith('.mp4')) {
          setVideo(uri);
          setShowEvidence(false); // Clear previous runs
          setAnalysisVerdict(null);
        } else {
          Alert.alert("Invalid Format", "Please select an MP4 file for forensic analysis.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not open gallery.");
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setShowEvidence(false);

    // Simulate bimodal processing pipeline delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisVerdict("TAMPERED");
      
      // CRITICAL FORENSIC OVERRIDE ALERT
      Alert.alert(
        "CRITICAL ALERT: MANIPULATION DETECTED",
        "The Two-Brain Hybrid System has identified structural inconsistencies within the target media asset.\n\n• Visual Integrity: 42.1% (FAIL)\n• Audio Sync: Phase Discrepancy Found\n\nVerdict: SYNTHETIC / DEEPFAKE",
        [
          { text: "Review Evidence", onPress: () => setShowEvidence(true) },
          { text: "Dismiss", style: "cancel" }
        ]
      );
    }, 3000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centeredWrapper}>
          
          <View style={styles.headerGroup}>
            <Text style={[styles.header, { color: theme.textMain }]}>Two-Brain Hybrid System</Text>
            <Text style={[styles.subHeader, { color: theme.accent }]}>Bimodal Deepfake Detection Interface</Text>
          </View>

          {/* Interactive Target Media Workspace */}
          <TouchableOpacity 
            style={[
              styles.videoPlaceholder, 
              { backgroundColor: theme.card, borderColor: isDarkMode ? '#364fc7' : '#ced4da' },
              video && [styles.videoActive, { backgroundColor: isDarkMode ? '#1a1f36' : '#edf2ff', borderColor: theme.accent }]
            ]} 
            onPress={pickVideo}
            disabled={isAnalyzing}
          >
            {video ? (
              <>
                <MaterialCommunityIcons name="file-eye-outline" size={60} color={isDarkMode ? "#a5d8ff" : "#4c6ef5"} />
                <Text style={[styles.activePlaceholderText, { color: isDarkMode ? "#a5d8ff" : "#4c6ef5" }]}>MP4 Loaded & Secured</Text>
                <Text style={[styles.videoUri, { color: theme.accent }]} numberOfLines={1}>{video.split('/').pop()}</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="movie-search-outline" size={80} color={theme.accent} />
                <Text style={[styles.placeholderText, { color: theme.textMuted }]}>Upload MP4 Video</Text>
              </>
            )}
          </TouchableOpacity>

          {/* System Telemetry Status Module */}
          <View style={[styles.resultCard, { backgroundColor: theme.card, borderLeftColor: theme.accent, borderColor: theme.border }]}>
             <View style={styles.cardHeader}>
                <MaterialCommunityIcons 
                    name={isAnalyzing ? "loading" : "cpu-64-bit"} 
                    size={24} 
                    color={theme.accent} 
                />
                <Text style={[styles.cardTitle, { color: theme.accent }]}>SYSTEM STATUS</Text>
             </View>
             <Text style={[styles.cardValue, { color: theme.textMain }]}>
               {isAnalyzing ? "Scanning Biometrics..." : video ? "System Primed" : "Awaiting Input"}
             </Text>
          </View>

          {/* EXPLICIT EVIDENCE MAP DISPLAY LAYER */}
          {showEvidence && (
            <View style={[styles.evidenceContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.evidenceHeaderGroup}>
                <MaterialCommunityIcons name="alert-decagram" size={20} color="#ff6b6b" />
                <Text style={styles.evidenceSectionTitle}>ISOLATED ARTIFACT EVIDENCE MAP</Text>
              </View>
              
              <Text style={[styles.evidenceDescription, { color: theme.textMuted }]}>
                Fast-Brain structural pass caught pixel blurring and boundary inconsistencies along the jaw contour.
              </Text>

              {/* Mock Frame Mapping Representation */}
              <View style={styles.frameGrid}>
                <View style={[styles.frameCard, { borderColor: '#ff6b6b' }]}>
                  {/* Using standard system layout shapes for testing without external file lock steps */}
                  <View style={styles.anomalyScanBox}>
                    <MaterialCommunityIcons name="face-recognition" size={48} color="#ff6b6b" />
                    <View style={styles.scannerLine} />
                  </View>
                  <Text style={styles.frameLabel}>FRAME #0412 - BLURRING</Text>
                </View>
                
                <View style={[styles.frameCard, { borderColor: '#ff6b6b' }]}>
                  <View style={styles.anomalyScanBox}>
                    <MaterialCommunityIcons name="eye-off-outline" size={48} color="#ffd43b" />
                    <View style={[styles.scannerLine, { backgroundColor: '#ffd43b', top: '70%' }]} />
                  </View>
                  <Text style={styles.frameLabel}>FRAME #0418 - ASYMMETRY</Text>
                </View>
              </View>

              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>VERDICT CONFIG : </Text>
                <Text style={styles.metricFailValue}>DEEPFAKE IDENTIFIED (94.2% Confidence)</Text>
              </View>
            </View>
          )}

          {/* Pipeline Controller Trigger */}
          <TouchableOpacity 
            style={[styles.analyzeButton, { backgroundColor: theme.accent }, (!video || isAnalyzing) && styles.buttonDisabled]}
            onPress={handleStartAnalysis}
            disabled={!video || isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.buttonText, { color: isDarkMode ? '#0b0e14' : '#ffffff' }]}>START BIMODAL ANALYSIS</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  centeredWrapper: { padding: 30, width: '100%', alignItems: 'center', paddingTop: 90 },
  headerGroup: { marginBottom: 40, alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subHeader: { fontSize: 11, textAlign: 'center', marginTop: 8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  videoPlaceholder: {
    width: '100%', height: 220, borderRadius: 24, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderStyle: 'dashed', marginBottom: 24
  },
  videoActive: { borderStyle: 'solid' },
  placeholderText: { marginTop: 15, fontWeight: '600', fontSize: 15 },
  activePlaceholderText: { marginTop: 15, fontWeight: '700', fontSize: 15 },
  videoUri: { fontSize: 12, marginTop: 8, opacity: 0.8, fontWeight: '600' },
  resultCard: {
    padding: 20, borderRadius: 18, width: '100%', marginBottom: 24,
    alignItems: 'center', borderLeftWidth: 4, borderWidth: 1
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 11, marginLeft: 8, letterSpacing: 2, fontWeight: '800' },
  cardValue: { fontSize: 16, fontWeight: '700' },
  
  // EXPLICIT FORENSIC DISPLAY MODULE STYLING
  evidenceContainer: {
    width: '100%', padding: 20, borderRadius: 18, borderWidth: 1, marginBottom: 24
  },
  evidenceHeaderGroup: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  evidenceSectionTitle: { color: '#ff6b6b', fontWeight: '800', fontSize: 12, marginLeft: 8, letterSpacing: 1 },
  evidenceDescription: { fontSize: 12, lineHeight: 18, marginBottom: 16, fontWeight: '500' },
  frameGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  frameCard: { width: '48%', backgroundColor: '#1c202b', borderRadius: 12, borderWidth: 1, padding: 10, alignItems: 'center' },
  anomalyScanBox: { width: '100%', height: 90, backgroundColor: '#10121a', borderRadius: 8, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  scannerLine: { position: 'absolute', left: 0, right: 0, top: '40%', height: 2, backgroundColor: '#ff6b6b', opacity: 0.8 },
  frameLabel: { color: '#ced4da', fontSize: 9, fontWeight: '700', marginTop: 8, letterSpacing: 0.5 },
  metricRow: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#2b303c', paddingTop: 12, justifyContent: 'center' },
  metricLabel: { color: '#868e96', fontSize: 11, fontWeight: '700' },
  metricFailValue: { color: '#ff6b6b', fontSize: 11, fontWeight: '800' },

  analyzeButton: {
    paddingVertical: 20, width: '100%', borderRadius: 16, alignItems: 'center',
    elevation: 4, shadowColor: "#5c7cfa", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8,
  },
  buttonDisabled: { backgroundColor: '#25262b', shadowOpacity: 0, elevation: 0 },
  buttonText: { fontWeight: '800', fontSize: 14, letterSpacing: 1.5 }
});