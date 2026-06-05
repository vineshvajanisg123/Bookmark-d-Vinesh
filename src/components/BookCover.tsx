import React, { useState, useEffect } from "react";
import { getBookCover } from "../data/curatedBooks";

interface BookCoverProps {
  title: string;
  author: string;
  isbn?: string;
  coverColor?: string;
  coverTextColor?: string;
  category?: string;
  className?: string; // e.g. "w-full h-full" or specific dimensions
  paddingClass?: string; // padding for object-contain
}

// Session/static in-memory cache to prevent multiple fetches for the same session
const memoryCache: Record<string, string> = {};

export default function BookCover({
  title,
  author,
  isbn,
  coverColor = "#2C1B1B",
  coverTextColor = "#FDFCF7",
  category,
  className = "w-full h-full",
  paddingClass = "p-1"
}: BookCoverProps) {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Clean title/author for cache keys
  const cacheKey = `bookmarkd_cover_${title.toLowerCase().trim()}_${author.toLowerCase().trim()}`;

  useEffect(() => {
    // Reset state when inputs change
    setResolvedUrl(null);
    setImageLoaded(false);
    setImageError(false);

    // 1. Check Memory Cache
    if (memoryCache[cacheKey]) {
      setResolvedUrl(memoryCache[cacheKey]);
      return;
    }

    // 2. Check LocalStorage Cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        memoryCache[cacheKey] = cached;
        setResolvedUrl(cached);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    let isMounted = true;

    const fetchCover = async () => {
      // A handy sub-helper to extract images from Google Books API JSON
      const extractGoogleThumbnail = (data: any): string | null => {
        if (!data.items || data.items.length === 0) return null;
        for (const item of data.items) {
          const imageLinks = item.volumeInfo?.imageLinks;
          let imgUrl = imageLinks?.thumbnail || imageLinks?.smallThumbnail || imageLinks?.medium || imageLinks?.large;
          if (imgUrl) {
            // Force HTTPS to guarantee security and avoid mixed content blockages
            return imgUrl.replace("http://", "https://");
          }
        }
        return null;
      };

      try {
        // Step 3a: If ISBN is present, try Google Books by ISBN first (highest accuracy)
        if (isbn && isbn.trim().length > 3) {
          try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn.trim())}`);
            if (res.ok) {
              const data = await res.json();
              const url = extractGoogleThumbnail(data);
              if (url && isMounted) {
                setResolvedUrl(url);
                memoryCache[cacheKey] = url;
                localStorage.setItem(cacheKey, url);
                return;
              }
            }
          } catch (e) {
            console.warn("Google Books ISBN fetch failed, attempting title/author search...", e);
          }
        }

        // Step 3b: Try Google Books with precise Title and Author split query
        try {
          let query = `intitle:${encodeURIComponent(title.trim())}`;
          if (author && author.toLowerCase() !== "unknown author") {
            const shortAuthor = author.split(" ").slice(0, 2).join(" ");
            query += `+inauthor:${encodeURIComponent(shortAuthor)}`;
          }
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=3`);
          if (res.ok) {
            const data = await res.json();
            const url = extractGoogleThumbnail(data);
            if (url && isMounted) {
              setResolvedUrl(url);
              memoryCache[cacheKey] = url;
              localStorage.setItem(cacheKey, url);
              return;
            }
          }
        } catch (e) {
          console.warn("Google Books title/author fetch failed, trying title-only...", e);
        }

        // Step 3c: Try Google Books with Title search only (broader)
        try {
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title.trim())}&maxResults=3`);
          if (res.ok) {
            const data = await res.json();
            const url = extractGoogleThumbnail(data);
            if (url && isMounted) {
              setResolvedUrl(url);
              memoryCache[cacheKey] = url;
              localStorage.setItem(cacheKey, url);
              return;
            }
          }
        } catch (e) {
          console.warn("Google Books title-only fetch failed...", e);
        }

        // Step 3d: Try Open Library with explicit ?default=false so missing covers return 404
        if (isbn && isbn.trim().length > 3) {
          const olUrl = `https://covers.openlibrary.org/b/isbn/${isbn.trim()}-M.jpg?default=false`;
          // We can test if the URL responds or let the <img> onError handle it.
          // Let's set it as the resolved URL, and if the image fails, <img> onError will fallback to typographic layout.
          if (isMounted) {
            setResolvedUrl(olUrl);
            return;
          }
        }

        // Step 3e: Try Open Library list as final fallback
        const localCover = getBookCover(title, isbn);
        if (localCover && isMounted) {
          // Append ?default=false to local cover if it's openlibrary
          const finalLocal = localCover.includes("openlibrary.org") && !localCover.includes("?default=false")
            ? `${localLocalCover(localCover)}?default=false`
            : localCover;
          setResolvedUrl(finalLocal);
          return;
        }

      } catch (err) {
        console.error("All cover retrieval waves yielded errors for:", title, err);
      }
    };

    // Helper to safely append query string
    const localLocalCover = (url: string) => url;

    fetchCover();

    return () => {
      isMounted = false;
    };
  }, [title, author, isbn]);

  // Extract a clean short last name for the signature style
  const familyName = author && author.toLowerCase() !== "unknown author"
    ? author.split(" ").pop()
    : "Author";

  return (
    <div 
      className={`relative overflow-hidden shadow-md rounded-r-xs border border-[#E8E2D8]/40 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: coverColor
      }}
    >
      {/* Elegant CSS typographic layout (shown while loading, or as fallback if loading fails) */}
      {(!resolvedUrl || !imageLoaded || imageError) && (
        <div 
          className="absolute inset-0 flex flex-col justify-between p-3 border-l-4 border-black/25 select-none transition-all duration-300"
          style={{
            backgroundColor: coverColor,
            color: coverTextColor
          }}
        >
          <div className="space-y-1.5 text-left">
            {category && (
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-widest opacity-80 block whitespace-nowrap overflow-hidden text-ellipsis">
                {category}
              </span>
            )}
            <h5 className="font-serif text-[10px] md:text-sm font-semibold uppercase leading-tight line-clamp-3">
              {title}
            </h5>
          </div>
          <span className="font-serif text-[8px] md:text-[10px] italic opacity-85 block text-left">
            {familyName}
          </span>
        </div>
      )}

      {/* Real Cover Image rendered cleanly on top */}
      {resolvedUrl && !imageError && (
        <img 
          src={resolvedUrl} 
          alt={title} 
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover ${paddingClass} z-10 transition-opacity duration-500 hover:scale-[1.03] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
