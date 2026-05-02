/**
 * Sakinah Islamic Super App — React Native (Mobile)
 *
 * Features:
 * - Quran, Prayer Times, Qibla, Hadith, Adhkar & more
 * - Sakinah design system
 *
 * Setup:
 *   1. npm install
 *   2. npx react-native run-android (or run-ios)
 */

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";

interface Surah {
  number: number;
  name: string;
  name_en: string;
  verses: number;
  revelation_type: string;
}

const SAMPLE_SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", name_en: "Al-Fatihah", verses: 7, revelation_type: "Meccan" },
  { number: 2, name: "البقرة", name_en: "Al-Baqarah", verses: 286, revelation_type: "Medinan" },
  { number: 3, name: "آل عمران", name_en: "Aal-e-Imran", verses: 200, revelation_type: "Medinan" },
  { number: 36, name: "يس", name_en: "Ya-Sin", verses: 83, revelation_type: "Meccan" },
  { number: 55, name: "الرحمن", name_en: "Ar-Rahman", verses: 78, revelation_type: "Medinan" },
  { number: 67, name: "الملك", name_en: "Al-Mulk", verses: 30, revelation_type: "Meccan" },
  { number: 112, name: "الإخلاص", name_en: "Al-Ikhlas", verses: 4, revelation_type: "Meccan" },
  { number: 114, name: "الناس", name_en: "An-Nas", verses: 6, revelation_type: "Meccan" },
];

// Sakinah color palette
const colors = {
  light: {
    primary: "#00261a",
    primaryContainer: "#0f3d2e",
    onPrimaryContainer: "#7ba894",
    primaryFixed: "#beedd7",
    secondary: "#745b04",
    secondaryContainer: "#ffdc7e",
    surface: "#f9faf7",
    surfaceContainerLow: "#f3f4f1",
    surfaceContainer: "#edeeeb",
    onSurface: "#1a1c1b",
    onSurfaceVariant: "#414944",
    outline: "#717974",
  },
  dark: {
    primary: "#beedd7",
    primaryContainer: "#7ba894",
    onPrimaryContainer: "#00261a",
    primaryFixed: "#0f3d2e",
    secondary: "#ffe08d",
    secondaryContainer: "#745b04",
    surface: "#00261a",
    surfaceContainerLow: "#153a2f",
    surfaceContainer: "#0f3d2e",
    onSurface: "#f0f1ee",
    onSurfaceVariant: "#c0c8c3",
    outline: "#717974",
  },
};

