import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ForensicDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        // Extract extension and check if it's mp4
        const fileExtension = uri.split('.').pop().toLowerCase();

        if (fileExtension === 'mp4') {
          setVideo(uri);
        } else {
          Alert.alert(
            "Invalid Format",
            "This system only accepts MP4 files. Please select a valid video.",
            [{ text: "OK" }]
          );
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not open video gallery.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centeredWrapper}>
          
          {/* Header Section */}
          <View style={styles.headerGroup}>
            <Text style={styles.header}>Two-Brain Hybrid System</Text>
            <Text style={styles.subHeader}>Bimodal Deepfake Detection Interface</Text>
          </View>

          {/* Video Input Area */}
          <TouchableOpacity 
            style={[styles.videoPlaceholder, video && styles.videoActive]} 
            onPress={pickVideo}
          >
            {video ? (
              <>
                <MaterialCommunityIcons name="file-check" size={60} color="#51cf66" />
                <Text style={styles.placeholderText}>MP4 Loaded Successfully</Text>
                <Text style={styles.videoUri} numberOfLines={1}>
                  {video.split('/').pop()}
                </Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="file-video-outline" size={80} color="#4dabf7" />
                <Text style={styles.placeholderText}>Upload MP4 Video</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Unified Result Card */}
          <View style={styles.resultCard}>
             <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="shield-search" size={24} color="#4dabf7" />
                <Text style={styles.cardTitle}>SYSTEM STATUS</Text>
             </View>
             <Text style={styles.cardValue}>
               {isAnalyzing ? "Processing..." : video ? "Ready for Analysis" : "Awaiting MP4 Input"}
             </Text>
          </View>

          {/* Main Action Button */}
          <TouchableOpacity 
            style={[styles.analyzeButton, !video && styles.buttonDisabled]}
            onPress={() => video && setIsAnalyzing(!isAnalyzing)}
            disabled={!video}
          >
            <Text style={styles.buttonText}>
              {isAnalyzing ? "STOPPING..." : "START BIMODAL ANALYSIS"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: 'center' 
  },
  centeredWrapper: {
    padding: 30,
    width: '100%',
    alignItems: 'center',
  },
  headerGroup: {
    marginBottom: 40,
    alignItems: 'center',
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center' 
  },
  subHeader: { 
    fontSize: 14, 
    color: '#adb5bd', 
    textAlign: 'center', 
    marginTop: 8 
  },
  videoPlaceholder: {
    width: '100%',
    height: 280,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#343a40',
    borderStyle: 'dashed',
    marginBottom: 30
  },
  videoActive: {
    borderColor: '#51cf66',
    borderStyle: 'solid',
    backgroundColor: '#162419'
  },
  placeholderText: { 
    color: '#adb5bd', 
    marginTop: 15, 
    fontWeight: '600',
    fontSize: 16 
  },
  videoUri: {
    color: '#51cf66',
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 20
  },
  resultCard: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#4dabf7'
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  cardTitle: { 
    color: '#adb5bd', 
    fontSize: 13, 
    marginLeft: 8,
    letterSpacing: 1
  },
  cardValue: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  analyzeButton: {
    backgroundColor: '#339af0',
    paddingVertical: 18,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#343a40',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '900', 
    fontSize: 16,
    letterSpacing: 1
  }
});