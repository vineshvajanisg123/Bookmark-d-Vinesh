import { useState } from "react";
import { Book } from "../types";
import { X, ShoppingBag, ArrowUpRight, ArrowLeft } from "lucide-react";
import BookCover from "./BookCover";

interface Screen7MyBookshelfProps {
  libraryBooks: Book[];
  onRemoveBook: (book: Book) => void;
  onHome: () => void;
  onExplore: () => void;
}

export default function Screen7MyBookshelf({
  libraryBooks,
  onRemoveBook,
  onHome,
  onExplore,
}: Screen7MyBookshelfProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = libraryBooks.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-12 lg:px-24 flex flex-col justify-between animate-fadeIn min-h-[80vh]" id="full-library-screen">
      <div className="space-y-8">
        {/* Back and Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8E2D8] hover:border-[#365947] rounded-full text-xs font-serif text-[#1E1E1B] bg-white transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#365947]" />
            Back to Sanctuary Home
          </button>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-bold">
            Personal Registry
          </span>
        </div>

        {/* Title and Intro */}
        <div className="space-y-2 border-b border-[#E8E2D8]/60 pb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-brand-text">My Bookshelf</h1>
          <p className="font-serif italic text-brand-muted text-sm max-w-xl">
            A quiet collection of volumes you have saved during your stay in the Discovery Rooms. No metrics, no social pressure. Just your path.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">
            Total Saved: <span className="text-[#365947] font-bold font-serif text-sm">{libraryBooks.length}</span> Volumes
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search saved titles or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#E8E2D8] rounded-sm px-3 py-2 text-xs font-serif text-brand-text placeholder-brand-muted/40 focus:outline-none focus:border-[#365947]/70 shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-brand-muted hover:text-brand-accent"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Library books grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#E8E2D8] bg-[#FCFBF8] rounded-2xl p-8 max-w-2xl mx-auto space-y-4">
            <span className="font-serif text-lg italic text-[#5E5A55] block">
              {searchTerm ? "No local matches in your sanctuary registry." : "Your personal bookshelf is quiet."}
            </span>
            <p className="text-xs text-brand-muted font-sans font-light leading-relaxed max-w-sm mx-auto">
              {searchTerm 
                ? "Try searching for a different title or author, or reset your query to view everything." 
                : "Step into the Discovery Rooms, choose a stack shelf, and add any titles that call to you."}
            </p>
            {!searchTerm && (
              <button
                onClick={onExplore}
                className="px-6 py-3 bg-[#365947] hover:bg-[#2E4C3D] text-white text-xs font-sans font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Discover the Bookshelf
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((book) => {
              return (
                <div
                  key={book.title}
                  className="bg-white border border-[#E8E2D8] hover:border-[#365947]/30 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveBook(book)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 border border-[#E8E2D8] hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer z-20 shadow-xs"
                    title="Remove from Bookshelf"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-4">
                    {/* Cover Render representation */}
                    <div className="flex justify-center bg-[#FCFBF8] py-4 rounded-xl border border-[#E8E2D8]/40">
                      <div className="w-[6.8rem] h-[9.3rem] relative shadow-md rounded-r-xs overflow-hidden border border-[#E8E2D8]/45 animate-fade-in">
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
                    </div>

                    <div className="space-y-1">
                      <span className="text-[7.5px] uppercase tracking-widest font-mono text-[#E07A5F] font-bold bg-[#E07A5F]/5 rounded-sm px-1.5 py-0.5 border border-[#E07A5F]/15">
                        {book.category}
                      </span>
                      <h3 className="font-serif text-sm font-semibold text-brand-text line-clamp-1 pt-1.5" title={book.title}>
                        {book.title}
                      </h3>
                      <p className="font-serif text-brand-muted text-xs">
                        By {book.author}
                      </p>
                      <p className="font-sans text-[11px] text-brand-muted leading-relaxed font-light line-clamp-2 pt-1">
                        {book.description || "A custom selected title stored in your private reading cache."}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#E8E2D8]/50 pt-4 mt-4 flex items-center justify-between">
                    <a
                      href={book.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(book.title + " " + book.author)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-[#365947] hover:text-[#2E4C3D] group cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      Acquire Volume
                      <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="border-t border-brand-border/40 pt-4 mt-20 text-center text-[10px] font-mono text-brand-muted tracking-widest">
        PRIVATE SANCTUARY REGISTRY • NO PRESSURES • SECURE STORAGE
      </footer>
    </div>
  );
}
