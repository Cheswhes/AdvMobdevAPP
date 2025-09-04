import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SpotLogo from "@/assets/images/spotlogo.jpg";

export default function SpotifyLoginScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={SpotLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email or username"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/tabs")}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Social Buttons */}
      <View style={styles.socialIconButtons}>
        <TouchableOpacity style={[styles.iconButton, styles.google]}>
          <AntDesign name="google" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, styles.facebook, styles.iconButtonLast]}
        >
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Signup Section (fixed) */}
      <View style={styles.signupContainer}>
        <Text style={styles.signup}>Don’t have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign up for Spotify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 80 : 40,
    flexGrow: 1,
    alignItems: "center",
    flex: 1, // replaces invalid minHeight: "100%"
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 200,
  },
  title: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "600",
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#282828",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  socialIconButtons: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconButtonLast: {
    marginRight: 0,
  },
  google: {
    backgroundColor: "#fff",
  },
  facebook: {
    backgroundColor: "#3b5998",
  },
  link: {
    color: "#1DB954",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  signupContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  signup: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },
});