type NavItem = "home" | "quran" | "prayer" | "qibla" | "search";

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const [activeNav, setActiveNav] = useState<NavItem>("home");

  const renderSurah = ({ item }: { item: Surah }) => (
    <TouchableOpacity
      style={[styles.surahCard, { backgroundColor: "#fff" }]}
      activeOpacity={0.7}
    >
      <View style={[styles.surahNumber, { backgroundColor: theme.surfaceContainerLow }]}>
        <Text style={[styles.surahNumberText, { color: theme.primaryContainer }]}>
          {item.number}
        </Text>
      </View>
      <View style={styles.surahInfo}>
        <View style={styles.surahNameRow}>
          <Text style={[styles.surahNameEn, { color: theme.primaryContainer }]}>
            {item.name_en}
          </Text>
          <Text style={[styles.surahNameAr, { color: theme.primaryContainer }]}>
            {item.name}
          </Text>
        </View>
        <Text style={[styles.surahMeta, { color: theme.onSurfaceVariant }]}>
          {item.verses} verses · {item.revelation_type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.surface}
      />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.primaryContainer }]}>
          Sakinah
        </Text>
      </View>

      {/* Main content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeNav === "home" && (
          <>
            {/* Greeting */}
            <View style={styles.greeting}>
              <Text style={[styles.greetingText, { color: theme.onSurface }]}>
                As-salamu alaykum
              </Text>
              <Text style={[styles.dateText, { color: theme.onSurfaceVariant }]}>
                Loading date...
              </Text>
            </View>

            {/* Prayer hero card */}
            <View
              style={[
                styles.prayerCard,
                { backgroundColor: theme.primaryContainer },
              ]}
            >
              <Text style={[styles.prayerLabel, { color: theme.primaryFixed }]}>
                Next Prayer
              </Text>
              <Text style={[styles.prayerName, { color: "#fff" }]}>Dhuhr</Text>
              <Text style={[styles.prayerAr, { color: "rgba(255,255,255,0.8)" }]}>
                الظهر
              </Text>
              <Text style={[styles.countdown, { color: "#fff" }]}>00:00:00</Text>
            </View>

            {/* Quick actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.quickAction, { backgroundColor: theme.primaryFixed }]}
                onPress={() => setActiveNav("quran")}
              >
                <Text style={[styles.quickIcon, { color: theme.primaryContainer }]}>📖</Text>
                <Text style={[styles.quickLabelSmall, { color: theme.primaryContainer }]}>
                  Quran
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickAction, { backgroundColor: theme.secondaryContainer }]}
                onPress={() => setActiveNav("prayer")}
              >
                <Text style={[styles.quickIcon, { color: theme.secondary }]}>🕐</Text>
                <Text style={[styles.quickLabelSmall, { color: theme.secondary }]}>
                  Prayer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.primaryFixed }]}>
                <Text style={[styles.quickIcon, { color: theme.primaryContainer }]}>📚</Text>
                <Text style={[styles.quickLabelSmall, { color: theme.primaryContainer }]}>
                  Hadith
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.secondaryContainer }]}>
                <Text style={[styles.quickIcon, { color: theme.secondary }]}>✨</Text>
                <Text style={[styles.quickLabelSmall, { color: theme.secondary }]}>Adhkar</Text>
              </TouchableOpacity>
            </View>

            {/* Surah list */}
            <Text style={[styles.sectionTitle, { color: theme.onSurface }]}>Browse Quran</Text>
            <FlatList
              data={SAMPLE_SURAHS}
              keyExtractor={(item) => String(item.number)}
              renderItem={renderSurah}
              scrollEnabled={false}
            />
          </>
        )}

        {activeNav === "quran" && (
          <View style={styles.centerContent}>
            <Text style={[styles.centerTitle, { color: theme.onSurface }]}>Quran</Text>
            <FlatList
              data={SAMPLE_SURAHS}
              keyExtractor={(item) => String(item.number)}
              renderItem={renderSurah}
            />
          </View>
        )}

        {activeNav === "prayer" && (
          <View style={styles.centerContent}>
            <Text style={[styles.centerTitle, { color: theme.onSurface }]}>Prayer Times</Text>
            <Text style={[styles.subtitle, { color: theme.onSurfaceVariant }]}>
              Loading location...
            </Text>
          </View>
        )}

        {activeNav === "search" && (
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchInput,
                { backgroundColor: theme.surfaceContainerLow, color: theme.onSurface },
              ]}
              placeholder="Search Quran, Hadith..."
              placeholderTextColor={theme.outline}
            />
          </View>
        )}
      </ScrollView>

      {/* Bottom nav */}
      <View style={[styles.bottomNav, { backgroundColor: theme.surface }]}>
        {(["home", "quran", "prayer", "qibla", "search"] as NavItem[]).map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.navButton}
            onPress={() => setActiveNav(item)}
          >
            <Text
              style={[
                styles.navIcon,
                { color: activeNav === item ? theme.primaryContainer : theme.outline },
              ]}
            >
              {item === "home" ? "🏠" : item === "quran" ? "📖" : item === "prayer" ? "🕐" : item === "qibla" ? "🧭" : "🔍"}
            </Text>
            <Text
              style={[
                styles.navLabel,
                { color: activeNav === item ? theme.primaryContainer : theme.outline },
              ]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Georgia",
  },
  content: { flex: 1, paddingHorizontal: 16 },
  greeting: { marginTop: 20, marginBottom: 16 },
  greetingText: { fontSize: 24, fontWeight: "600" },
  dateText: { fontSize: 14, marginTop: 4 },
  prayerCard: {
    borderRadius: 20,
    padding: 20,
    minHeight: 160,
    justifyContent: "center",
    marginBottom: 16,
  },
  prayerLabel: { fontSize: 12, fontWeight: "600", textTransform: "uppercase" },
  prayerName: { fontSize: 32, fontWeight: "bold", marginTop: 4 },
  prayerAr: { fontSize: 18 },
  countdown: { fontSize: 36, fontWeight: "bold", marginTop: 8 },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  quickAction: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quickIcon: { fontSize: 24 },
  quickLabelSmall: { fontSize: 10, marginTop: 4, fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  surahCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  surahNumberText: { fontWeight: "bold", fontSize: 14 },
  surahInfo: { flex: 1 },
  surahNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surahNameEn: { fontSize: 16, fontWeight: "600" },
  surahNameAr: { fontSize: 18 },
  surahMeta: { fontSize: 12, marginTop: 4 },
  centerContent: { marginTop: 20 },
  centerTitle: { fontSize: 24, fontWeight: "600", marginBottom: 16 },
  subtitle: { fontSize: 14 },
  searchContainer: { marginTop: 20 },
  searchInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  navButton: { alignItems: "center" },
  navIcon: { fontSize: 24 },
  navLabel: { fontSize: 10, marginTop: 2, fontWeight: "600" },
});
