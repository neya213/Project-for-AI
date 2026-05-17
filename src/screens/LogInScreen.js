import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Monitor keyboard visibility state dynamically
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Authentication Failure", "Please supply all required security credentials.");
      return;
    }
    onLoginSuccess();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* Header Branding Section */}
            <View style={styles.logoSection}>
              <View style={styles.iconShield}>
                <Ionicons name="shield-checkmark-sharp" size={40} color="#748ffc" />
              </View>
              <Text style={styles.title}>TWO-BRAIN HYBRID</Text>
              <Text style={styles.subtitle}>SECURE FORENSIC ENCLAVE</Text>
            </View>

            {/* Input Fields Container */}
            <View style={styles.formContainer}>
              
              {/* Email Field */}
              <Text style={styles.inputLabel}>Gmail</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#495057" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input}
                  placeholder="operator@forensic.enclave"
                  placeholderTextColor="#495057"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Field */}
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#495057" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input}
                  placeholder="••••••••••••"
                  placeholderTextColor="#495057"
                  secureTextEntry={secureText}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                  <Ionicons 
                    name={secureText ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#495057" 
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Prompt */}
              <TouchableOpacity style={styles.forgotAnchor}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Action Access Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log-in</Text>
                <Ionicons name="arrow-forward-sharp" size={18} color="#0b0e14" />
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Footer sits at absolute bottom but vanishes when keyboard is deployed */}
        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <Ionicons name="alert-circle-outline" size={14} color="#495057" />
            <Text style={styles.footerText}>Authorized Forensic Clearance Required.</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0e14',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 80, // Leaves clean space for the absolute footer
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconShield: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#141923',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1f2635'
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 10,
    color: '#748ffc',
    letterSpacing: 3,
    fontWeight: '700',
    marginTop: 6,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    color: '#868e96',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141923',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#1f2635',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  forgotAnchor: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#748ffc',
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: '#748ffc',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#0b0e14',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#0b0e14',
  },
  footerText: {
    color: '#495057',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
    letterSpacing: 0.5,
  }
});