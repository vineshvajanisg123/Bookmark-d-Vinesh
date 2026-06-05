import { motion } from "motion/react";
import { 
  Compass, 
  ArrowRight, 
  Star,
  X
} from "lucide-react";
import { useState } from "react";
import { Book } from "../types";
import { getBookCover } from "../data/curatedBooks";
import ladyReadingPhoto from "../assets/images/lady_reading_book_1780645883723.png";

function BookCoverImageSmall({
  title,
  isbn,
  coverColor = "#2C1B1B",
  coverTextColor = "#FDFCF7",
  category,
  author,
}: {
  title: string;
  isbn?: string;
  coverColor?: string;
  coverTextColor?: string;
  category?: string;
  author: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const coverUrl = getBookCover(title, isbn);

  return (
    <div 
      className="relative w-full h-full overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: coverColor
      }}
    >
      {(!coverUrl || !imageLoaded || imageError) && (
        <div 
          className="absolute inset-0 flex flex-col justify-between p-2.5 border-l-3 border-black/25 select-none text-[#FDFCF7] text-left"
          style={{
            backgroundColor: coverColor,
            color: coverTextColor
          }}
        >
          <div className="space-y-1">
            {category && (
              <span className="font-mono text-[6px] uppercase tracking-widest opacity-80 block whitespace-nowrap overflow-hidden text-ellipsis">
                {category}
              </span>
            )}
            <h5 className="font-serif text-[8px] font-semibold uppercase leading-tight line-clamp-3">
              {title}
            </h5>
          </div>
          <span className="font-serif text-[7.5px] italic opacity-85 block text-left">
            {author.split(" ").pop()}
          </span>
        </div>
      )}

      {coverUrl && !imageError && (
        <img 
          src={coverUrl} 
          alt={title} 
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-contain p-1 z-10 transition-all duration-300 hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Crease/Bevel overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-black/15" />
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-r from-black/25 to-transparent z-25" />
    </div>
  );
}

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
              Discover the Bookshelf
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
              MY BOOKSHELF SANCTUARY
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
                      <BookCoverImageSmall
                        title={book.title}
                        isbn={book.isbn}
                        coverColor={book.coverColor}
                        coverTextColor={book.coverTextColor}
                        category={book.category}
                        author={book.author}
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

      {/* 4. How It Works Section style mapping to Image 3 */}
      <section 
        id="how-it-works-section" 
        className="py-20 px-6 md:px-12 lg:px-24 border-t border-[#E8E2D8]/80"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#5E5A55] tracking-widest uppercase font-semibold">HOW IT WORKS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E1E1B] font-bold">
              Three steps to a better routine
            </h2>
          </div>

          {/* Stepper Grid matching the aesthetic in Image 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Background dotted line separator for large screens */}
            <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-[0.5px] border-t border-dashed border-[#A29E99] -z-10" />

            {[
              {
                step: "1",
                title: "Create your profile",
                desc: "Tell us the name of one loved book that formed your foundational ideas. Detail your current reading velocity."
              },
              {
                step: "2",
                title: "Register your cognitive style",
                desc: "Describe what you seek during reads—empirical systems, beautiful narratives, business blueprints, or poetic escapes."
              },
              {
                step: "3",
                title: "Unlock your matching stacks",
                desc: "Receive your custom mental DNA archetype and step straight into the discovery rooms to explore our quiet bookshelf."
              }
            ].map((node, i) => (
              <div key={i} className="space-y-4 text-center px-4">
                {/* Visual Circle Bubble */}
                <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5E4D44] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md hover:scale-105 transition-transform select-none">
                  {node.step}
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E1E1B]">{node.title}</h4>
                <p className="font-sans font-light text-xs text-[#5E5A55] leading-relaxed max-w-xs mx-auto">{node.desc}</p>
              </div>
            ))}

          </div>

          <div className="pt-4">
            <button
              onClick={onBegin}
              className="px-8 py-3.5 bg-[#365947] hover:bg-[#2A4537] text-white font-serif text-xs font-semibold rounded-full inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              Take the Sanctuary Test <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Reviews testomonials section style mapping block exactly to Image 4 */}
      <section 
        id="reviews-section" 
        className="py-20 px-6 md:px-12 lg:px-24 bg-[#FAF6F0] border-t border-[#E8E2D8]/80"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="font-mono text-xs text-[#5E5A55] tracking-widest uppercase font-semibold">REVIEWS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E1E1B] font-bold">
              Loved by passionate readers
            </h2>
          </div>

          {/* Testimonial Cards matching Image 4 design layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                text: "“Finally a reading sanctuary app that doesn’t try to be a social network. Just me, my physical bookshelf, and beautiful, raw guidance on what to pursue next.”",
                author: "Daniel Cooper",
                role: "Product designer",
                stars: 5,
                abbr: "DC"
              },
              {
                text: "“The recommendation process is like having a quiet conversation with an old, highly read librarian who truly understands you. Eerily accurate.”",
                author: "Emma Lindström",
                role: "Software engineer",
                stars: 5,
                abbr: "EL"
              },
              {
                text: "“Seeing my bookshelf rendered as a celestial mental constellation kept me incredibly motivated. Zero gamified streak noise—pure intellectual discovery.”",
                author: "Ryan Mitchell",
                role: "Grad student",
                stars: 5,
                abbr: "RM"
              },
              {
                text: "“The companion analysis was stunningly specific in its psychological reading mapping. Highly recommended to everyone seeking deep focus metrics.”",
                author: "Mei Lin",
                role: "Freelance writer",
                stars: 5,
                abbr: "ML"
              }
            ].map((review, i) => (
              <div 
                key={i} 
                className="bg-white border border-[#E8E2D8] hover:border-[#365947]/35 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between space-y-5"
              >
                {/* 5 Stars banner */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: review.stars }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#E07A5F] stroke-[#E07A5F]" />
                    ))}
                  </div>

                  {/* Decorative quotes icon overlay */}
                  <span className="font-serif text-4xl text-[#E07A5F]/15 font-bold pointer-events-none select-none absolute top-4 right-8">“</span>
                </div>

                {/* Star quote text body */}
                <p className="font-serif text-sm italic text-[#1E1E1B]/95 leading-relaxed">
                  {review.text}
                </p>

                {/* Profile card label */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#FAF6F0]">
                  {/* Persona badge */}
                  <div className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E8E2D8] flex items-center justify-center font-mono font-bold text-[10px] text-[#365947] select-none">
                    {review.abbr}
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xs text-[#1E1E1B]">{review.author}</h5>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[#A29E99]">{review.role}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

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
