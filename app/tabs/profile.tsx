import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  FadeIn,
} from "react-native-reanimated";
import { useTheme } from "@/context/Themecontext";

const GENRES = ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "EDM"];

const FILTERS = [
  { name: "Normal", actions: [] },
  { name: "Brighten", actions: [{ brighten: 0.3 }] },
  { name: "Darken", actions: [{ brighten: -0.3 }] },
  { name: "Contrast+", actions: [{ contrast: 1.5 }] },
  { name: "Contrast-", actions: [{ contrast: 0.7 }] },
];

export default function ProfileScreen() {
  const { theme, colors, toggleTheme } = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [filteredUri, setFilteredUri] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [pickerModal, setPickerModal] = useState(false);

  const usernameShake = useSharedValue(0);
  const emailShake = useSharedValue(0);
  const genreShake = useSharedValue(0);

  const shake = (sv) => {
    sv.value = withSequence(
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

  // Load saved data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem("username");
        const savedEmail = await AsyncStorage.getItem("email");
        const savedGenre = await AsyncStorage.getItem("genre");
        const savedAvatar = await AsyncStorage.getItem("avatar");

        if (savedUsername) setUsername(savedUsername);
        if (savedEmail) setEmail(savedEmail);
        if (savedGenre) setGenre(savedGenre);
        if (savedAvatar) {
          setAvatar(savedAvatar);
          setFilteredUri(savedAvatar);
        }
      } catch (err) {
        console.log("⚠️ Load profile error:", err);
      }
    };
    loadProfile();
  }, []);

  const saveProfileToStorage = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("genre", genre);
      if (filteredUri) await AsyncStorage.setItem("avatar", filteredUri);
    } catch (err) {
      console.log("⚠️ Save profile error:", err);
    }
  };

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

  const handleSave = async () => {
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
      await saveProfileToStorage();
      console.log("✅ Profile saved!");
      setShowForm(false);
    }
  };

  const pickImage = async () => {
    setPickerModal(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setFilteredUri(result.assets[0].uri);
      setFilterModal(true);
    }
  };

  const openCamera = async () => {
    setPickerModal(false);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setFilteredUri(result.assets[0].uri);
      setFilterModal(true);
    }
  };

  const applyFilter = async (filter) => {
    if (!avatar) return;
    try {
      const result = await ImageManipulator.manipulateAsync(
        avatar,
        filter.actions,
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setFilteredUri(result.uri);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
        </View>

        {/* Profile Card */}
        <View style={[styles.card, { backgroundColor: colors.inputBg }]}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
              <Image
                source={
                  filteredUri
                    ? { uri: filteredUri }
                    : require("../../assets/images/avatar.jpeg")
                }
                style={styles.avatar}
              />
              <TouchableOpacity
                style={styles.editAvatarBtn}
                onPress={() => setPickerModal(true)}
              >
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={[styles.username, { color: colors.text }]}>
                {username || "Your Username"}
              </Text>
              <Text style={[styles.email, { color: colors.text }]}>
                {email || "your@email.com"}
              </Text>
              <Text style={[styles.genre, { color: colors.text }]}>
                {genre || "Favorite Genre"}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={[styles.editBtn, { backgroundColor: colors.primary }]}
          onPress={() => setShowForm((prev) => !prev)}
        >
          <Text style={styles.editBtnText}>
            {showForm ? "Close Edit" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

        {/* Form */}
        {showForm && (
          <View style={[styles.card, { backgroundColor: colors.inputBg }]}>
            <Text style={[styles.label, { color: colors.text }]}>Username</Text>
            <Animated.View style={usernameStyle}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.background, color: colors.text },
                ]}
                placeholder="Enter Username"
                placeholderTextColor="#777"
                value={username}
                onChangeText={(val) => {
                  setUsername(val);
                  validateField("username", val);
                }}
              />
            </Animated.View>
            {errors.username && (
              <Animated.Text entering={FadeIn} style={styles.error}>
                {errors.username}
              </Animated.Text>
            )}

            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <Animated.View style={emailStyle}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.background, color: colors.text },
                ]}
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
            {errors.email && (
              <Animated.Text entering={FadeIn} style={styles.error}>
                {errors.email}
              </Animated.Text>
            )}

            <Text style={[styles.label, { color: colors.text }]}>
              Favorite Genre
            </Text>
            <Animated.View style={genreStyle}>
              <View style={styles.genreRow}>
                {GENRES.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genreBtn,
                      genre === g && {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => {
                      setGenre(g);
                      validateField("genre", g);
                    }}
                  >
                    <Text
                      style={[
                        styles.genreText,
                        { color: genre === g ? "#fff" : colors.text },
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
            {errors.genre && (
              <Animated.Text entering={FadeIn} style={styles.error}>
                {errors.genre}
              </Animated.Text>
            )}

            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Theme Button */}
        <TouchableOpacity
          style={[styles.themeBtn, { borderColor: colors.primary }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeBtnText, { color: colors.primary }]}>
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Picker Modal */}
      <Modal visible={pickerModal} animationType="fade" transparent>
        <View style={styles.pickerModal}>
          <View style={styles.pickerBox}>
            <Text style={styles.pickerTitle}>Change Profile Picture</Text>
            <View style={styles.pickerRow}>
              <TouchableOpacity style={styles.pickerBtn} onPress={pickImage}>
                <Ionicons name="image" size={32} color="#fff" />
                <Text style={styles.pickerText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerBtn} onPress={openCamera}>
                <Ionicons name="camera" size={32} color="#fff" />
                <Text style={styles.pickerText}>Camera</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              onPress={() => setPickerModal(false)}
            >
              <Text style={styles.saveText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={filterModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          {filteredUri && (
            <Image source={{ uri: filteredUri }} style={styles.previewImg} />
          )}
          <Text style={styles.filterTitle}>Choose a Filter</Text>
          <FlatList
            horizontal
            data={FILTERS}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => applyFilter(item)}
              >
                <Text style={{ color: "#fff" }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: colors.primary }]}
            onPress={() => setFilterModal(false)}
          >
            <Text style={styles.saveText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingBottom: 16 },
  header: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: "700" },
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatarWrapper: { position: "relative" },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0008",
    padding: 6,
    borderRadius: 20,
  },
  username: { fontSize: 18, fontWeight: "700" },
  email: { fontSize: 14, opacity: 0.7 },
  genre: { fontSize: 14, marginTop: 4 },
  editBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  editBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12 },
  input: {
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    fontSize: 14,
  },
  error: { color: "red", fontSize: 12, marginTop: 4 },
  genreRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  genreBtn: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  genreText: { fontSize: 14 },
  saveBtn: {
    marginTop: 16,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
  },
  saveText: { color: "#fff", fontWeight: "600" },
  themeBtn: {
    marginTop: 20,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
  },
  themeBtnText: { fontSize: 16, fontWeight: "600" },
  pickerModal: {
    flex: 1,
    backgroundColor: "#0008",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerBox: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  pickerTitle: { color: "#fff", fontSize: 18, marginBottom: 16 },
  pickerRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  pickerBtn: { alignItems: "center", marginHorizontal: 16 },
  pickerText: { color: "#fff", marginTop: 6 },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000c",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#fff",
  },
  filterBtn: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 6,
  },
  previewImg: { width: 200, height: 200, borderRadius: 100, marginBottom: 20 },
});
