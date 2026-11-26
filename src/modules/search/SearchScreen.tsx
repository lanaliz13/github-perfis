import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import UserCard from "../../components/UserCard";
import { colors, radius, shadow } from "../../theme";
import { useSearchViewModel } from "./useSearchViewModel";

type Props = {
  onSelect: (login: string) => void;
};

function SearchIcon() {
  return (
    <View style={styles.icon}>
      <View style={styles.iconLens} />
      <View style={styles.iconHandle} />
    </View>
  );
}

export default function SearchScreen({ onSelect }: Props) {
  const { query, setQuery, results, loading, error, hasSearched, search } =
    useSearchViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EXPLORAR</Text>
        <Text style={styles.title}>Perfis do GitHub</Text>
        <Text style={styles.subtitle}>
          Encontre devs e veja os repositórios de cada um.
        </Text>
      </View>

      <View style={styles.searchBar}>
        <SearchIcon />
        <TextInput
          style={styles.input}
          placeholder="Digite um usuário"
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={search}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={search}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            //Questão 3
            <UserCard user={item} onPress={() => onSelect(item.login)} />
          )}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          // TODO Questão 09
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginTop: 8, marginBottom: 20 },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: 6,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 56,
    paddingLeft: 16,
    paddingRight: 8,
    marginBottom: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow,
  },
  input: { flex: 1, alignSelf: "stretch", fontSize: 16, color: colors.text },
  button: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.97 }],
  },
  buttonText: { color: colors.onPrimary, fontSize: 15, fontWeight: "700" },
  icon: { width: 18, height: 18 },
  iconLens: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.textMuted,
  },
  iconHandle: {
    position: "absolute",
    left: 12,
    top: 10,
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: colors.textMuted,
    transform: [{ rotate: "-45deg" }],
  },
  errorBox: {
    padding: 12,
    marginBottom: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    backgroundColor: colors.dangerSoft,
  },
  errorText: { color: colors.danger, fontSize: 14, fontWeight: "500" },
  loading: { marginTop: 40 },
  list: { paddingBottom: 32 },
});
