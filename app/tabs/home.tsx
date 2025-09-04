import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Playlist = {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
};

const recentlyPlayed: Playlist[] = [
  { id: "rp1", title: "Coding Beats", image: "https://picsum.photos/seed/rp1/200" },
  { id: "rp2", title: "Chillhop", image: "https://picsum.photos/seed/rp2/200" },
  { id: "rp3", title: "Daily Mix 1", image: "https://picsum.photos/seed/rp3/200" },
  { id: "rp4", title: "Top Hits", image: "https://picsum.photos/seed/rp4/200" },
  { id: "rp5", title: "Focus Flow", image: "https://picsum.photos/seed/rp5/200" },
];

const madeForYou: Playlist[] = [
  { id: "mf1", title: "Daily Mix 2", subtitle: "Lo-fi, Indie, Alt", image: "https://picsum.photos/seed/mf1/400" },
  { id: "mf2", title: "Daily Mix 3", subtitle: "Hip-hop, R&B", image: "https://picsum.photos/seed/mf2/400" },
  { id: "mf3", title: "Daily Mix 4", subtitle: "House, EDM", image: "https://picsum.photos/seed/mf3/400" },
];

const yourPlaylists: Playlist[] = [
  { id: "pl1", title: "Morning Coffee", image: "https://picsum.photos/seed/pl1/300" },
  { id: "pl2", title: "Workout Pump", image: "https://picsum.photos/seed/pl2/300" },
  { id: "pl3", title: "Late Night Drive", image: "https://picsum.photos/seed/pl3/300" },
  { id: "pl4", title: "Study Mode", image: "https://picsum.photos/seed/pl4/300" },
  { id: "pl5", title: "Throwback Vibes", image: "https://picsum.photos/seed/pl5/300" },
  { id: "pl6", title: "Jazz Essentials", image: "https://picsum.photos/seed/pl6/300" },
];

const { width } = Dimensions.get("window");
const CARD_W = Math.min(280, Math.round(width * 0.72));
const GRID_SIZE = (width - 24 * 2 - 12) / 2; // padding 24 left/right, gap 12

export default function HomeScreen() {
  const renderSectionHeader = (title: string, action?: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Image
            source={{ uri: "https://picsum.photos/seed/user/80" }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Good afternoon</Text>
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="time-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color="#aaa" style={{ marginHorizontal: 8 }} />
          <TextInput
            placeholder="What do you want to listen to?"
            placeholderTextColor="#aaa"
            style={styles.search}
          />
        </View>

        {/* Recently Played */}
        {renderSectionHeader("Recently played")}
        <FlatList
          horizontal
          data={recentlyPlayed}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recentCard} onPress={() => {}}>
              <Image source={{ uri: item.image }} style={styles.recentImage} />
              <Text numberOfLines={1} style={styles.recentTitle}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Made for You */}
        {renderSectionHeader("Made for you", "See all")}
        <FlatList
          horizontal
          data={madeForYou}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.madeCard, { width: CARD_W }]} onPress={() => {}}>
              <Image source={{ uri: item.image }} style={styles.madeImage} />
              <View style={styles.madeMeta}>
                <Text numberOfLines={1} style={styles.madeTitle}>{item.title}</Text>
                {!!item.subtitle && (
                  <Text numberOfLines={1} style={styles.madeSubtitle}>{item.subtitle}</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Your Playlists */}
        {renderSectionHeader("Your playlists")}
        <View style={styles.grid}>
          {yourPlaylists.map((p) => (
            <TouchableOpacity key={p.id} style={[styles.gridItem, { width: GRID_SIZE }]} onPress={() => {}}>
              <Image source={{ uri: p.image }} style={styles.gridImage} />
              <Text numberOfLines={1} style={styles.gridTitle}>{p.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
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
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  greeting: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  topIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  searchWrap: {
    marginTop: 12,
    marginBottom: 8,
    marginHorizontal: 24,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.09)",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    paddingRight: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
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

  // Recently played
  recentCard: {
    width: 110,
  },
  recentImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#222",
  },
  recentTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  // Made for you
  madeCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#16181d",
  },
  madeImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#222",
  },
  madeMeta: {
    padding: 12,
    gap: 4,
  },
  madeTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  madeSubtitle: {
    color: "#bbb",
    fontSize: 12,
  },

  // Grid
  grid: {
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
