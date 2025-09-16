import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock database of songs
const allSongs = [
  { id: "1", title: "Chill Mode", artist: "LoFi DJ" },
  { id: "2", title: "Focus Flow", artist: "Chillhop" },
  { id: "3", title: "Coding Vibes", artist: "SynthwaveX" },
  { id: "4", title: "Morning Boost", artist: "LoFi Chill" },
];

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams(); // gets playlist ID from URL
  const [songs, setSongs] = useState(allSongs.slice(0, 2)); // initial songs

  const addSong = () => {
    const remaining = allSongs.filter((s) => !songs.find((item) => item.id === s.id));
    if (remaining.length === 0) {
      Alert.alert("No more songs to add");
      return;
    }
    setSongs([...songs, remaining[0]]);
  };

  const removeSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlist {id}</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View style={styles.songRow}>
            <View>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
            <TouchableOpacity onPress={() => removeSong(item.id)}>
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={addSong}>
        <Ionicons name="add-circle" size={26} color="#fff" />
        <Text style={styles.addText}>Add Song</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0f13",
    flex: 1,
    paddingTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  songRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  songArtist: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    marginTop: 30,
    backgroundColor: "#1db954",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
