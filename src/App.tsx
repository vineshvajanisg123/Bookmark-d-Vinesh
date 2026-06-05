import { useState } from "react";
import { Book, SurveyState, ReadingProfile } from "./types";
import Screen1Welcome from "./components/Screen1Welcome";
import Screen2DnaCollection from "./components/Screen2DnaCollection";
import Screen3Loading from "./components/Screen3Loading";
import Screen4DnaResults from "./components/Screen4DnaResults";
import Screen5Recommendations from "./components/Screen5Recommendations";
import Screen6WanderTheStacks from "./components/Screen6WanderTheStacks";
import Screen7MyLibrary from "./components/Screen7MyLibrary";
import HeaderMenu from "./components/HeaderMenu";
import BookMentor from "./components/BookMentor";

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
      // Failsafe backup is also handled perfectly inside server.ts, but in case of connection drop:
      setReadingProfile({
        archetype: "GROWTH ARCHITECT",
        traits: ["GROWTH ORIENTED", "PRACTICAL BUILDER", "STRATEGIC EXECUTIONER"],
        reading_pace: "Fast",
        genre_bias: "Non-Fiction Focus",
        summary: "You read with an active pencil, translating structured text straight into immediate active growth.",
        insight: "We noticed an elegant urgency in your selections. You don't view books as inert status pieces, but as active strategic templates designed to reconstruct your productivity, output, and long-term habits.",
        recommendations: [
          {
            title: "The Courage To Be Disliked",
            author: "Ichiro Kishimi & Fumitake Koga",
            subtitle: "The Japanese classic on interpersonal freedom.",
            whyThisBook: "Because right now you are balancing personal growth with public validation. This Adlerian dialogue teaches independence without isolation.",
            whyNow: "You need to shed arbitrary societal milestones and focus purely on your voluntary contribution to the community.",
            problemItSolves: "Solves interpersonal anxiety and the constant exhausting drag of seeking external peer approval.",
            purchaseUrl: "https://www.amazon.com/s?k=The+Courage+To+Be+Disliked",
            coverColor: "#1B2A3A",
            coverTextColor: "#EFECE6"
          },
          {
            title: "Atomic Habits",
            author: "James Clear",
            subtitle: "An easy & proven way to build good habits.",
            whyThisBook: "A pristine, system-oriented manual demonstrating how tiny habits compound quietly into overwhelming visual success.",
            whyNow: "You are designing structural routines to support a major creative inflection point in your professional journey.",
            problemItSolves: "Solves behavioral inertia and the self-sabotage of setting goals without setting matching routines.",
            purchaseUrl: "https://www.amazon.com/s?k=Atomic+Habits",
            coverColor: "#2C3E35",
            coverTextColor: "#F1EFEA"
          },
          {
            title: "Shoe Dog",
            author: "Phil Knight",
            subtitle: "A raw memoir of chaos, vision, and victory.",
            whyThisBook: "Knight reveals the untidy, muddy reality of building Nike, demonstrating that supreme growth is birthed from surviving raw instability.",
            whyNow: "You are craving a real, unvarnished business story to keep you humble and resilient during demanding cycles.",
            problemItSolves: "Conquers clean corporate imposter syndrome by displaying the genuine, messy truth behind grand achievements.",
            purchaseUrl: "https://www.amazon.com/s?k=Shoe+Dog+Phil+Knight",
            coverColor: "#613125",
            coverTextColor: "#F9F6EE"
          },
          {
            title: "Zero to One",
            author: "Peter Thiel",
            subtitle: "Notes on startups, or how to build the future.",
            whyThisBook: "Peter Thiel delivers an incredibly analytical blueprint on how to construct completely unique ventures that create brand new value rather than copy existing ideas.",
            whyNow: "You seek a contrarian frame of reference to launch fresh creative concepts.",
            problemItSolves: "Overcomes standard competitive copycat anxiety, guiding you toward true structural innovation.",
            purchaseUrl: "https://www.amazon.com/s?k=Zero+to+One+Peter+Thiel",
            coverColor: "#1C1C1F",
            coverTextColor: "#FAEAEA"
          },
          {
            title: "The 7 Habits of Highly Effective People",
            author: "Stephen R. Covey",
            subtitle: "Powerful lessons in personal change.",
            whyThisBook: "Stephen Covey's classic details a principle-centered approach for solving personal and professional problems, providing a step-by-step roadmap for living with fairness, integrity, honesty, and human dignity.",
            whyNow: "You want a balanced, values-based operational framework for your everyday routine.",
            problemItSolves: "Overcomes superficial technique-oriented productivity, anchoring you to deep character principles.",
            purchaseUrl: "https://www.amazon.com/s?k=7+Habits+of+Highly+Effective+People",
            coverColor: "#2B4031",
            coverTextColor: "#F5F2EC"
          }
        ]
      });
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
            onOpenFullLibrary={() => setActiveScreen(7)}
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
        <Screen7MyLibrary
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
