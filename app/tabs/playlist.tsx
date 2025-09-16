import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Playlist = {
  id: string;
  title: string;
  owner: string;
  image: string;
};

const playlists: Playlist[] = [
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Playlists</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.playlistRow}
            onPress={() => router.push(`/tabs/${item.id}`)} // Adjust route to your file location
          >
            <Image source={{ uri: item.image }} style={styles.playlistImage} />
            <View style={styles.playlistTextContainer}>
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistOwner}>By {item.owner}</Text>
            </View>
          </TouchableOpacity>
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
  playlistRow: {
    flexDirection: "row",
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
});
