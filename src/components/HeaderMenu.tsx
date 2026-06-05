import { BookOpen } from "lucide-react";

interface HeaderMenuProps {
  onHome: () => void;
  onBegin: () => void;
  onBookshelf: () => void;
  activeScreen: number;
}

export default function HeaderMenu({ onHome, onBegin, onBookshelf, activeScreen }: HeaderMenuProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E8E2D8] h-16 flex items-center px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Brand Logo & Title on the Left */}
        <div 
          onClick={onHome}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90 select-none group"
        >
          <div className="w-8 h-8 rounded-full bg-[#365947] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-xs">
            <BookOpen className="text-white w-4 h-4" />
          </div>
          <div className="flex flex-col justify-center gap-0.5">
            <span className="font-serif font-semibold text-sm md:text-lg tracking-tight text-[#1E1E1B] leading-none">
              Bookmarkd
            </span>
            <span className="block text-[7px] md:text-[8px] uppercase tracking-widest text-[#5E5A55]/75 font-mono leading-none">
              SANCTUARY SYSTEM
            </span>
          </div>
        </div>

        {/* Central Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 text-[11px] sm:text-xs font-serif text-[#5E5A55]">
          <button 
            onClick={onHome} 
            className={`hover:text-[#365947] cursor-pointer transition-colors pb-0.5 ${
              activeScreen === 1 ? "text-[#365947] font-bold border-b-2 border-[#365947]" : "border-b-2 border-transparent"
            }`}
          >
            Home
          </button>
          <button 
            onClick={onBegin} 
            className={`hover:text-[#365947] cursor-pointer transition-colors pb-0.5 ${
              activeScreen === 2 ? "text-[#365947] font-bold border-b-2 border-[#365947]" : "border-b-2 border-transparent"
            }`}
          >
            My Reading DNA
          </button>
          <button 
            onClick={onBookshelf} 
            className={`hover:text-[#365947] cursor-pointer transition-colors pb-0.5 ${
              activeScreen === 7 ? "text-[#365947] font-bold border-b-2 border-[#365947]" : "border-b-2 border-transparent"
            }`}
          >
            My Bookshelf
          </button>
        </nav>

        {/* Action Button Space / Balance offset */}
        <div className="hidden sm:block min-w-[70px] md:min-w-[110px]" />
      </div>
    </header>
  );
}
