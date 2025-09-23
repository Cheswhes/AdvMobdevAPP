import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SettingItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  action?: () => void;
};

const accountSettings: SettingItem[] = [
  { id: "1", title: "Account", icon: "person-outline" },
  { id: "2", title: "Playback", icon: "play-circle-outline" },
  { id: "3", title: "Notifications", icon: "notifications-outline" },
];

const appSettings: SettingItem[] = [
  { id: "4", title: "Theme", icon: "moon-outline" },
  { id: "5", title: "Language", icon: "globe-outline" },
  { id: "6", title: "About", icon: "information-circle-outline" },
];

export default function SettingsScreen() {
  const renderSection = (title: string, items: SettingItem[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={item.action || (() => {})}
        >
          <Ionicons name={item.icon} size={22} color="#fff" style={{ marginRight: 16 }} />
          <Text style={styles.itemText}>{item.title}</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#777"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} /> {/* spacer */}
        </View>

        {/* Profile summary */}
        <View style={styles.profile}>
          <Image
            source={{ uri: "https://picsum.photos/seed/settingsuser/200" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
        </View>

        {renderSection("Account", accountSettings)}
        {renderSection("App", appSettings)}

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

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
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  email: {
    color: "#aaa",
    fontSize: 13,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 12,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "rgba(255,255,255,0.08)",
    borderBottomWidth: 1,
  },
  itemText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#d62828",
  },
  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
