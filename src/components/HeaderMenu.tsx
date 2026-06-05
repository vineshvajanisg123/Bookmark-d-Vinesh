import { BookOpen, ArrowRight } from "lucide-react";

interface HeaderMenuProps {
  onHome: () => void;
  onBegin: () => void;
  activeScreen: number;
}

export default function HeaderMenu({ onHome, onBegin, activeScreen }: HeaderMenuProps) {
  const scrollToSection = (id: string) => {
    if (activeScreen !== 1) {
      onHome();
      // Wait for layout transition to welcome screen, then scroll smoothly
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E8E2D8] h-16 flex items-center px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Brand Logo & Title on the Left */}
        <div 
          onClick={onHome}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 select-none group"
        >
          <div className="w-8 h-8 rounded-full bg-[#365947] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-xs">
            <BookOpen className="text-white w-4 h-4" />
          </div>
          <div className="flex flex-col justify-center gap-0.5">
            <span className="font-serif font-semibold text-base md:text-lg tracking-tight text-[#1E1E1B] leading-none">
              Bookmarkd
            </span>
            <span className="block text-[8px] uppercase tracking-widest text-[#5E5A55]/75 font-mono leading-none">
              SANCTUARY SYSTEM
            </span>
          </div>
        </div>

        {/* Central Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-serif text-[#5E5A55]">
          <button 
            onClick={() => scrollToSection("features-section")} 
            className="hover:text-[#365947] cursor-pointer transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("my-bookshelf-section")} 
            className="hover:text-[#365947] cursor-pointer transition-colors"
          >
            My Bookshelf
          </button>
        </nav>

        {/* Action Button Space */}
        <div className="min-w-[110px] flex justify-end" />
      </div>
    </header>
  );
}
