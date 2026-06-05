import { motion } from "motion/react";
import { 
  Compass, 
  ArrowRight, 
  Star,
  X
} from "lucide-react";
import { useState } from "react";
import { Book } from "../types";
import BookCover from "./BookCover";
import ladyReadingPhoto from "../assets/images/lady_reading_book_1780668147309.png";



interface Screen1WelcomeProps {
  onBegin: () => void;
  onExploreStacks: () => void;
  libraryBooks: Book[];
  onOpenFullBookshelf: () => void;
  onRemoveFromLibrary: (book: Book) => void;
}

export default function Screen1Welcome({ 
  onBegin, 
  onExploreStacks,
  libraryBooks = [],
  onOpenFullBookshelf,
  onRemoveFromLibrary
}: Screen1WelcomeProps) {
  const [activeTab, setActiveTab] = useState<"features" | "how-it-works" | "reviews">("features");

  // Custom smooth scroll helper to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="text-[#1E1E1B] selection:bg-[#365947]/10" id="welcome-screen">
      
      {/* 2. Cozy Hero Section matching Image 1 layout with Lady Reading Book */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side text & editorial headings */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-5.5xl text-[#1E1E1B] font-bold leading-tight tracking-tight">
              Discover meaningful books, <br className="hidden sm:inline" />
              one story at a time.
            </h1>
            <p className="font-serif text-lg md:text-xl text-[#5E5A55]/90 max-w-lg leading-relaxed font-light italic">
              Bookmarkd is a calm, focused reading sanctuary that maps your literary DNA. Learn who you are through your books, with zero digital noise.
            </p>
          </div>

          {/* Dual Action CTAs featuring Carrot-Orange Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="hero-begin-btn"
              onClick={onBegin}
              className="px-8 py-4 bg-[#E07A5F] hover:bg-[#D0694D] text-white font-serif text-sm font-semibold rounded-full flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
            >
              Map My Reading DNA
              <ArrowRight className="w-4.5 h-4.5" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreStacks}
              className="px-8 py-4 bg-white hover:bg-[#FCFBF8] border border-[#E8E2D8] hover:border-[#5E5A55] text-[#1E1E1B] font-serif text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow active:scale-98"
            >
              <Compass className="w-4 h-4 text-[#365947]" />
              Discover new books
            </button>
          </div>

          {/* Social Proof sub-tag */}
          <div className="pt-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#5E5A55]/85 font-semibold">
            <span>✦</span>
            <span>NO METRICS • NO SOCIAL PRESSURE • PURE READING DEEP FOCUS</span>
          </div>
        </div>

        {/* Right Side: Lady Reading Book Photo */}
        <div className="lg:col-span-5 flex flex-col justify-center relative w-full">
          {/* Subtle drop shadow/glowing rings behind */}
          <div className="absolute inset-0 bg-radial from-[#365947]/5 via-transparent to-transparent -z-10 rounded-full pointer-events-none" />
          
          <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-2xl skeleton mx-auto">
            <motion.img
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={ladyReadingPhoto}
              alt="A reader reflecting in a quiet personal bookshelf room"
              className="w-full h-full object-cover"
            />
            {/* Visual overlay gradient representing natural sunlight blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </main>

      {/* 3. My Bookshelf Dedicated Row with Perfect Balance and Symmetry */}
      <section 
        id="my-bookshelf-section" 
        className="py-16 border-t border-[#E8E2D8]/80 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#365947] font-bold">
              MY BOOKSHELF
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
            <span className="text-[10px] font-mono text-[#5E5A55] uppercase tracking-wider font-semibold bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#E8E2D8]">
              {libraryBooks.length} {libraryBooks.length === 1 ? "VOLUME" : "VOLUMES"}
            </span>
          </div>
          
          <button 
            onClick={onOpenFullBookshelf}
            className="text-[10px] font-mono uppercase tracking-widest text-[#E07A5F] hover:text-[#D0694D] font-bold cursor-pointer transition-colors flex items-center gap-1"
            id="see-more-bookshelf"
          >
            See all volumes <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-[#FCFBF8] rounded-2xl border border-[#E8E2D8] p-6 shadow-xs min-h-[140px]">
          {libraryBooks.length === 0 ? (
            <div className="text-center py-8 space-y-2 flex flex-col items-center justify-center min-h-[110px]">
              <p className="font-serif italic text-sm text-[#5E5A55]">Your personal bookshelf sanctuary is quiet.</p>
              <p className="font-sans text-[11px] text-[#A29E99] max-w-sm leading-relaxed mx-auto">
                Step into the Discovery Rooms, choose a stack shelf, and add any titles that call to you to begin custom curation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 w-full">
              {libraryBooks.slice(0, 5).map((book) => {
                return (
                  <div 
                    key={book.title} 
                    className="bg-white border border-[#E8E2D8] hover:border-[#365947]/35 rounded-xl flex flex-col overflow-hidden hover:shadow-sm transition-all relative group text-left"
                  >
                    {/* Remove tiny X button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromLibrary(book);
                      }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full border border-[#E8E2D8] hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white shadow-xs z-30"
                      title="Remove from Bookshelf"
                    >
                      <X className="w-2 h-2" />
                    </button>

                    {/* Aspect Ratio Cover styled similar to the Discovery Rooms / Wander the Stacks page */}
                    <div className="relative w-full aspect-[2/3] shrink-0 overflow-hidden bg-brand-surface border-b border-[#E8E2D8]/40 shadow-xs">
                      <BookCover
                        title={book.title}
                        author={book.author}
                        isbn={book.isbn}
                        coverColor={book.coverColor}
                        coverTextColor={book.coverTextColor}
                        category={book.category}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Informative description text underneath */}
                    <div className="p-3 flex flex-col justify-between flex-grow gap-0.5">
                      <div>
                        <span className="font-mono text-[7px] uppercase tracking-widest text-[#365947] font-bold block overflow-hidden text-ellipsis whitespace-nowrap">
                          {book.category || "Curation"}
                        </span>
                        <h4 className="font-serif font-semibold text-[11px] text-[#1D1B1B] line-clamp-1 leading-tight mt-0.5" title={book.title}>
                          {book.title}
                        </h4>
                        <p className="text-[10px] text-[#5E5A55] font-serif italic block overflow-hidden text-ellipsis whitespace-nowrap">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {libraryBooks.length > 5 ? (
                <button
                  onClick={onOpenFullBookshelf}
                  className="p-3 bg-[#FAF6F0] hover:bg-white border border-dashed border-[#E8E2D8] hover:border-[#365947]/45 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-all group shrink-0"
                >
                  <span className="font-mono text-[10px] text-[#365947] font-bold">+{libraryBooks.length - 5} MORE</span>
                  <span className="font-serif text-[11px] italic text-[#5E5A55] group-hover:text-[#365947] mt-1 leading-snug">See all volumes →</span>
                </button>
              ) : (
                <button
                  onClick={onExploreStacks}
                  className="p-3 bg-[#FCFBF8] border border-dashed border-[#E8E2D8] hover:border-[#365947]/45 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-all group shrink-0"
                >
                  <span className="font-mono text-[9px] text-[#E07A5F] font-bold">ADD MORE</span>
                  <span className="font-serif text-[11px] italic text-brand-muted group-hover:text-[#365947] mt-1 leading-snug">Explore stacks →</span>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Solid bottom footer copyright */}
      <footer className="bg-white border-t border-[#E8E2D8] py-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] font-mono text-[#A29E99] tracking-wider gap-4">
          <span>© 2026 BOOKMARKD SANCTUARY SYSTEM. ALL RIGHTS RESERVED.</span>
          <span>ESTABLISHED IN PURSUIT OF SECURE CLARITY & DEEP READING</span>
        </div>
      </footer>

    </div>
  );
}
