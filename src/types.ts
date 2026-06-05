export interface Book {
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage?: string;
  coverColor?: string; // Hex color for CSS cover designs
  coverTextColor?: string;
  amazonUrl?: string;
  isbn?: string;
}

export interface SurveyState {
  lovedBook: string;
  hatedBook: string;
  genrePreference: "Fiction" | "Non-Fiction" | "Both" | "";
  readingStyle: "Fast and engaging" | "Deep and thoughtful" | "";
  goal: "Entertainment" | "Learning" | "Both" | "";
}

export interface Recommendation {
  title: string;
  author: string;
  subtitle?: string;
  whyThisBook: string;
  whyNow: string;
  problemItSolves: string;
  purchaseUrl: string;
  coverColor?: string;
  coverTextColor?: string;
  coverStyle?: string;
  coverImage?: string;
  isbn?: string;
}

export interface ReadingProfile {
  archetype: string;
  traits: string[];
  reading_pace: "Slow" | "Medium" | "Fast";
  genre_bias: string;
  summary: string;
  insight: string;
  recommendations: Recommendation[];
}

export interface CuratedShelf {
  name: string;
  description: string;
  books: Book[];
}
