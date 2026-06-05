import { useState } from "react";
import { Book, SurveyState, ReadingProfile } from "./types";
import Screen1Welcome from "./components/Screen1Welcome";
import Screen2DnaCollection from "./components/Screen2DnaCollection";
import Screen3Loading from "./components/Screen3Loading";
import Screen4DnaResults from "./components/Screen4DnaResults";
import Screen5Recommendations from "./components/Screen5Recommendations";
import Screen6WanderTheStacks from "./components/Screen6WanderTheStacks";
import Screen7MyBookshelf from "./components/Screen7MyBookshelf";
import HeaderMenu from "./components/HeaderMenu";
import BookMentor from "./components/BookMentor";
import { calculateFallbackProfile } from "./data/fallbackDNA";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [surveyData, setSurveyData] = useState<SurveyState | null>(null);
  const [readingProfile, setReadingProfile] = useState<ReadingProfile | null>(null);

  // Initialize library volumes with local cache support, starting with 6 gorgeous default selections
  const [libraryBooks, setLibraryBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem("bookmarkd_library");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        title: "Quiet",
        author: "Susan Cain",
        category: "Psychology",
        description: "A beautiful, research-backed defense of introversion in a high-stimulus society that can never seem to stop speaking.",
        coverColor: "#4B564F",
        coverTextColor: "#FBF7F0",
        isbn: "0241145897"
      },
      {
        title: "Stolen Focus",
        author: "Johann Hari",
        category: "Psychology",
        description: "Johann Hari investigates the alarming cognitive crisis of our declining attention spans, proving focus hasn't just been lost—it was stolen.",
        coverColor: "#45314D",
        coverTextColor: "#F8F6F1",
        isbn: "1526620216"
      },
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "Decision Making",
        description: "Daniel Kahneman's seminal masterwork maps the twin cognitive systems (System 1 and System 2) that govern judgment and choice.",
        coverColor: "#3F2E2E",
        coverTextColor: "#FAF6F0",
        isbn: "0374275632"
      },
      {
        title: "Flow",
        author: "Mihaly Csikszentmihalyi",
        category: "Psychology",
        description: "The classic study of optimal experience, mapping how total absorption in a challenging task triggers high fulfillment.",
        coverColor: "#2A3A40",
        coverTextColor: "#EAE6DF",
        isbn: "0061339202"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Improvement",
        description: "James Clear designs a gorgeous system demonstrating how small behavior revisions compound into immense life outcomes.",
        coverColor: "#2C3E35",
        coverTextColor: "#F1EFEA",
        isbn: "0735211299"
      },
      {
        title: "Blink",
        author: "Malcolm Gladwell",
        category: "Decision Making",
        description: "Malcolm Gladwell investigates the power of the subconscious mind to execute split-second, highly intuitive selections.",
        coverColor: "#1F3B2E",
        coverTextColor: "#F6F3EB",
        isbn: "0316010669"
      }
    ];
  });

  const toggleBookLibrary = (book: Book) => {
    setLibraryBooks((prev) => {
      const exists = prev.some((b) => b.title.toLowerCase() === book.title.toLowerCase());
      let updated;
      if (exists) {
        updated = prev.filter((b) => b.title.toLowerCase() !== book.title.toLowerCase());
      } else {
        updated = [...prev, book];
      }
      localStorage.setItem("bookmarkd_library", JSON.stringify(updated));
      return updated;
    });
  };

  // Restart the process entirely
  const handleReset = () => {
    setSurveyData(null);
    setReadingProfile(null);
    setActiveScreen(2);
  };

  // When Screen 2 Conversational form is completed
  const handleSurveySubmit = async (formData: SurveyState) => {
    setSurveyData(formData);
    // Transition straight into the cinematic loading Screen 3
    setActiveScreen(3);

    // Call back-end server endpoint in background to run custom Gemini analysis
    try {
      const response = await fetch("/api/reading-dna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to compile Profile");
      }

      const result = await response.json();
      setReadingProfile(result);
    } catch (e) {
      console.error("Failed to generate custom Reading DNA from backend. Fetching offline failsafe coordinates:", e);
      // Perfect client-side calculation fallback for static hosting/Netlify environments:
      const calculatedProfile = calculateFallbackProfile(
        formData.lovedBook,
        formData.genrePreference,
        formData.readingStyle,
        formData.goal
      );
      setReadingProfile(calculatedProfile);
    }
  };

  // Transition to results screen once the 5s loading concludes
  const handleLoadingFinished = () => {
    setActiveScreen(4);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen flex flex-col">
      {activeScreen !== 3 && (
        <HeaderMenu
          activeScreen={activeScreen}
          onHome={() => setActiveScreen(1)}
          onBegin={handleReset}
        />
      )}
      
      <div className="flex-1">
        {activeScreen === 1 && (
          <Screen1Welcome
            onBegin={() => setActiveScreen(2)}
            onExploreStacks={() => setActiveScreen(6)}
            libraryBooks={libraryBooks}
            onOpenFullBookshelf={() => setActiveScreen(7)}
            onRemoveFromLibrary={toggleBookLibrary}
          />
        )}

      {activeScreen === 2 && (
        <Screen2DnaCollection
          onSubmit={handleSurveySubmit}
          onBack={() => setActiveScreen(1)}
        />
      )}

      {activeScreen === 3 && (
        <Screen3Loading
          lovedBook={surveyData?.lovedBook || "Selected Volume"}
          onFinished={handleLoadingFinished}
        />
      )}

      {activeScreen === 4 && (
        <Screen4DnaResults
          archetype={readingProfile?.archetype || "GROWTH ARCHITECT"}
          traits={readingProfile?.traits || ["GROWTH ORIENTED", "PRACTICAL BUILDER", "STRATEGIC EYE"]}
          readingPace={readingProfile?.reading_pace ? `${readingProfile.reading_pace} Pace` : "Fast Pace"}
          genreBias={readingProfile?.genre_bias || "Non-Fiction"}
          summary={readingProfile?.summary || "You build structural models for executing changes."}
          insight={readingProfile?.insight || "We noticed you gravitate toward actionable work."}
          onContinue={() => setActiveScreen(5)}
          onHome={() => setActiveScreen(1)}
        />
      )}

      {activeScreen === 5 && (
        <Screen5Recommendations
          archetype={readingProfile?.archetype || "GROWTH ARCHITECT"}
          recommendations={readingProfile?.recommendations || []}
          onWander={() => setActiveScreen(6)}
          onReset={handleReset}
          onHome={() => setActiveScreen(1)}
          libraryBooks={libraryBooks}
          onToggleLibrary={toggleBookLibrary}
        />
      )}

      {activeScreen === 6 && (
        <Screen6WanderTheStacks
          onBackToResults={readingProfile ? () => setActiveScreen(5) : undefined}
          hasProfile={!!readingProfile}
          onHome={() => setActiveScreen(1)}
          libraryBooks={libraryBooks}
          onToggleLibrary={toggleBookLibrary}
        />
      )}

      {activeScreen === 7 && (
        <Screen7MyBookshelf
          libraryBooks={libraryBooks}
          onRemoveBook={toggleBookLibrary}
          onHome={() => setActiveScreen(1)}
          onExplore={() => setActiveScreen(6)}
        />
      )}
      </div>
      <BookMentor />
    </div>
  );
}
