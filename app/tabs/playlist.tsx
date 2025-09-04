import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
};

const tracks: Track[] = [
  { id: "1", title: "Intro - Chill Vibes", artist: "DJ LoFi", duration: "2:35" },
  { id: "2", title: "Coding Mode", artist: "Beat Lab", duration: "3:42" },
  { id: "3", title: "Focus Flow", artist: "Chillhop", duration: "4:11" },
  { id: "4", title: "Night Drive", artist: "Synthwave X", duration: "5:03" },
  { id: "5", title: "Coffee Beats", artist: "Morning Mix", duration: "3:18" },
];

export default function PlaylistScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Playlist</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Playlist Cover */}
        <View style={styles.coverSection}>
          <Image
            source={{ uri: "https://picsum.photos/seed/playlistcover/500" }}
            style={styles.coverImage}
          />
          <Text style={styles.playlistTitle}>Coding Beats</Text>
          <Text style={styles.playlistMeta}>Created by John Doe • 50 songs</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={[styles.playBtn, { backgroundColor: "#1db954" }]}>
            <Ionicons name="play" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.playBtn, { backgroundColor: "#333" }]}>
            <Ionicons name="shuffle" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Track List */}
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.trackRow}>
              <Text style={styles.trackIndex}>{index + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist}</Text>
              </View>
              <Text style={styles.trackDuration}>{item.duration}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0e0f13",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  coverSection: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  coverImage: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  playlistMeta: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  playBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  trackRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  trackIndex: {
    color: "#bbb",
    width: 28,
    textAlign: "center",
  },
  trackTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  trackArtist: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  trackDuration: {
    color: "#bbb",
    fontSize: 13,
    marginLeft: 8,
  },
});
