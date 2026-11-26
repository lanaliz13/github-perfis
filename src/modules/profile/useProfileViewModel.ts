import { useEffect, useState } from "react";
import {
  fetchProfile,
  fetchRepositories,
  type User,
  type Repository,
} from "../../api";

export function useProfileViewModel(login: string) {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    console.log("Carregando perfil de", login);
    setLoading(true);
    setError(null); 
    try {
      const [userData, reposData] = await Promise.all([ 
        fetchProfile(login),
        fetchRepositories(login),
      ]);
      setUser(userData);
      setRepos(reposData);
    } catch (e) {
      setError((e as Error).message);
    } finally { //5 
      setLoading(false);
    }
  }

  
  useEffect(() => {
    load();
   }, [login]); //Questão 4

  return { user, repos, loading, error };
}
