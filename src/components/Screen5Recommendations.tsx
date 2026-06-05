import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, ArrowUpRight, Award, RefreshCcw, BookOpen } from "lucide-react";
import { Recommendation, Book } from "../types";
import { getBookCover } from "../data/curatedBooks";

interface Screen5RecommendationsProps {
  archetype: string;
  recommendations: Recommendation[];
  onWander: () => void;
  onReset: () => void;
  onHome: () => void;
  libraryBooks: Book[];
  onToggleLibrary: (book: Book) => void;
}

export default function Screen5Recommendations({
  archetype = "GROWTH ARCHITECT",
  recommendations = [],
  onWander,
  onReset,
  onHome,
  libraryBooks = [],
  onToggleLibrary,
}: Screen5RecommendationsProps) {
  
  // High fidelity default fallback of 5 curated recommendations 
  const defaultRecs: Recommendation[] = [
    {
      title: "The Courage To Be Disliked",
      author: "Ichiro Kishimi",
      subtitle: "The Japanese phenomenon on self-acceptance and Adlerian psychology.",
      whyThisBook: "Because right now you're questioning external milestones. This book explores Adlerian self-governance via dialogue with a wise philosopher.",
      whyNow: "Your Reading DNA reveals a strong urge to decouple from standard corporate expectations.",
      problemItSolves: "Dissolves systemic approval anxiety, helping you build direct community contribution.",
      purchaseUrl: "https://www.amazon.com/s?k=The+Courage+To+Be+Disliked",
      coverColor: "#1B2A3A",
      coverTextColor: "#EFECE6"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      subtitle: "Tiny changes that compound into massive results.",
      whyThisBook: "A mechanical, actionable masterpiece illustrating how microscopic structural adjustments yield massive personal compound growth.",
      whyNow: "You are setting big developmental goals but lack a tiny automated framework to support them daily.",
      problemItSolves: "Solves standard willpower depletion by embedding small triggers directly into environments.",
      purchaseUrl: "https://www.amazon.com/s?k=Atomic+Habits",
      coverColor: "#2C3E35",
      coverTextColor: "#F1EFEA"
    },
    {
      title: "Shoe Dog",
      author: "Phil Knight",
      subtitle: "The raw startup saga of Nike.",
      whyThisBook: "A deeply human business story explaining how Knight cobbled modern giants from narrow failures and chaotic schedules.",
      whyNow: "You need to see the chaotic, authentic background behind success to sustain focus during rocky starts.",
      problemItSolves: "Replaces standard corporate imposter syndrome with deep, resilient survival wisdom.",
      purchaseUrl: "https://www.amazon.com/s?k=Shoe+Dog+Phil+Knight",
      coverColor: "#613125",
      coverTextColor: "#F9F6EE"
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      subtitle: "Notes on startups, or how to build the future.",
      whyThisBook: "Peter Thiel delivers an incredibly analytical blueprint on how to construct completely unique ventures that create brand new value.",
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
      whyThisBook: "Stephen Covey's classic details a principle-centered approach for solving personal and professional problems.",
      whyNow: "You want a balanced, values-based operational framework for your everyday routine.",
      problemItSolves: "Overcomes superficial technique-oriented productivity, anchoring you to deep character principles.",
      purchaseUrl: "https://www.amazon.com/s?k=7+Habits+of+Highly+Effective+People",
      coverColor: "#2B4031",
      coverTextColor: "#F5F2EC"
    }
  ];

  // Pick whichever array contains a complete recommendation output
  const finalRecs = recommendations && recommendations.length >= 5 ? recommendations : defaultRecs;
  const heroBook = finalRecs[0];
  const secondaryBooks = finalRecs.slice(1, 5); // Remainder 4 books

  const [hoveredBook, setHoveredBook] = useState<{ title: string; synopsis: string; rect: DOMRect } | null>(null);

  return (
    <div className="py-6 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between animate-fadeIn" id="recommendations-screen">
      
      {/* Upper header navigation bar */}
      <header className="flex justify-between items-center border-b border-[#E8E2D8]/60 pb-4 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-bold border border-[#365947]/30 px-3 py-1 rounded-sm bg-[#365947]/5">
            RECIPIENT ARCHETYPE: {archetype.replace(/_/g, " ")}
          </span>
        </div>
        <button
          onClick={onReset}
          className="font-mono text-[9px] tracking-widest uppercase text-brand-muted hover:text-[#E07A5F] flex items-center gap-1.5 cursor-pointer font-bold transition-all"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Retake Survey
        </button>
      </header>

      {/* Main Editorial Layout (Split spreads) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-auto">
        
        {/* Left Column: Hero Cover and Comprehensive Synopsis */}
        <div className="lg:col-span-7 space-y-8 border-b lg:border-b-0 lg:border-r border-brand-border/60 pb-10 lg:pb-0 lg:pr-12">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-[#E07A5F] font-bold uppercase">
              <Award className="w-4 h-4 text-[#E07A5F] animate-pulse" />
              THE HERO COMPANION • PRIMARY RECOMMENDATION
            </div>
            <h2 className="font-display font-bold text-3xl font-semibold text-brand-text md:text-4xl min-h-[3rem] tracking-tight">
              {heroBook.title}
            </h2>
            <p className="font-serif text-brand-muted text-sm italic">
              By {heroBook.author} {heroBook.subtitle && `— ${heroBook.subtitle}`}
            </p>
          </div>

          {/* Large interactive rendered book cover */}
          <div className="flex justify-center md:justify-start pt-2">
            <div className="relative group hover:scale-[1.01] transition-transform duration-300">
              <div className="w-[16.8rem] h-[22.8rem] rounded-r-md shadow-2xl overflow-hidden border border-[#D8D2C4] relative">
                <div 
                  className="absolute inset-0 flex flex-col justify-between p-6 border-l-8 border-black/30 select-none bg-[#1B2A3A] text-[#FCFBF8]"
                  style={{
                    backgroundColor: heroBook.coverColor || "#1B2A3A",
                    color: heroBook.coverTextColor || "#FCFBF8"
                  }}
                >
                  <div className="space-y-4">
                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">
                      MAPPED FOR {archetype.replace(/_/g, " ")}
                    </span>
                    <p className="font-serif font-bold text-lg leading-tight uppercase tracking-wide line-clamp-4">
                      {heroBook.title}
                    </p>
                  </div>

                  <div className="border-t border-current/25 pt-4">
                    <p className="font-serif italic text-[11px] leading-relaxed opacity-85">
                      {heroBook.author}
                    </p>
                    <span className="block font-mono text-[7px] uppercase tracking-widest opacity-50 mt-1">
                      Bookmarkd literary system
                    </span>
                  </div>
                </div>
                {/* Genuine Cover Image fallback integration */}
                {getBookCover(heroBook.title, heroBook.isbn) && (
                  <img 
                    src={getBookCover(heroBook.title, heroBook.isbn)} 
                    alt={heroBook.title} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Core explanatory cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2 border-t border-brand-border/40 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-bold block">
                Why this book?
              </span>
              <p className="font-sans text-xs text-brand-muted leading-relaxed font-light">
                {heroBook.whyThisBook}
              </p>
            </div>

            <div className="space-y-2 border-t border-brand-border/40 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-bold block">
                Why now?
              </span>
              <p className="font-sans text-xs text-brand-muted leading-relaxed font-light">
                {heroBook.whyNow}
              </p>
            </div>

            <div className="space-y-2 border-t border-brand-border/40 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-bold block">
                What problem it solves?
              </span>
              <p className="font-sans text-xs text-brand-muted leading-relaxed font-light">
                {heroBook.problemItSolves}
              </p>
            </div>
          </div>

          {/* Secure Copy Amazon Portal CTA & Save to Library Toggle */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={heroBook.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#365947] text-white hover:bg-[#2E4C3D] rounded-full text-xs font-serif font-semibold transition-all cursor-pointer shadow-sm hover:shadow"
              id="hero-buy-link"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              Secure Copy on Amazon
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
            </a>

            <button
              onClick={() => {
                onToggleLibrary({
                  title: heroBook.title,
                  author: heroBook.author,
                  category: "Curation - " + archetype,
                  description: heroBook.whyThisBook,
                  coverColor: heroBook.coverColor || "#365947",
                  coverTextColor: heroBook.coverTextColor || "#FDFCF7",
                  amazonUrl: heroBook.purchaseUrl,
                  isbn: heroBook.isbn
                });
              }}
              className={`inline-flex items-center gap-2 px-6 py-3.5 border rounded-full text-xs font-serif font-semibold transition-all cursor-pointer shadow-sm ${
                libraryBooks.some((b) => b.title.toLowerCase() === heroBook.title.toLowerCase())
                  ? "bg-[#334E3E]/10 border-[#334E3E] text-[#334E3E]"
                  : "bg-white border-[#E8E2D8] hover:border-[#365947] text-[#1D1B1B]"
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#365947]" />
              {libraryBooks.some((b) => b.title.toLowerCase() === heroBook.title.toLowerCase())
                ? "Added to Library"
                : "Save to My Library"}
            </button>
          </div>
        </div>

        {/* Right Column: Remaining 4 Curated Companions (Books #2 to #5) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2 pb-2 border-b border-brand-border/40">
            <span className="font-mono text-[9px] tracking-widest text-[#E07A5F] font-bold uppercase block flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Additional Recommendations for you
            </span>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Your Literary DNA is made up of several influences. These recommendations explore those additional dimensions to help you find books you'll love.
            </p>
          </div>

          {/* Queue Loop */}
          <div className="space-y-5">
            {secondaryBooks.map((book, idx) => (
              <div
                key={idx}
                className="group flex gap-5 p-4 border border-brand-border bg-brand-surface/40 hover:bg-white hover:border-[#365947]/30 hover:shadow-md transition-all duration-300 rounded-xl"
              >
                {/* Visual Cover Mini-Container */}
                <div className="shrink-0">
                  <div className="w-[6.2rem] h-[8.5rem] relative shadow-md rounded-r-sm overflow-hidden border border-[#E8E2D8]/45">
                    <div 
                      className="absolute inset-0 flex flex-col justify-between p-2.5 border-l-3 border-black/35 select-none text-[9px] font-bold"
                      style={{
                        backgroundColor: book.coverColor || "#3F2E2E",
                        color: book.coverTextColor || "#FAF6F0"
                      }}
                    >
                      <p className="font-serif text-[9px] leading-tight uppercase line-clamp-3">
                        {book.title}
                      </p>
                      <span className="font-serif text-[7.5px] italic font-light opacity-80">
                        {book.author.split(" ").pop()}
                      </span>
                    </div>
                    {/* Cover image integration */}
                    {getBookCover(book.title, book.isbn) && (
                      <img 
                        src={getBookCover(book.title, book.isbn)} 
                        alt={book.title} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Companion Meta Spread */}
                <div className="space-y-2.5 flex flex-col justify-between w-full">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#E07A5F] font-bold">
                      COMPANION ENTRY 0{idx + 2}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-brand-text line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="font-serif text-brand-muted text-xs">
                      By {book.author}
                    </p>
                    <div className="relative pt-0.5">
                      <p 
                        className="font-sans text-[11px] text-brand-muted font-light leading-relaxed line-clamp-2 hover:text-[#365947] transition-colors cursor-help"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredBook({
                            title: book.title,
                            synopsis: book.whyThisBook,
                            rect
                          });
                        }}
                        onMouseLeave={() => setHoveredBook(null)}
                      >
                        {book.whyThisBook}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-border/30 pt-2.5">
                    <span className="font-mono text-[7px] uppercase tracking-widest text-brand-muted/70">
                      {book.problemItSolves ? "RESOLVES OBSTACLES" : ""}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          onToggleLibrary({
                            title: book.title,
                            author: book.author,
                            category: "Curation Companion",
                            description: book.whyThisBook,
                            coverColor: book.coverColor || "#1F3B2E",
                            coverTextColor: book.coverTextColor || "#FDFCF7",
                            amazonUrl: book.purchaseUrl,
                            isbn: book.isbn
                          });
                        }}
                        className={`text-[10px] font-sans font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                          libraryBooks.some((b) => b.title.toLowerCase() === book.title.toLowerCase())
                            ? "text-[#E07A5F]"
                            : "text-[#5E5A55] hover:text-[#365947]"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        {libraryBooks.some((b) => b.title.toLowerCase() === book.title.toLowerCase())
                          ? "In Library"
                          : "Save to Library"}
                      </button>

                      <span className="text-[#E8E2D8] text-xs">|</span>

                      <a
                        href={book.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#365947] hover:text-[#2E4C3D] group cursor-pointer transition-colors"
                      >
                        Acquire
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation pathways */}
      <footer className="border-t border-brand-border/50 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-serif italic text-brand-muted text-sm block">
            "Your profile has been fully charted. Browse deeper to find and collect your sanctuary list."
          </span>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onWander}
            className="px-6 py-3 border border-[#365947] text-[#365947] hover:bg-[#365947] hover:text-white font-sans text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer shadow-xs"
            id="stacks-wander-btn"
          >
            Discover the Library
          </button>
        </div>
      </footer>

      {/* Viewport-locked hover cards for companion overviews */}
      {hoveredBook && (
        <div 
          className="fixed bg-[#FDFCF7] border border-[#E8E2D8] p-4 rounded-md shadow-xl text-brand-text z-[9999] pointer-events-none max-w-sm w-72 transition-all duration-200"
          style={{
            left: `${Math.min(window.innerWidth - 304, Math.max(16, hoveredBook.rect.left + (hoveredBook.rect.width / 2) - 144))}px`,
            top: hoveredBook.rect.top > window.innerHeight / 2 
              ? `${hoveredBook.rect.top - 8}px` 
              : `${hoveredBook.rect.bottom + 8}px`,
            transform: hoveredBook.rect.top > window.innerHeight / 2 ? 'translateY(-100%)' : 'translateY(0)'
          }}
        >
          <p className="font-mono text-[8px] uppercase tracking-widest text-[#365947] mb-1.5 font-bold">LITERARY COMPANION ANALYSIS</p>
          <p className="font-serif font-bold text-xs text-brand-text mb-1 leading-tight">{hoveredBook.title}</p>
          <p className="font-sans text-[11px] text-brand-muted font-light leading-relaxed">{hoveredBook.synopsis}</p>
        </div>
      )}
    </div>
  );
}
