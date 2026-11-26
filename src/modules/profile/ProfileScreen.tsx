import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { formatNumber } from "../../utils";
import RepoItem from "../../components/RepoItem";
import { colors, radius, shadow } from "../../theme";
import { useProfileViewModel } from "./useProfileViewModel";

type Props = {
  login: string;
  onBack: () => void;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function BackButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.backButton,
        style,
        pressed && styles.backButtonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.backText}>{label}</Text>
    </Pressable>
  );
}

export default function ProfileScreen({ login, onBack }: Props) {
  const { user, repos, loading, error } = useProfileViewModel(login);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.center}>
        <View style={styles.errorIcon}>
          <Text style={styles.errorIconText}>!</Text>
        </View>
        <Text style={styles.error}>{error}</Text>
        <BackButton label="← Voltar para a busca" onPress={onBack} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton label="← Voltar" onPress={onBack} style={styles.backTop} />

      <FlatList
        data={repos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <RepoItem repo={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.profileCard}>
              <View style={styles.banner}>
                <View style={[styles.bubble, styles.bubbleLarge]} />
                <View style={[styles.bubble, styles.bubbleSmall]} />
              </View>

              <View style={styles.profileBody}>
                <Image
                  source={{ uri: user.avatar_url }}
                  style={styles.avatar}
                />
                <Text style={styles.name}>{user.name ?? user.login}</Text>
                <Text style={styles.login}>@{user.login}</Text>
                {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
                {user.location ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>📍 {user.location}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.stats}>
                <Stat label="Seguidores" value={formatNumber(user.followers)} />
                <View style={styles.statDivider} />
                <Stat label="Seguindo" value={formatNumber(user.following)} />
                <View style={styles.statDivider} />
                <Stat
                  label="Repositórios"
                  value={formatNumber(user.public_repos)}
                />
              </View>
            </View>

            {/* TODO Questão 10 */}

            <Text style={styles.section}>Repositórios</Text>
            //Questão 6
            {repos.length > 0 ? (
              <Text style={styles.muted}>
                {repos.length} repositório(s), do mais estrelado ao menos
                 estrelado
               </Text>
            ) : (
              <Text style={styles.muted}>Nenhum repositório público.</Text>
            )}
              
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 24,
  },
  loadingText: { color: colors.textSecondary, fontSize: 15 },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dangerSoft,
  },
  errorIconText: { color: colors.danger, fontSize: 30, fontWeight: "800" },
  error: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  backButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  backButtonPressed: { backgroundColor: colors.primarySoft },
  backTop: { alignSelf: "flex-start", marginBottom: 16 },
  backText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
  list: { paddingBottom: 32 },
  profileCard: {
    marginBottom: 24,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow,
  },
  banner: {
    height: 96,
    overflow: "hidden",
    borderTopLeftRadius: radius.xl - 1,
    borderTopRightRadius: radius.xl - 1,
    backgroundColor: colors.primary,
  },
  bubble: {
    position: "absolute",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  bubbleLarge: { width: 180, height: 180, top: -80, right: -40 },
  bubbleSmall: { width: 96, height: 96, bottom: -48, left: 28 },
  profileBody: {
    alignItems: "center",
    marginTop: -48,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.surface,
    backgroundColor: colors.border,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  login: { fontSize: 15, color: colors.textMuted, marginTop: 2 },
  bio: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 12,
  },
  chip: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  chipText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  stats: {
    flexDirection: "row",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, backgroundColor: colors.border },
  statValue: { fontSize: 20, fontWeight: "800", color: colors.text },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 2,
  },
  section: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  muted: { color: colors.textMuted, fontSize: 14, marginBottom: 12 },
});
