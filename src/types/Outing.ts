interface City {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Location {
  id: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  city: City;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Trail {
  id: string;
  difficulty: string;
  duration: number;
  distance: number;
  roundTrip: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Photo {
  id: string;
  alt: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface OpenHour {
  id: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  outingId: string;
  createdAt: string;
  updatedAt: string;
}

interface Park {
  id: string;
  name: string;
  // Add other properties of Park if known
}

interface Event {
  id: string;
  name: string;
  // Add other properties of Event if known
}

export interface User {
  avatarUrl: string | null;
  email: string;
  name: string;
}

export interface Rating {
  id: string;
  comment: string;
  rating: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export type OutingResponse = {
  id: string;
  title: string;
  content: string;
  price: number;
  slug: string;
  public: string;
  createdAt: string;
  updatedAt: string;
  trail: Trail | null;
  park: Park | null;
  events: Event[];
  photos: Photo[];
  openHours: OpenHour[];
  ratings: Rating[];
  location: Location;
  category: Category;
};