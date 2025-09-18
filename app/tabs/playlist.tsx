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
    image: "https://picsum.photos/seed/coding/100",
  },
  {
    id: "2",
    title: "Morning Vibes",
    owner: "Jane Smith",
    image: "https://picsum.photos/seed/morning/100",
  },
  {
    id: "3",
    title: "Focus Flow",
    owner: "LoFi Studio",
    image: "https://picsum.photos/seed/focus/100",
  },
  {
    id: "4",
    title: "Synth Nights",
    owner: "DJ Retro",
    image: "https://picsum.photos/seed/synth/100",
  },
];

export default function PlaylistScreen() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [newTitle, setNewTitle] = useState("");

  // Generate a random ID (simple version)
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Add new playlist with default owner/image
  const addPlaylist = () => {
    if (!newTitle.trim()) {
      Alert.alert("Please enter a playlist title");
      return;
    }

    const newPlaylist: Playlist = {
      id: generateId(),
      title: newTitle.trim(),
      owner: "Unknown Owner",
      image: `https://picsum.photos/seed/${encodeURIComponent(newTitle.trim())}/100`,
    };

    setPlaylists((prev) => [newPlaylist, ...prev]);
    setNewTitle("");
  };

  // Remove playlist by id
  const removePlaylist = (id: string) => {
    Alert.alert(
      "Delete Playlist",
      "Are you sure you want to delete this playlist?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPlaylists((prev) => prev.filter((pl) => pl.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Playlists</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Add Playlist Input and Button */}
      <View style={styles.addPlaylistContainer}>
        <TextInput
          placeholder="New playlist title"
          placeholderTextColor="#666"
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={addPlaylist}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={addPlaylist} style={styles.addPlaylistButton}>
          <Ionicons name="add-circle" size={32} color="#1db954" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <View style={styles.playlistRow}>
            <TouchableOpacity
              style={styles.playlistInfo}
              onPress={() => router.push(`/playlists/[id]`)} // adjust path if needed
            >
              <Image source={{ uri: item.image }} style={styles.playlistImage} />
              <View style={styles.playlistTextContainer}>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.playlistOwner}>By {item.owner}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removePlaylist(item.id)} style={styles.removeButton}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0e0f13",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  addPlaylistContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 12,
  },
  addPlaylistButton: {
    marginLeft: 12,
  },
  playlistRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playlistInfo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  playlistImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 16,
  },
  playlistTextContainer: {
    flex: 1,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  playlistOwner: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
  removeButton: {
    paddingLeft: 12,
  },
});
