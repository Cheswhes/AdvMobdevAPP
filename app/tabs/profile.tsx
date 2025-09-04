import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const GRID_SIZE = (width - 24 * 2 - 12) / 2;

const playlists = [
  { id: "1", title: "Liked Songs", image: "https://picsum.photos/seed/liked/400" },
  { id: "2", title: "Coding Mix", image: "https://picsum.photos/seed/mix1/400" },
  { id: "3", title: "Late Night Vibes", image: "https://picsum.photos/seed/mix2/400" },
  { id: "4", title: "Workout Energy", image: "https://picsum.photos/seed/mix3/400" },
  { id: "5", title: "Focus Flow", image: "https://picsum.photos/seed/mix4/400" },
  { id: "6", title: "Throwback Jams", image: "https://picsum.photos/seed/mix5/400" },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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

        {/* User Info */}
        <View style={styles.userSection}>
          <Image
            source={{ uri: "https://picsum.photos/seed/userprofile/200" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Martin Pavz</Text>
          <Text style={styles.email}>Martin.pavz@example.com</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>999</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>67</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Playlists */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Playlists</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {playlists.map((p) => (
            <TouchableOpacity key={p.id} style={[styles.gridItem, { width: GRID_SIZE }]}>
              <Image source={{ uri: p.image }} style={styles.gridImage} />
              <Text numberOfLines={1} style={styles.gridTitle}>
                {p.title}
              </Text>
            </TouchableOpacity>
          ))}
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

  // User
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
  statsRow: {
    flexDirection: "row",
    gap: 40,
    marginTop: 16,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 13,
  },
  editBtn: {
    marginTop: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  editText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Section
  sectionHeader: {
    marginTop: 28,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionAction: {
    color: "#bbb",
    fontSize: 13,
    fontWeight: "600",
  },

  // Grid
  grid: {
    marginTop: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  gridItem: {
    borderRadius: 10,
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "#222",
    marginBottom: 8,
  },
  gridTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
