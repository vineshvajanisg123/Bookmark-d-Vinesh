import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Compass, Search, X, ShoppingBag, ArrowUpRight, ArrowLeft, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Book, CuratedShelf } from "../types";
import { CURATED_STACKS, POPULAR_BOOKS, getBookCover } from "../data/curatedBooks";

interface BookCoverImageProps {
  title: string;
  isbn?: string;
  coverColor?: string;
  coverTextColor?: string;
  category?: string;
  author: string;
  sizeClass?: string;
  paddingClass?: string;
}

function BookCoverImage({
  title,
  isbn,
  coverColor = "#2C1B1B",
  coverTextColor = "#FDFCF7",
  category,
  author,
  sizeClass = "w-full h-full",
  paddingClass = "p-2"
}: BookCoverImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const coverUrl = getBookCover(title, isbn);

  return (
    <div 
      className={`relative ${sizeClass} shrink-0 overflow-hidden shadow-md rounded-r-xs border border-[#E8E2D8]/40 transition-all duration-300`}
      style={{
        backgroundColor: coverColor
      }}
    >
      {/* Fallback structured book interface: hidden or only visible if image hasn't loaded or fails */}
      {(!coverUrl || !imageLoaded || imageError) && (
        <div 
          className="absolute inset-0 flex flex-col justify-between p-3 border-l-4 border-black/25 select-none text-[#FDFCF7] transition-all duration-300"
          style={{
            backgroundColor: coverColor,
            color: coverTextColor
          }}
        >
          <div className="space-y-1.5 text-left">
            {category && (
              <span className="font-mono text-[7px] uppercase tracking-widest opacity-80 block whitespace-nowrap overflow-hidden text-ellipsis">
                {category}
              </span>
            )}
            <h5 className="font-serif text-[10px] font-semibold uppercase leading-tight line-clamp-3">
              {title}
            </h5>
          </div>
          <span className="font-serif text-[8px] italic opacity-85 block text-left">
            {author.split(" ")[0]}
          </span>
        </div>
      )}

      {/* Real Cover Image fitted completely in containment box, no zoom zoom crop */}
      {coverUrl && !imageError && (
        <img 
          src={coverUrl} 
          alt={title} 
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-contain ${paddingClass} z-10 transition-all duration-500 hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Visual tactile cover style cues (Spine crease & 3D beveling) */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-black/15" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/20 to-transparent z-25" />
    </div>
  );
}

interface Screen6WanderTheStacksProps {
  onBackToResults?: () => void;
  hasProfile: boolean;
  onHome: () => void;
  libraryBooks: Book[];
  onToggleLibrary: (book: Book) => void;
}

export default function Screen6WanderTheStacks({ 
  onBackToResults, 
  hasProfile, 
  onHome,
  libraryBooks = [],
  onToggleLibrary,
}: Screen6WanderTheStacksProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredBook, setHoveredBook] = useState<{ title: string; synopsis: string; rect: DOMRect } | null>(null);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  // Filter book database for live search coordinates
  const filteredBooks = POPULAR_BOOKS.filter((b) => {
    const term = searchTerm.toLowerCase();
    return b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term) || b.category.toLowerCase().includes(term);
  });

  return (
    <div className="py-6 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between animate-fadeIn" id="wander-stacks-screen">
      
      {/* Top Navigation bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E8E2D8]/60 pb-4 mb-8">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {hasProfile && onBackToResults && (
              <button
                onClick={onBackToResults}
                className="p-1 px-2.5 border border-brand-border hover:border-brand-accent rounded-sm text-xs text-brand-muted hover:text-brand-accent font-display cursor-pointer mr-2 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to DNA Curation
              </button>
            )}
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-bold">THE DISCOVERY ROOMS</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-brand-text">Discover the Library</h1>
          <p className="font-serif italic text-brand-muted text-sm">Quietly slide along the shelves. Listen. Explore.</p>
        </div>

        {/* Live Search bar */}
        <div className="relative w-full md:w-80">
          <div className="flex items-center gap-2.5 border border-brand-border bg-brand-surface rounded-sm px-3 py-2 focus-within:border-brand-accent/60 shadow-xs">
            <Search className="w-4 h-4 text-brand-accent shrink-0" />
            <input
              type="text"
              placeholder="Search author, title, stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none outline-hidden text-xs font-serif text-brand-text placeholder-brand-muted/40"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-brand-muted hover:text-brand-accent">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Shelves */}
      <main className="space-y-12 my-auto">
        {searchTerm ? (
          /* Search results layout */
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted block">
              FOUND COGENT ENTRIES ({filteredBooks.length})
            </span>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.title}
                    onClick={() => handleBookClick(book)}
                    className="flex gap-4 p-4 border border-brand-border bg-brand-surface/40 hover:bg-brand-surface hover:shadow-xs transition-all duration-300 rounded-sm cursor-pointer"
                  >
                    <BookCoverImage
                      title={book.title}
                      isbn={book.isbn}
                      coverColor={book.coverColor || "#4B564F"}
                      coverTextColor={book.coverTextColor || "#FBF7F0"}
                      category={book.category}
                      author={book.author}
                      sizeClass="w-[5.4rem] h-[7.8rem]"
                      paddingClass="p-1"
                    />
                    
                    <div className="flex flex-col justify-between py-1 relative w-full overflow-visible">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-widest text-[#365947] font-semibold">
                          {book.category}
                        </span>
                        <h4 className="font-serif font-semibold text-sm text-brand-text line-clamp-1 mt-0.5">{book.title}</h4>
                        <p className="text-xs text-brand-muted font-serif italic mt-0.5">By {book.author}</p>
                      </div>
                      <div className="relative mt-2">
                        <p 
                          className="text-[11px] text-brand-muted font-light line-clamp-1 hover:text-[#365947] transition-colors cursor-help"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredBook({
                              title: book.title,
                              synopsis: book.description || "",
                              rect
                            });
                          }}
                          onMouseLeave={() => setHoveredBook(null)}
                        >
                          {book.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-brand-border border-dashed rounded-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted block mb-2">No volumes found</span>
                <p className="font-serif italic text-xs text-brand-muted">Perhaps describe alternative authors or concepts.</p>
              </div>
            )}
          </div>
        ) : (
          /* Structured Elegant Horizonal Curated Shelves (Netflix UI Slider layout) */
          <div className="space-y-14">
            {CURATED_STACKS.map((shelf) => (
              <ShelfRow
                key={shelf.name}
                shelf={shelf}
                onBookClick={handleBookClick}
                onHoverBook={(val) => setHoveredBook(val)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating sliding drawer panel for Book detail display */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 bg-[#1E1E1B]/30 backdrop-blur-xs z-50 flex justify-end" id="stacks-drawer-backdrop">
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSelectedBook(null)} />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-md md:max-w-lg h-screen bg-brand-bg shadow-2xl border-l border-brand-border/60 p-8 md:p-12 flex flex-col justify-between overflow-y-auto"
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors cursor-pointer"
                id="drawer-close-btn"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-10 my-auto">
                {/* Book header section */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-semibold block">
                    {selectedBook.category || "VOLUME SELECTION"}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-text leading-tight">
                    {selectedBook.title}
                  </h2>
                  <p className="font-serif text-brand-muted text-sm italic">
                    By {selectedBook.author}
                  </p>
                </div>

                {/* Cover render representation */}
                <div className="flex justify-center py-4">
                  <BookCoverImage
                    title={selectedBook.title}
                    isbn={selectedBook.isbn}
                    coverColor={selectedBook.coverColor || "#1B2A3A"}
                    coverTextColor={selectedBook.coverTextColor || "#FAF6F0"}
                    category={selectedBook.category}
                    author={selectedBook.author}
                    sizeClass="w-48 h-68"
                    paddingClass="p-2"
                  />
                </div>

                {/* Narrative content block */}
                <div className="space-y-4 border-t border-brand-border/60 pt-6">
                  <span className="font-mono text-[9px] tracking-widest text-brand-accent font-bold uppercase block">
                    Book Overview
                  </span>
                  <p className="font-sans text-sm text-brand-muted leading-relaxed font-light">
                    {selectedBook.description || "A highly esteemed text in our private library selection. Selected because of its pristine narrative structure, cognitive clarity, and ability to challenge baseline perspectives."}
                  </p>
                </div>
              </div>

              {/* Purchase & Sanctuary Save action block */}
              <div className="border-t border-brand-border/60 pt-6 mt-8 flex flex-col gap-3">
                <a
                  href={selectedBook.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(selectedBook.title + " " + selectedBook.author)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#365947] hover:bg-[#2E4C3D] text-[#F8F6F1] text-xs font-display flex items-center justify-center gap-2.5 transition-colors duration-300 rounded-sm cursor-pointer shadow-sm hover:shadow"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  Acquire This Book on Amazon
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                </a>

                <button
                  onClick={() => {
                    onToggleLibrary(selectedBook);
                  }}
                  className={`w-full py-3.5 text-xs font-display transition-colors rounded-sm cursor-pointer border flex items-center justify-center gap-2 ${
                    libraryBooks.some((b) => b.title.toLowerCase() === selectedBook.title.toLowerCase())
                      ? "bg-[#334E3E]/10 border-[#334E3E] text-[#334E3E]"
                      : "bg-white hover:bg-brand-surface text-[#1D1B1B] border-brand-border hover:border-[#365947]"
                  }`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  {libraryBooks.some((b) => b.title.toLowerCase() === selectedBook.title.toLowerCase())
                    ? "In Your Library"
                    : "Save to My Library"}
                </button>
                
                <button
                  onClick={() => setSelectedBook(null)}
                  className="w-full py-3.5 bg-transparent hover:bg-brand-surface text-brand-text text-xs border border-brand-border transition-colors rounded-sm cursor-pointer font-display"
                >
                  Stay in Discovery Room
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer bar */}
      <footer className="border-t border-brand-border/40 pt-4 mt-12 text-center text-[10px] font-mono text-brand-muted tracking-widest">
        DISCOVER FREELY • NO PRESSURES • NO METRICS
      </footer>

      {/* Floating non-clipping viewport-fixed hover synopsis overview */}
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
          <p className="font-mono text-[8px] uppercase tracking-widest text-[#365947] mb-1.5 font-bold">Book Overview</p>
          <p className="font-serif font-bold text-xs text-brand-text mb-1 leading-tight">{hoveredBook.title}</p>
          <p className="font-sans text-[11px] text-brand-muted font-light leading-relaxed">{hoveredBook.synopsis}</p>
        </div>
      )}
    </div>
  );
}

// Netflix UI sliding row component for intuitive category navigation
interface ShelfRowProps {
  shelf: CuratedShelf;
  onBookClick: (book: Book) => void;
  onHoverBook: (hovered: { title: string; synopsis: string; rect: DOMRect } | null) => void;
  key?: any;
}

function ShelfRow({ shelf, onBookClick, onHoverBook }: ShelfRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollRatio, setScrollRatio] = useState(0);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      
      const maxScroll = scrollWidth - clientWidth;
      setScrollRatio(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      // Initial and delayed checks for container metrics
      checkScroll();
      const timer = setTimeout(checkScroll, 300);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  const slide = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.85;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-4 relative group/row">
      {/* Header section with Row Header and Slider Dashboard Dot indicator */}
      <div className="flex justify-between items-baseline pb-2 border-b border-brand-border/45">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
          <h3 className="font-serif text-lg font-medium text-brand-text">{shelf.name}</h3>
          <span className="text-xs font-serif italic text-brand-muted">— {shelf.description}</span>
        </div>
        
        {/* Netflix-like Paginated Indicator Dashes */}
        <div className="flex gap-1 items-center pr-1">
          {[0, 1, 2, 3].map((idx) => {
            const isActive = Math.round(scrollRatio * 3) === idx;
            return (
              <div
                key={idx}
                className={`h-[2px] transition-all duration-300 rounded-full ${
                  isActive ? "w-4 bg-[#365947]" : "w-1.5 bg-[#365947]/15"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="relative overflow-visible">
        {/* Left Arrow Sliding Channel */}
        {showLeftArrow && (
          <button
            onClick={() => slide("left")}
            className="absolute left-0 top-0 bottom-4 w-12 z-40 bg-gradient-to-r from-brand-bg/95 via-brand-bg/60 to-transparent hover:from-brand-bg text-[#365947] flex items-center justify-center cursor-pointer transition-all duration-300 md:opacity-0 md:group-hover/row:opacity-100 backdrop-blur-[1px] hover:scale-x-105"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8 transform hover:scale-125 transition-transform duration-200" />
          </button>
        )}

        {/* Right Arrow Sliding Channel */}
        {showRightArrow && (
          <button
            onClick={() => slide("right")}
            className="absolute right-0 top-0 bottom-4 w-12 z-40 bg-gradient-to-l from-brand-bg/95 via-brand-bg/60 to-transparent hover:from-brand-bg text-[#365947] flex items-center justify-center cursor-pointer transition-all duration-300 md:opacity-0 md:group-hover/row:opacity-100 backdrop-blur-[1px] hover:scale-x-105"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-8 h-8 transform hover:scale-125 transition-transform duration-200" />
          </button>
        )}

        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x scroll-smooth no-scrollbar"
        >
          {shelf.books.map((book) => (
            <motion.div
              key={book.title}
              onClick={() => onBookClick(book)}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="snap-start shrink-0 w-60 border border-brand-border bg-[#FCFBF8] hover:bg-brand-surface hover:shadow-md transition-all duration-300 rounded-sm cursor-pointer flex flex-col overflow-hidden group/card text-left"
            >
              {/* Premium Aspect-Ratio Book Cover Poster Block */}
              <div className="relative w-full aspect-[2/3] shrink-0 overflow-hidden bg-brand-surface border-b border-brand-border/30 shadow-xs group-hover/card:border-brand-accent/20">
                <BookCoverImage
                  title={book.title}
                  isbn={book.isbn}
                  coverColor={book.coverColor}
                  coverTextColor={book.coverTextColor}
                  category={book.category}
                  author={book.author}
                  sizeClass="absolute inset-0 w-full h-full"
                  paddingClass="p-2"
                />
              </div>

              {/* Informational Shelf details */}
              <div className="p-3.5 flex flex-col justify-between flex-grow gap-2">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#365947] font-bold block">
                    {book.category}
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-brand-text line-clamp-1 leading-tight group-hover/card:text-[#365947] transition-colors duration-200">
                    {book.title}
                  </h4>
                  <span className="text-[10px] text-brand-muted font-serif italic block">
                    {book.author}
                  </span>
                </div>

                <div className="relative pt-0.5">
                  <p 
                    className="text-[10px] text-brand-muted/90 font-light line-clamp-2 leading-relaxed hover:text-[#365947] transition-colors cursor-help text-left"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      onHoverBook({
                        title: book.title,
                        synopsis: book.description || "",
                        rect
                      });
                    }}
                    onMouseLeave={() => onHoverBook(null)}
                  >
                    {book.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
