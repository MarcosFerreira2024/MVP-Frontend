import { useUser } from "../context/UserContext";

export function useAuthorization() {
  const { user, isAdmin, isAuthenticated, loading } = useUser();

  const canDeleteRating = (ratingOwnerId: string) => {
    if (loading) return false;
    return isAdmin || (isAuthenticated && user?.id === ratingOwnerId);
  };

  const isOwner = (ratingOwnerId: string) => {
    if (loading || !user) return false;
    return user.id === ratingOwnerId;
  };

  return { user, isAdmin, isAuthenticated, loading, canDeleteRating, isOwner };
}
