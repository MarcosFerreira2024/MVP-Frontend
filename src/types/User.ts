export type User = {
  id: string;
  name: string;
  email: string;
  userPhoto?: string;
  ratings: {
    id: string;
    outingId: string;
    content?: string;
    rating: number;
  };
  role: "USER" | "ADMIN";
};
