import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  FadeIn,
} from "react-native-reanimated";

const GENRES = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop"];

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});

  // shake values
  const usernameShake = useSharedValue(0);
  const emailShake = useSharedValue(0);
  const genreShake = useSharedValue(0);

  const shake = (sharedValue) => {
    sharedValue.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const usernameStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: usernameShake.value }],
  }));

  const emailStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: emailShake.value }],
  }));

  const genreStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: genreShake.value }],
  }));

  // --- Real-time validation ---
  const validateField = (field, value) => {
    let message = "";
    if (field === "username") {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        message =
          "Username must be 3–20 characters (letters, numbers, underscores).";
      }
    }
    if (field === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "Please enter a valid email address.";
      }
    }
    if (field === "genre") {
      if (!value) {
        message = "Please select a genre.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSave = () => {
    let newErrors = {};
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username =
        "Username must be 3–20 characters (letters, numbers, underscores).";
      shake(usernameShake);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      shake(emailShake);
    }
    if (!genre) {
      newErrors.genre = "Please select a genre.";
      shake(genreShake);
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Profile saved!");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Static Profile Preview (real-time updates) */}
        <View style={styles.userSection}>
          <Image
            source={require("../../assets/images/avatar.jpeg")} // local static avatar
            style={styles.avatar}
          />
          <Text style={styles.username}>
            {username || "Your Username"}
          </Text>
          <Text style={styles.email}>{email || "your@email.com"}</Text>
          <Text style={styles.genre}>
            {genre || "Favorite Genre"}
          </Text>
        </View>

        {/* Profile Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <Animated.View style={usernameStyle}>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              placeholderTextColor="#777"
              value={username}
              onChangeText={(val) => {
                setUsername(val);
                validateField("username", val);
              }}
            />
          </Animated.View>
          {errors.username ? (
            <Animated.Text entering={FadeIn} style={styles.error}>
              {errors.username}
            </Animated.Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <Animated.View style={emailStyle}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                validateField("email", val);
              }}
              keyboardType="email-address"
            />
          </Animated.View>
          {errors.email ? (
            <Animated.Text entering={FadeIn} style={styles.error}>
              {errors.email}
            </Animated.Text>
          ) : null}

          <Text style={styles.label}>Favorite Genre</Text>
          <Animated.View style={genreStyle}>
            <View style={styles.genreRow}>
              {GENRES.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genreBtn,
                    genre === g && styles.genreBtnActive,
                  ]}
                  onPress={() => {
                    setGenre(g);
                    validateField("genre", g);
                  }}
                >
                  <Text
                    style={[
                      styles.genreText,
                      genre === g && styles.genreTextActive,
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
          {errors.genre ? (
            <Animated.Text entering={FadeIn} style={styles.error}>
              {errors.genre}
            </Animated.Text>
          ) : null}

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0e0f13",
  },
  container: {
    paddingBottom: 16,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  iconBtn: {
    padding: 8,
    borderRadius: 999,
  },

  // Profile Preview
  userSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  genre: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
    fontStyle: "italic",
  },

  // Form
  form: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1c1c22",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  error: {
    color: "#ff6b6b",
    fontSize: 12,
    marginBottom: 12,
  },

  // Genre Buttons
  genreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  genreBtn: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  genreBtnActive: {
    backgroundColor: "#1db954",
    borderColor: "#1db954",
  },
  genreText: {
    color: "#ccc",
    fontSize: 13,
    fontWeight: "600",
  },
  genreTextActive: {
    color: "#fff",
  },

  // Save Button
  saveBtn: {
    backgroundColor: "#1db954",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
