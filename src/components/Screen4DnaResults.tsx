import { motion } from "motion/react";
import { Sparkles, Award, Compass, RefreshCw, Star } from "lucide-react";

interface Screen4DnaResultsProps {
  archetype: string;
  traits: string[];
  readingPace: string;
  genreBias: string;
  summary: string;
  insight: string;
  onContinue: () => void;
  onHome: () => void;
}

export default function Screen4DnaResults({
  archetype = "EVIDENCE SEEKER",
  traits = ["EVIDENCE-SEEKER", "GROWTH-ORIENTED", "PRACTICAL THINKER", "RESEARCH DRIVEN"],
  readingPace = "Medium Pace",
  genreBias = "Non-Fiction Lover",
  summary = "You enjoy actionable, evidence-based books that provide practical frameworks.",
  insight = "You gravitate toward literature forged under empirical heat. You enjoy actionable, evidence-based books that provide practical frameworks rather than motivational stories.",
  onContinue,
  onHome,
}: Screen4DnaResultsProps) {

  // Dynamic emoji mapper for Spotify Wrapped style traits
  const getTraitEmoji = (trait: string) => {
    const t = trait.toUpperCase();
    if (t.includes("EVIDENCE") || t.includes("SEEKER")) return "🧠";
    if (t.includes("GROWTH")) return "📈";
    if (t.includes("PRACTICAL") || t.includes("THINKER") || t.includes("BUILDER")) return "🎯";
    if (t.includes("FICTION") || t.includes("NON-FICTION") || t.includes("LITERATURE") || t.includes("LOVE")) return "📚";
    if (t.includes("PACE") || t.includes("SPEED") || t.includes("FAST") || t.includes("MEDIUM") || t.includes("SLOW")) return "⚡";
    if (t.includes("RESEARCH") || t.includes("DRIVEN") || t.includes("SYSTEM")) return "🔍";
    return "💡";
  };

  // Compile full DNA list for rendering
  const mappedTraits = [
    ...traits.map(t => ({
      label: t,
      emoji: getTraitEmoji(t),
      color: "from-amber-50 to-orange-100 border-[#E07A5F]/20 text-[#D0694D]"
    })),
    {
      label: genreBias,
      emoji: getTraitEmoji(genreBias),
      color: "from-[#365947]/5 to-[#365947]/10 border-[#365947]/20 text-[#365947]"
    },
    {
      label: readingPace,
      emoji: getTraitEmoji(readingPace),
      color: "from-blue-50 to-indigo-100 border-indigo-100 text-indigo-700"
    }
  ].slice(0, 6);

  return (
    <div className="py-8 px-6 md:px-12 max-w-6xl mx-auto flex flex-col justify-between min-h-[85vh] animate-fadeIn" id="results-screen">
      {/* Header Info */}
      <header className="flex justify-between items-center border-b border-[#E8E2D8]/80 pb-4 mb-8">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#365947] font-bold">
          <Award className="w-4 h-4 text-[#E07A5F]" />
          LITERARY DNA DECRYPTED
        </div>
        <button
          onClick={onHome}
          className="font-mono text-[9px] tracking-widest text-brand-muted hover:text-[#E07A5F] transition-all uppercase font-bold flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" /> Restart Test
        </button>
      </header>

      {/* Main Wrapped Experience Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch my-auto pb-6">
        
        {/* Left Card: The Spotify Wrapped Styled "Your Reading DNA" Visual Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#1E2522] text-[#F8F6F1] rounded-2xl p-8 relative overflow-hidden shadow-2xl min-h-[460px] border border-[#2D3833]/50">
          
          {/* Subtle starburst glow background overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E07A5F]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#365947]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Sparkly corner stars */}
          <div className="absolute top-4 right-4 opacity-30 select-none">
            <Star className="w-5 h-5 fill-[#E07A5F] text-[#E07A5F] animate-pulse" />
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#E07A5F] font-bold block mb-1">
              BOOKMARKD // WRAPPED 2026
            </span>
            <h1 className="font-serif italic text-4xl font-extrabold tracking-tight text-white leading-tight">
              Your Reading DNA
            </h1>
            <p className="font-mono text-[9.5px] uppercase tracking-widest text-[#F8F6F1]/50 mt-1 pb-4 border-b border-[#313C37]">
              LITERARY MAP COORDINATES
            </p>
          </div>

          {/* Spotify Wrapped List */}
          <div className="my-6 space-y-3.5">
            {mappedTraits.map((trait, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 * idx, duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-3.5 bg-[#262F2B] border border-[#313D38] p-3 rounded-xl hover:bg-[#2D3833]/85 transition-all group"
              >
                <div className="text-2xl bg-white/5 w-11 h-11 rounded-lg flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                  {trait.emoji}
                </div>
                <div>
                  <span className="font-mono text-[8px] text-[#E07A5F] tracking-widest font-bold uppercase block">
                    TRAIT 0{idx + 1}
                  </span>
                  <span className="font-serif text-sm font-semibold tracking-wide text-white">
                    {trait.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between border-t border-[#313C37] pt-4 mt-2">
            <div>
              <p className="font-mono text-[8px] text-[#F8F6F1]/40 uppercase tracking-widest leading-none">PRIMARY TYPE</p>
              <p className="font-serif text-sm font-bold text-[#E07A5F] tracking-wide uppercase mt-1">
                {archetype.replace(/_/g, " ")}
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-xs">
              🧬
            </div>
          </div>
        </div>

        {/* Right Content Column: AI Insight ("WOW moment") & Book finder trigger */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pl-0 lg:pl-4">
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-[#E07A5F] tracking-widest uppercase font-bold block">
              PORTRAIT OF A WRITER'S COUNTERPART
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-text font-bold leading-tight">
              You seek the architectural truth in every page.
            </h2>
            <p className="font-sans text-sm text-brand-muted font-light leading-relaxed">
              We analyzed your literary decisions, filter patterns, and emotional vectors. Here is the blueprint of your attention:
            </p>
          </div>

          {/* Precise Editorial WOW Block */}
          <div className="relative border-l-3 border-[#365947] pl-6 py-2.5 bg-[#365947]/5 rounded-r-xl pr-4">
            <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#365947] font-bold block mb-1">
              AI LITERARY INSIGHT
            </span>
            <blockquote className="font-serif italic text-lg leading-relaxed text-brand-text">
              "{insight}"
            </blockquote>
          </div>

          {/* Quick Summary card */}
          <div className="bg-brand-surface border border-brand-border/60 p-5 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">👁️</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">THE SYNTHESIS</span>
            </div>
            <p className="font-serif text-sm text-brand-muted leading-relaxed font-light">
              <strong>Core summary:</strong> {summary} Rather than raw distraction, you require books that respect your cognitive intelligence, serving up reliable anchors for daily applications.
            </p>
          </div>

          {/* FIND MY NEXT BOOK BUTTON ACTION */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
            <button
              id="find-next-book-btn"
              onClick={onContinue}
              className="w-full sm:w-auto px-8 py-4.5 bg-[#E07A5F] hover:bg-[#D0694D] text-white font-serif text-sm font-semibold rounded-full flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
            >
              <Compass className="w-4.5 h-4.5 text-white" />
              Find My Next Book
            </button>
            <span className="font-mono text-[10px] text-brand-muted/60 tracking-wider uppercase text-center sm:text-left">
              ➔ Custom curating exactly 5 matches
            </span>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="border-t border-brand-border/40 pt-4 mt-8 text-center text-[9px] font-mono text-brand-muted uppercase tracking-wider">
        © 2026 BOOKMARKD SANCTUARY LLC. ZERO COGNITIVE NOISE guaranteed.
      </footer>
    </div>
  );
}
