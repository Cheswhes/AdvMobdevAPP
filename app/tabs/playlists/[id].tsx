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
import { useTheme } from "@/context/Themecontext"; // ✅ import theme hook

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme(); // ✅ get theme

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

  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0e0f13" : "#f9f9f9" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDark ? "#fff" : "#111" },
        ]}
      >
        Songs {id}
      </Text>

      {/* Add new song inputs */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Song Title"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
              color: isDark ? "#fff" : "#111",
            },
          ]}
          value={newTitle}
          onChangeText={setNewTitle}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Artist"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
              color: isDark ? "#fff" : "#111",
            },
          ]}
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
              <Text
                style={[
                  styles.songTitle,
                  { color: isDark ? "#fff" : "#111" },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.songArtist,
                  { color: isDark ? "#aaa" : "#555" },
                ]}
              >
                {item.artist}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeSong(item.id)}>
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text
            style={[
              styles.emptyText,
              { color: isDark ? "#777" : "#888" },
            ]}
          >
            No songs added yet.
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
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
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: "600",
  },
  songArtist: {
    fontSize: 13,
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
