import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/Themecontext"; // ✅ theme hook

type Playlist = {
  id: string;
  title: string;
  owner: string;
  image: string;
};

const initialPlaylists: Playlist[] = [
  {
    id: "1",
    title: "Coding Beats",
    owner: "John Doe",
    image: "https://picsum.photos/seed/coding/200",
  },
  {
    id: "2",
    title: "Morning Vibes",
    owner: "Jane Smith",
    image: "https://picsum.photos/seed/morning/200",
  },
  {
    id: "3",
    title: "Focus Flow",
    owner: "LoFi Studio",
    image: "https://picsum.photos/seed/focus/200",
  },
  {
    id: "4",
    title: "Synth Nights",
    owner: "DJ Retro",
    image: "https://picsum.photos/seed/synth/200",
  },
];

export default function PlaylistScreen() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [newTitle, setNewTitle] = useState("");

  const { colors } = useTheme();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addPlaylist = () => {
    if (!newTitle.trim()) {
      Alert.alert("Please enter a playlist title");
      return;
    }

    const newPlaylist: Playlist = {
      id: generateId(),
      title: newTitle.trim(),
      owner: "Unknown Owner",
      image: `https://picsum.photos/seed/${encodeURIComponent(
        newTitle.trim()
      )}/200`,
    };

    setPlaylists((prev) => [newPlaylist, ...prev]);
    setNewTitle("");
  };

  const removePlaylist = (id: string) => {
    Alert.alert("Delete Playlist", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setPlaylists((prev) => prev.filter((pl) => pl.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Your Playlists
        </Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Add Playlist Input */}
      <View style={styles.addPlaylistContainer}>
        <Ionicons
          name="musical-notes"
          size={20}
          color={colors.primary}
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="New playlist title"
          placeholderTextColor={colors.text + "88"}
          style={[
            styles.input,
            { backgroundColor: colors.inputBg, color: colors.text },
          ]}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={addPlaylist}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={addPlaylist} style={styles.addIcon}>
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Playlist Grid */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", padding: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.playlistCard}
            onPress={() => router.push(`/playlists/[id]`)}
          >
            <Image source={{ uri: item.image }} style={styles.playlistImage} />
            <Text style={[styles.playlistTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.playlistOwner, { color: colors.text + "99" }]}>
              {item.owner}
            </Text>

            {/* Delete button overlay */}
            <TouchableOpacity
              onPress={() => removePlaylist(item.id)}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash" size={18} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Floating Add Button (Spotify-like) */}
      <TouchableOpacity
        onPress={addPlaylist}
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  addPlaylistContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  addIcon: {
    marginLeft: 8,
  },
  playlistCard: {
    width: "48%",
    marginBottom: 20,
    position: "relative",
  },
  playlistImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  playlistOwner: {
    fontSize: 12,
  },
  deleteBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 4,
    borderRadius: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    borderRadius: 30,
    padding: 14,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
