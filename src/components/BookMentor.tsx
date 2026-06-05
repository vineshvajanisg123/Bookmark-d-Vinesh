import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw, BookOpen, User, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export default function BookMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize companion conversation with session-persistence
  useEffect(() => {
    const saved = localStorage.getItem("bookmarkd_mentor_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hydrated = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(hydrated);
        return;
      } catch (e) {
        // ignore
      }
    }
    
    // Default system welcome sequence
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: "Tell me, what are you hoping a book will do for you right now?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Save changes to localStorage
  const saveChatHistory = (history: Message[]) => {
    localStorage.setItem("bookmarkd_mentor_chat", JSON.stringify(history));
  };

  // Scroll to bottom smoothly when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    if (!customText) {
      setInputText("");
    }
    setError(null);

    // Append user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    saveChatHistory(updatedHistory);
    setIsLoading(true);

    try {
      // Map history to server payloads
      const payloadMessages = updatedHistory.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/book-mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        throw new Error("I had a small moment of reflection break. Would you mind repeating that?");
      }

      const data = await res.json();
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "I am reflecting on your thoughts. Let's delve deeper.",
        timestamp: new Date(),
      };

      const finalHistory = [...updatedHistory, assistantMessage];
      setMessages(finalHistory);
      saveChatHistory(finalHistory);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to communicate with mentor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setShowConfirmReset(true);
  };

  const confirmResetChat = () => {
    const fresh: Message[] = [
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        text: "Tell me, what are you hoping a book will do for you right now?",
        timestamp: new Date(),
      }
    ];
    setMessages(fresh);
    saveChatHistory(fresh);
    setError(null);
    setShowConfirmReset(false);
  };

  // Pre-formatted quick reply buttons matching actual mentor persona paths
  const selectQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  // Advanced custom markdown renderer for editorial design formatting of books
  const renderMessageContent = (text: string) => {
    if (!text) return null;

    // Check if the block is a series of recommendations
    const hasBookRecommendations = text.includes("###") || text.includes("Why this fits") || text.includes("Ideal if you want");

    if (!hasBookRecommendations) {
      return <p className="font-serif leading-relaxed text-sm text-[#1E1E1B] whitespace-pre-wrap">{text}</p>;
    }

    // Parse structure line by line
    const lines = text.split("\n");
    const preLines: string[] = [];
    const postLines: string[] = [];
    const books: {
      title: string;
      author: string;
      whyFits: string;
      experience: string;
      ideal: string;
    }[] = [];
    
    let currentBook: typeof books[number] | null = null;
    let finishedBooks = false;

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const line = rawLine.trim();

      if (line.startsWith("###")) {
        // Create new book card
        if (currentBook) {
          books.push(currentBook);
        }
        
        const cleanLine = line.replace(/###\s*\**/g, "").replace(/\**/g, "");
        const parts = cleanLine.split("—");
        const title = parts[0]?.trim() || "Suggested Book";
        const author = parts[1]?.trim() || "";

        currentBook = {
          title,
          author,
          whyFits: "",
          experience: "",
          ideal: ""
        };
        continue;
      }

      if (currentBook) {
        const cleanLine = line.replace(/^[\s\-•\*]*/, "").trim();
        const lowerClean = cleanLine.toLowerCase();
        
        if (lowerClean.includes("why this fits you")) {
          const colonIndex = cleanLine.indexOf(":");
          currentBook.whyFits = colonIndex !== -1 ? cleanLine.substring(colonIndex + 1).trim() : cleanLine;
        } else if (lowerClean.includes("what you'll experience") || lowerClean.includes("what you’ll experience")) {
          const colonIndex = cleanLine.indexOf(":");
          currentBook.experience = colonIndex !== -1 ? cleanLine.substring(colonIndex + 1).trim() : cleanLine;
        } else if (lowerClean.includes("ideal if you want")) {
          const colonIndex = cleanLine.indexOf(":");
          currentBook.ideal = colonIndex !== -1 ? cleanLine.substring(colonIndex + 1).trim() : cleanLine;
        } else if (line === "" || lowerClean.includes("if none of these") || lowerClean.includes("explore until we find")) {
          if (line !== "") {
            finishedBooks = true;
            postLines.push(rawLine);
            books.push(currentBook);
            currentBook = null;
          }
        } else {
          // If the line is an ornament, description continuing, or un-bulleted line,
          // check if we hit the conversational exit
          if (lowerClean.includes("explore") || lowerClean.includes("tell me what feels off")) {
            finishedBooks = true;
            postLines.push(rawLine);
            books.push(currentBook);
            currentBook = null;
          }
        }
      } else {
        if (finishedBooks) {
          postLines.push(rawLine);
        } else {
          preLines.push(rawLine);
        }
      }
    }

    // Push final book if loop completes
    if (currentBook) {
      books.push(currentBook);
    }

    const preText = preLines.join("\n").trim();
    const postText = postLines.join("\n").trim();

    return (
      <div className="space-y-4">
        {/* Preamble Introductory Text */}
        {preText && (
          <p className="font-serif leading-relaxed text-sm text-[#1E1E1B] font-medium whitespace-pre-wrap">
            {preText}
          </p>
        )}

        {/* Recommended Books List - Styled to be beautifully clear and highly visible */}
        {books.length > 0 && (
          <div className="space-y-5 pt-1">
            {books.map((book, idx) => (
              <div 
                key={idx} 
                className="bg-white border-2 border-[#365947]/30 rounded-xl overflow-hidden shadow-xs hover:border-[#365947]/50 transition-all relative"
              >
                {/* Elegant accent block representing classic letterpress book spine */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#365947]" />
                
                <div className="p-3.5 pl-5 space-y-3">
                  {/* Book Title & Author Header */}
                  <div className="flex items-start gap-2">
                    <div className="w-5.5 h-7 rounded-xs bg-[#365947] flex items-center justify-center shrink-0 border border-black/10 shadow-3xs mt-0.5">
                      <BookOpen className="text-white w-2.5 h-2.5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-extrabold text-sm text-[#1E1E1B] leading-snug">
                        {book.title}
                      </h4>
                      {book.author && (
                        <p className="font-serif text-xs text-[#5E5A55] font-semibold italic mt-0.5">
                          By {book.author}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organized Details with highly distinct contrast-optimized layout tags */}
                  <div className="space-y-2.5 pt-2 border-t border-[#E8E2D8]">
                    {book.whyFits && (
                      <div className="space-y-0.5 text-left">
                        <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#365947] font-extrabold block">
                          Why this fits you
                        </span>
                        <p className="text-xs text-[#1E1E1B] font-serif leading-relaxed font-semibold">
                          {book.whyFits}
                        </p>
                      </div>
                    )}

                    {book.experience && (
                      <div className="space-y-0.5 pt-1.5 border-t border-dashed border-[#E8E2D8] text-left">
                        <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#E07A5F] font-extrabold block">
                          What you'll experience
                        </span>
                        <p className="text-xs text-[#5E5A55] font-serif italic leading-relaxed font-medium">
                          {book.experience}
                        </p>
                      </div>
                    )}

                    {book.ideal && (
                      <div className="mt-2 p-2 bg-[#FCFBF8] border border-[#E8E2D8] rounded-lg flex items-center gap-1.5 text-left">
                        <span className="shrink-0 w-1 h-1 bg-[#365947] rounded-full animate-pulse" />
                        <p className="text-[10px] font-sans font-semibold text-[#365947] leading-tight">
                          <span className="font-mono text-[8px] uppercase tracking-wide text-[#5E5A55] font-extrabold mr-1">Ideal if you want:</span>
                          {book.ideal}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Postamble concluding mentorship instruction */}
        {postText && (
          <p className="font-serif italic leading-relaxed text-xs text-[#5E5A55] pt-2 whitespace-pre-wrap">
            {postText}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button (FAB) near bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mb-4 w-[340px] sm:w-[400px] h-[520px] bg-[#FAF6F0] rounded-2xl border border-[#E8E2D8] shadow-2xl flex flex-col overflow-hidden relative"
              id="book-mentor-pane"
            >
              {/* Cover spine ornament design highlight */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#365947] z-10" />

              {/* Custom State-Controlled Confirmation Overlay for Iframe Robustness */}
              <AnimatePresence>
                {showConfirmReset && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#FAF6F0]/95 backdrop-blur-[2px] z-40 flex flex-col items-center justify-center p-6 text-center rounded-2xl"
                  >
                    <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-lg max-w-[280px] space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center mx-auto">
                        <RefreshCw className="w-4 h-4 animate-spin-slow text-[#365947]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif font-extrabold text-sm text-[#1E1E1B]">Restart Dialogue?</h4>
                        <p className="text-[11px] text-[#5E5A55] font-serif leading-relaxed">
                          This will erase your current session and let you begin a new dialogue flow with the Book Mentor.
                        </p>
                      </div>
                      <div className="flex gap-2 pt-1 w-full">
                        <button
                          onClick={() => setShowConfirmReset(false)}
                          className="flex-1 px-3 py-2 bg-neutral-50 hover:bg-neutral-150 border border-neutral-200 text-[#5E5A55] text-[11px] font-sans font-bold rounded-lg transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmResetChat}
                          className="flex-1 px-3 py-2 bg-[#365947] hover:bg-[#2E4C3D] text-white text-[11px] font-sans font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                        >
                          Restart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header block with elegant library styling */}
              <header className="py-4 pl-6 pr-4 bg-white border-b border-[#E8E2D8] flex items-center justify-between relative shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#365947]/10 flex items-center justify-center shrink-0 border border-[#365947]/15">
                    <Sparkles className="w-4 h-4 text-[#365947]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#1E1E1B] flex items-center gap-1.5 leading-none">
                      Book Mentor
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    </h3>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-[#5E5A55]/80 mt-0.5">AI Reading Companion</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Reset/Restart companion chat */}
                  <button
                    onClick={handleResetChat}
                    className="p-1 px-1.5 rounded-sm hover:bg-neutral-100 text-[#5E5A55] hover:text-[#365947] transition-all cursor-pointer"
                    title="Restart Conversation"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  {/* Close conversation panel */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-sm hover:bg-neutral-100 text-[#5E5A55] hover:text-[#E07A5F] transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </header>

              {/* Chat Message Scroll Window */}
              <div className="flex-1 overflow-y-auto p-4 pl-6 space-y-4 custom-scrollbar bg-[#FAF6F0]/50">
                {messages.map((msg) => {
                  const isAssistant = msg.role === "assistant";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isAssistant ? "max-w-[94%] mr-auto text-left" : "max-w-[85%] ml-auto flex-row-reverse text-right"}`}
                    >
                      {/* Avatar sphere representation */}
                      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border text-[10px] ${
                        isAssistant 
                          ? "bg-[#365947] text-white border-[#365947]/10" 
                          : "bg-white text-brand-text border-[#E8E2D8]"
                      }`}>
                        {isAssistant ? <Sparkles className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className={`p-3.5 rounded-2xl shadow-2xs text-left ${
                          isAssistant 
                            ? "bg-white text-brand-text rounded-tl-xs border border-[#E8E2D8]" 
                            : "bg-[#365947] text-white rounded-tr-xs"
                        }`}>
                          {isAssistant ? (
                            renderMessageContent(msg.text)
                          ) : (
                            <p className="font-sans text-xs leading-relaxed font-light whitespace-pre-wrap">{msg.text}</p>
                          )}
                        </div>
                        <span className="block text-[8px] font-mono tracking-tight text-[#A29E99] px-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Loading state indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 max-w-[85%] mr-auto">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[#365947] text-white border border-[#365947]/10">
                      <Sparkles className="w-3 h-3 animate-spin duration-3000" />
                    </div>
                    <div className="bg-white text-[#5E5A55]/90 border border-[#E8E2D8] p-3 rounded-2xl rounded-tl-xs flex items-center gap-2">
                      <span className="text-[11px] font-serif italic">Mentor is reflecting on your tastes</span>
                      <div className="flex gap-1">
                        <span className="w-1 h-1 bg-[#365947] rounded-full animate-bounce delay-100" />
                        <span className="w-1 h-1 bg-[#365947] rounded-full animate-bounce delay-200" />
                        <span className="w-1 h-1 bg-[#365947] rounded-full animate-bounce delay-300" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error warning notification state */}
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex gap-2 items-start">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Whispering echo failed</p>
                      <p className="opacity-90">{error}</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Multi-path suggestions checklist wrapper (suggest topics quickly) */}
              {messages.length === 1 && (
                <div className="px-5 py-2 pl-7 bg-[#FCFBF8] border-t border-b border-[#E8E2D8]/60 flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => selectQuickPrompt("I don't know what I want.")}
                    className="text-[10px] font-serif italic text-brand-muted hover:text-[#365947] px-2.5 py-1 bg-white hover:bg-neutral-50 rounded-full border border-brand-border/80 transition-colors shadow-2xs text-left cursor-pointer"
                  >
                    "I don't know what I want."
                  </button>
                  <button 
                    onClick={() => selectQuickPrompt("Recommend anything.")}
                    className="text-[10px] font-serif italic text-brand-muted hover:text-[#365947] px-2.5 py-1 bg-white hover:bg-neutral-50 rounded-full border border-brand-border/80 transition-colors shadow-2xs text-left cursor-pointer"
                  >
                    "Recommend anything."
                  </button>
                  <button 
                    onClick={() => selectQuickPrompt("I haven't read anything in years.")}
                    className="text-[10px] font-serif italic text-brand-muted hover:text-[#365947] px-2.5 py-1 bg-white hover:bg-neutral-50 rounded-full border border-brand-border/80 transition-colors shadow-2xs text-left cursor-pointer"
                  >
                    "I haven't read in years."
                  </button>
                  <button 
                    onClick={() => selectQuickPrompt("I'm feeling sad.")}
                    className="text-[10px] font-serif italic text-brand-muted hover:text-[#365947] px-2.5 py-1 bg-white hover:bg-neutral-50 rounded-full border border-brand-border/80 transition-colors shadow-2xs text-left cursor-pointer"
                  >
                    "I'm feeling sad."
                  </button>
                </div>
              )}

              {/* Chat footer text inputs */}
              <footer className="p-3 pl-6 bg-white border-t border-[#E8E2D8] flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Share details or reply to mentor..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1 bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-[#E8E2D8] rounded-full px-4 py-2 text-xs font-serif text-brand-text placeholder-brand-muted/40 focus:outline-none focus:border-[#365947]/70 transition-all shadow-2xs"
                />
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputText.trim()}
                  className="w-8 h-8 rounded-full bg-[#365947] hover:bg-[#2E4C3D] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Action Sphere Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 bg-[#365947] hover:bg-[#2E4C3D] text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer z-50 group border border-[#FCFBF8]/15"
          id="book-mentor-fab"
        >
          <Sparkles className="w-4 h-4 text-white shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-serif font-semibold tracking-wide">Talk to Book Mentor</span>
        </motion.button>
      </div>
    </>
  );
}
