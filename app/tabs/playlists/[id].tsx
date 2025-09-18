import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();

  const [songs, setSongs] = useState<{ id: string; title: string; artist: string }[]>([]);

  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addSong = () => {
    if (!newTitle.trim() || !newArtist.trim()) {
      Alert.alert("Please enter both song title and artist");
      return;
    }

    const newSong = {
      id: generateId(),
      title: newTitle.trim(),
      artist: newArtist.trim(),
    };

    setSongs((prev) => [...prev, newSong]);
    setNewTitle("");
    setNewArtist("");
  };

  const removeSong = (id: string) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Songs {id}</Text>

      {/* Add new song inputs */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Song Title"
          placeholderTextColor="#666"
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          returnKeyType="next"
          onSubmitEditing={() => {}}
        />
        <TextInput
          placeholder="Artist"
          placeholderTextColor="#666"
          style={styles.input}
          value={newArtist}
          onChangeText={setNewArtist}
          returnKeyType="done"
          onSubmitEditing={addSong}
        />
        <TouchableOpacity onPress={addSong} style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color="#1db954" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
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
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No songs added yet.</Text>
        )}
      />
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
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 12,
    marginRight: 10,
  },
  addButton: {
    paddingVertical: 4,
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
  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
