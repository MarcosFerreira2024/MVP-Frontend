import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import type { User } from "../types/User";
import toast from "react-hot-toast";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = Cookies.get("token");

    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3333/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        Cookies.remove("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      Cookies.remove("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (token: string) => {
    Cookies.set("token", token, { expires: 7 });
    await fetchUser();
  };

  const logout = () => {
    Cookies.remove("token");
    toast.success("Logout realizado com sucesso");
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  if (user) {
    user.userPhoto =
      user.userPhoto ?? `/avatars/${Math.floor(Math.random() * 9) + 1}.png`;
  }

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, isAdmin, loading, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
