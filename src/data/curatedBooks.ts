import { Book, CuratedShelf } from "../types";

export const POPULAR_BOOKS: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Personal Growth",
    description: "James Clear presents a masterfully structured manual on how tiny, microscopic adjustments compound over time into massive personal and professional transformations. By explaining the neurological loop of cue, craving, response, and reward, Clear provides a highly practical framework to automate good routines and systematically dismantle self-sabotaging behaviors, showing that success is a product of daily systems rather than once-in-a-lifetime goals.",
    coverColor: "#2C3E35",
    coverTextColor: "#F1EFEA",
    amazonUrl: "https://www.amazon.com/s?k=Atomic+Habits+James+Clear"
  },
  {
    title: "The Courage To Be Disliked",
    author: "Ichiro Kishimi & Fumitake Koga",
    category: "Philosophy",
    description: "An elegant, dialogue-based philosophical exploration of Adlerian psychology. Through a rich conversation between a philosopher and an anxious young man, this book delivers profound lessons on self-acceptance, interpersonal freedom, and living fully in the present. It argues that we are not defined by past trauma, but by the meaning we assign to it, and that true freedom requires the courage to be disliked by others.",
    coverColor: "#1B2A3A",
    coverTextColor: "#EFECE6",
    amazonUrl: "https://www.amazon.com/s?k=The+Courage+To+Be+Disliked"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Decision Making",
    description: "Daniel Kahneman's seminal masterwork maps the twin cognitive systems that govern human judgment and choice. System 1 operates automatically and instinctively, fueling quick snap-judgments and hidden emotional biases, while System 2 is slow, deliberate, and logical. By unravelling how these systems interact, Kahneman equips readers with the mental frameworks to identify cognitive traps, make wiser financial and personal decisions, and master systemic bias.",
    coverColor: "#3F2E2E",
    coverTextColor: "#FAF6F0",
    amazonUrl: "https://www.amazon.com/s?k=Thinking+Fast+and+Slow"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Personal Growth",
    description: "Cal Newport delivers a rigorous, unsentimental manifesto on the supreme commercial and creative value of deep, uninterrupted concentration. In a modern economy flooded with constant shallow notifications and status messages, Newport argues that the ability to focus intensely on complex tasks is becoming an increasingly rare and highly rewarded skillset. He shares concrete strategies to build cognitive endurance and structure your professional schedule.",
    coverColor: "#2D2635",
    coverTextColor: "#ECE9E2",
    amazonUrl: "https://www.amazon.com/s?k=Deep+Work+Cal+Newport"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    description: "Yuval Noah Harari's sweeping, provocative narrative traces the remarkable timeline of Homo sapiens from an insignificant African ape to the dominant planetary power. Combining history, biology, and sociology, Harari explores how shared intersubjective myths—such as money, human rights, and corporations—have enabled large-scale human cooperation, reshaping the natural ecosystem and charting our species toward a highly complex scientific and technological future.",
    coverColor: "#553F2D",
    coverTextColor: "#FCFAF6",
    amazonUrl: "https://www.amazon.com/s?k=Sapiens+Yuval+Noah+Harari"
  },
  {
    title: "Quiet",
    author: "Susan Cain",
    category: "Psychology",
    description: "Susan Cain conducts a beautiful, research-backed defense of introversion in a high-stimulus society that can never seem to stop speaking. Cain proves that our cultural bias toward the 'Extrovert Ideal' has systematically undervalued the quiet power, creativity, and deep analytical capabilities of introverted thinkers. Through compelling case studies, she illustrates how some of humanity's greatest ideas and leadership milestones were conceived in solitude and quiet focus.",
    coverColor: "#4B564F",
    coverTextColor: "#FBF7F0",
    amazonUrl: "https://www.amazon.com/s?k=Quiet+Susan+Cain"
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Philosophy & Psychology",
    description: "Viktor Frankl’s transcendent psychological memoir details his harrowing survival in Nazi concentration camps, offering an unshakeable model of inner resilience. Frankl presents Logotherapy, arguing that our primary drive is not pleasure or power, but the voluntary pursuit of meaning. He demonstrates that even in the most brutal conditions, humans retain the ultimate freedom: to choose their attitude and find purpose in suffering.",
    coverColor: "#1E1E24",
    coverTextColor: "#F4F1EA",
    amazonUrl: "https://www.amazon.com/s?k=Mans+Search+for+Meaning+Frankl"
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    category: "Business Thinking",
    description: "Phil Knight's candid, deeply human memoir details the chaotic, unstable journey of building Nike from a desperate $50 loan into a dominant global cultural force. Eschewing standard polished corporate narratives, Knight shares the terrifying liquidity crises, supply-chain bottlenecks, and litigation battles that threatened his venture at every turn, of a ragtag group of misfits bonded by a passionate devotion to sports and absolute survival.",
    coverColor: "#613125",
    coverTextColor: "#F9F6EE",
    amazonUrl: "https://www.amazon.com/s?k=Shoe+Dog+Phil+Knight"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business Thinking",
    description: "Peter Thiel delivers a sharp, contrarian handbook on innovation, startup philosophy, and forecasting the future. Thiel argues that true progress comes from creating vertical monopolies ('going from 0 to 1' by inventing new technology) rather than copying existing formulas. He outlines frameworks for evaluating technology, building high-performing core teams, and cultivating strategic monopolies that secure compounding long-term profits.",
    coverColor: "#2A2A2D",
    coverTextColor: "#EFECE6",
    amazonUrl: "https://www.amazon.com/s?k=Zero+to+One+Peter+Thiel"
  },
  {
    title: "Stolen Focus",
    author: "Johann Hari",
    category: "Psychology",
    description: "Johann Hari investigates the alarming cognitive crisis of our declining attention spans, proving that our focus hasn't just been lost—it was stolen by structural modern forces. From tech monopolies designing addictive algorithms to chronic sleep deficits and nutrient deplete diets, Hari shares a comprehensive, evidence-rich diagnosis of why our minds are hyper-stimulated, detailing how we can reclaim deep attention collectively and individually.",
    coverColor: "#45314D",
    coverTextColor: "#F8F6F1",
    amazonUrl: "https://www.amazon.com/s?k=Stolen+Focus+Johann+Hari"
  },
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    category: "Creativity",
    description: "Rick Rubin delivers a warm, zen-like guide exploring the fundamental nature of art and creative discovery. Rubin teaches that creativity is not a rare, exclusive gift reserved for professional artists, but a natural pathway of human awareness and listening. By offering short, meditative chapters on pure attention, letting go of expectations, and trusting your intuition, he provides a comforting sanctuary for creators seeking to align with artistic truth.",
    coverColor: "#111111",
    coverTextColor: "#FFFFFF",
    amazonUrl: "https://www.amazon.com/s?k=The+Creative+Act+Rick+Rubin"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    category: "Biography",
    description: "An unforgettable memoir of self-reinvention and survival, tracing a girl who stepped into a classroom for the first time at age seventeen. Westover teaches herself enough mathematics and grammar to gain admission to Brigham Young University, embarking on a quest for knowledge that takes her to Cambridge and Harvard, exploring the profound cost of self-reinvention.",
    coverColor: "#584236",
    coverTextColor: "#F7F3EB",
    amazonUrl: "https://www.amazon.com/s?k=Educated+Tara+Westover"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    description: "Paulo Coelho’s parabolic adventure follows Santiago, an Andalusian shepherd boy who journeys to the Egyptian pyramids in search of wordly treasure. Along his quest, Santiago learns to listen to his heart, read the omens of the desert, and recognize that the ultimate treasure lies in seeking one's 'Personal Legend', delivering a comforting, allegorical message of courage, spiritual self-trust, and destiny.",
    coverColor: "#845B25",
    coverTextColor: "#FCFAF2",
    amazonUrl: "https://www.amazon.com/s?k=The+Alchemist+Paulo+Coelho"
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    category: "Fiction",
    description: "Hermann Hesse’s exquisite, meditative novel follows Siddhartha, a wealthy young Brahmin in ancient India, who abandons his wealth to seek ultimate spiritual enlightenment. Exploring the extremes of asceticism, cold intellect, sensory indulgence, and commerce, Siddhartha eventually discovers that wisdom cannot be taught through words, but must be experienced directly, finding eternal peace on a quiet river ferry boat.",
    coverColor: "#50293C",
    coverTextColor: "#F7F5F0",
    amazonUrl: "https://www.amazon.com/s?k=Siddhartha+Hermann+Hesse"
  },
  {
    title: "Blink",
    author: "Malcolm Gladwell",
    category: "Decision Making",
    description: "Malcolm Gladwell investigates the power of the subconscious mind to make split-second, highly accurate snap judgments in the blink of an eye. Gladwell explores the psychology of intuition—proving how experts can instantly spot a forged sculpture or predict a divorce—while also warning readers when our rapid, subconscious filtering system is poisoned by prejudice, stress, or sensory overload.",
    coverColor: "#1F3B2E",
    coverTextColor: "#F6F3EB",
    amazonUrl: "https://www.amazon.com/s?k=Blink+Malcolm+Gladwell"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Fiction",
    description: "Frank Herbert’s majestic, ecological space opera is set on Arrakis, a harsh desert planet containing the universe's most precious spice. Exploring themes of imperial greed, messianic complexes, environmental stewardship, and human evolutionary potential, Herbert follows young Paul Atreides as he navigates political betrayal and aligns with the desert's native Fremen to claim a cosmic destiny, making simple sci-fi look small.",
    coverColor: "#69472A",
    coverTextColor: "#FAF6F1",
    amazonUrl: "https://www.amazon.com/s?k=Dune+Frank+Herbert"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    description: "F. Scott Fitzgerald’s dazzling, tragic masterpiece offers a devastating critique of the American Dream during the roaring twenties. Set on the lavish, party-filled shores of Long Island, the story traces Jay Gatsby’s obsessive, romantic pursuit of his lost love Daisy Buchanan. Through gorgeous prose, Fitzgerald exposes the moral decay, social exclusion, and crushing disillusionment hidden behind the era's glittering jazz facades.",
    coverColor: "#1A3625",
    coverTextColor: "#FCFAF4",
    amazonUrl: "https://www.amazon.com/s?k=Great+Gatsby"
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    description: "The definitive terrifying dystopian warning on totalitarian surveillance, speech censorship, and historical revisionism.",
    coverColor: "#2F1E1E",
    coverTextColor: "#EFECE6",
    amazonUrl: "https://www.amazon.com/s?k=1984+George+Orwell"
  }
];

export const CURATED_STACKS: CuratedShelf[] = [
  {
    name: "Psychology Stack",
    description: "Quiet works dissecting human actions, neurological rhythms, and introverted frameworks.",
    books: [
      {
        title: "Quiet",
        author: "Susan Cain",
        category: "Psychology",
        description: "Susan Cain conducts a beautiful, research-backed defense of introversion in a high-stimulus society that can never seem to stop speaking. Cain proves that our cultural bias toward the 'Extrovert Ideal' has systematically undervalued the quiet power, creativity, and deep analytical capabilities of introverted thinkers.",
        coverColor: "#4B564F",
        coverTextColor: "#FBF7F0"
      },
      {
        title: "Stolen Focus",
        author: "Johann Hari",
        category: "Psychology",
        description: "Johann Hari investigates the alarming cognitive crisis of our declining attention spans, proving that our focus hasn't just been lost—it was stolen by structural modern forces. From tech monopolies designing addictive algorithms to chronic sleep deficits and nutrient deplete diets, Hari shares a comprehensive, evidence-rich diagnosis of why our minds are hyper-stimulated.",
        coverColor: "#45314D",
        coverTextColor: "#F8F6F1"
      },
      {
        title: "The Laws of Human Nature",
        author: "Robert Greene",
        category: "Psychology",
        description: "Robert Greene delivers a masterful, comprehensive textbook dissecting the subconscious forces that drive daily human behavior. By exploring historical figures and psychological principles, Greene equips readers with the tools to decode people's underlying motives, read body language, look past defensive posturing, and manage their own emotional impulses.",
        coverColor: "#2C1B1B",
        coverTextColor: "#FDFCF7"
      },
      {
        title: "Flow",
        author: "Mihaly Csikszentmihalyi",
        category: "Psychology",
        description: "Mihaly Csikszentmihalyi’s classic psychological study introduces the state of 'Flow'—the optimal human experience of being completely absorbed in an activity. When challenges perfectly match our skills, self-consciousness vanishes and time distorts, leading to deep satisfaction and high performance.",
        coverColor: "#2A3A40",
        coverTextColor: "#EAE6DF"
      }
    ]
  },
  {
    name: "Decision-Making Stacks",
    description: "Unraveling System 1 and System 2 cognitive processing, micro-heuristics, and logical clarity.",
    books: [
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "Decision Making",
        description: "Daniel Kahneman's seminal masterwork maps the twin cognitive systems that govern human judgment and choice. System 1 operates automatically and instinctively, fueling quick snap-judgments and hidden emotional biases, while System 2 is slow, deliberate, and logical. By unravelling how these systems interact, Kahneman equips readers with the mental frameworks to identify cognitive traps.",
        coverColor: "#3F2E2E",
        coverTextColor: "#FAF6F0"
      },
      {
        title: "Blink",
        author: "Malcolm Gladwell",
        category: "Decision Making",
        description: "Malcolm Gladwell investigates the power of the subconscious mind to make split-second, highly accurate snap judgments in the blink of an eye. Gladwell explores the psychology of intuition—proving how experts can instantly spot a forged sculpture or predict a divorce—while also warning readers when our rapid, subconscious filtering system is poisoned by prejudice, stress, or sensory overload.",
        coverColor: "#1F3B2E",
        coverTextColor: "#F6F3EB"
      },
      {
        title: "Algorithms to Live By",
        author: "Brian Christian & Tom Griffiths",
        category: "Decision Making",
        description: "Brian Christian and Tom Griffiths bridge computer science and human psychology, showing how mathematical sorting, caching, and searching algorithms can solve daily human problems. From knowing when to stop searching for an apartment to organizing your messy desk, this book demonstrates that computer design parameters offer elegant, highly practical strategies to optimize human time.",
        coverColor: "#3D3A30",
        coverTextColor: "#EFECE6"
      },
      {
        title: "Black Swan",
        author: "Nassim Nicholas Taleb",
        category: "Decision Making",
        description: "A paradigm-shifting manual on probability, immense chaotic shocks, and cognitive fragile points. Taleb provides a detailed guide exploring the massive, unpredictable shocks that define our chaotic history. These high-impact, rare events—known as Black Swans—are structurally impossible to forecast, yet we constantly try to explain them after they occur.",
        coverColor: "#1E2A27",
        coverTextColor: "#FAF6EF"
      }
    ]
  },
  {
    name: "Business Thinking Stack",
    description: "Candid founder memoirs and architectural models for creating enduring, innovative enterprises.",
    books: [
      {
        title: "Shoe Dog",
        author: "Phil Knight",
        category: "Business Thinking",
        description: "Phil Knight's candid, deeply human memoir details the chaotic, unstable journey of building Nike from a desperate $50 loan into a dominant global cultural force. Eschewing standard polished corporate narratives, Knight shares the terrifying liquidity crises, supply-chain bottlenecks, and litigation battles that threatened his venture at every turn.",
        coverColor: "#613125",
        coverTextColor: "#F9F6EE"
      },
      {
        title: "Zero to One",
        author: "Peter Thiel",
        category: "Business Thinking",
        description: "Peter Thiel delivers a sharp, contrarian handbook on innovation, startup philosophy, and forecasting the future. Thiel argues that true progress comes from creating vertical monopolies ('going from 0 to 1' by inventing new technology) rather than copying existing formulas. He outlines frameworks for evaluating technology.",
        coverColor: "#2A2A2D",
        coverTextColor: "#EFECE6"
      },
      {
        title: "High Output Management",
        author: "Andrew S. Grove",
        category: "Business Thinking",
        description: "The Silicon Valley classic on leading teams, establishing key metrics, and maximizing organizational output. Grove reviews key concepts like the manager's leverage (focusing on actions that multiply team output), establishing objective metrics, and running productive meetings, delivering a clear operational framework.",
        coverColor: "#343042",
        coverTextColor: "#F5F3ED"
      },
      {
        title: "Creativity, Inc.",
        author: "Ed Catmull",
        category: "Business Thinking",
        description: "Unlocking structural trust and psychological safety within high-stakes creative environments (Pixar). Ed Catmull discusses the psychological safety required to foster creative risks, sharing internal methods like the 'Braintrust' which relies on candid, ego-free feedback to fix broken stories, proving that great ideas come from fostering collaborative team values.",
        coverColor: "#4E2125",
        coverTextColor: "#FAF6EE"
      }
    ]
  },
  {
    name: "Personal Growth & Philosophy",
    description: "Quiet companion guides mapping out long-term habits, present orientation, and inner resilience.",
    books: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Personal Growth",
        description: "James Clear presents a masterfully structured manual on how tiny, microscopic adjustments compound over time into massive personal and professional transformations. By explaining the neurological loop of cue, craving, response, and reward, Clear provides a highly practical framework to automate good routines and systematically dismantle self-sabotaging behaviors.",
        coverColor: "#2C3E35",
        coverTextColor: "#F1EFEA"
      },
      {
        title: "The Courage To Be Disliked",
        author: "Ichiro Kishimi",
        category: "Philosophy",
        description: "An elegant, dialogue-based philosophical exploration of Adlerian psychology. Through a rich conversation between a philosopher and an anxious young man, this book delivers profound lessons on self-acceptance, interpersonal freedom, and living fully in the present.",
        coverColor: "#1B2A3A",
        coverTextColor: "#EFECE6"
      },
      {
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        category: "Philosophy",
        description: "Viktor Frankl’s transcendent psychological memoir details his harrowing survival in Nazi concentration camps, offering an unshakeable model of inner resilience. Frankl presents Logotherapy, arguing that our primary drive is not pleasure or power, but the voluntary pursuit of meaning.",
        coverColor: "#1E1E24",
        coverTextColor: "#F4F1EA"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        category: "Personal Growth",
        description: "Cal Newport delivers a rigorous, unsentimental manifesto on the supreme commercial and creative value of deep, uninterrupted concentration. Newport argues that the ability to focus intensely on complex tasks is becoming an increasingly rare and highly rewarded skillset. He shares concrete strategies to build cognitive endurance.",
        coverColor: "#2D2635",
        coverTextColor: "#ECE9E2"
      }
    ]
  },
  {
    name: "Creativity Stack",
    description: "Sanitary aesthetic insights and Zen frameworks to support genuine artistic discovery.",
    books: [
      {
        title: "The Creative Act",
        author: "Rick Rubin",
        category: "Creativity",
        description: "Rick Rubin delivers a warm, zen-like guide exploring the fundamental nature of art and creative discovery. Rubin teaches that creativity is not a rare, exclusive gift reserved for professional artists, but a natural pathway of human awareness and listening.",
        coverColor: "#111111",
        coverTextColor: "#FFFFFF"
      },
      {
        title: "War of Art",
        author: "Steven Pressfield",
        category: "Creativity",
        description: "Steven Pressfield delivers an intensive, battle-tested manifesto aimed at defeating the silent force that halts every creative project: Resistance. Pressfield personifies Resistance as an active, internal force designed to make us procrastinate, doubt ourselves, and avoid starting our true work.",
        coverColor: "#4A2E2B",
        coverTextColor: "#FAF8F1"
      },
      {
        title: "Big Magic",
        author: "Elizabeth Gilbert",
        category: "Creativity",
        description: "Elizabeth Gilbert delivers a vibrant, encouraging guide on overcoming creative fear and living a highly active, curious lifestyle in alignment with inspiration. Gilbert views ideas as conscious, disembodied entities seeking willing human collaborators. She encourages searchers to let go of the pressure to be perfect and instead embrace playful curiosity.",
        coverColor: "#1C3540",
        coverTextColor: "#FAF5ED"
      },
      {
        title: "Steal Like an Artist",
        author: "Austin Kleon",
        category: "Creativity",
        description: "Austin Kleon delivers a modern, visually playful manifesto about creative inheritance and active design. Kleon argues that nothing is entirely original; all creative works are built upon what came before. By learning to collect, study, remix, and repurpose ideas from a diverse range of influences, you can discover your own unique voice.",
        coverColor: "#2D2D2D",
        coverTextColor: "#FCEEE2"
      }
    ]
  }
];

export const LITERARY_QUOTES = [
  {
    quote: "You think your pain and your heartbreak are unprecedented in the history of the world, but then you read.",
    author: "James Baldwin"
  },
  {
    quote: "Books are a uniquely portable magic.",
    author: "Stephen King"
  },
  {
    quote: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero"
  },
  {
    quote: "The reading of all good books is like a conversation with the finest minds of past centuries.",
    author: "René Descartes"
  },
  {
    quote: "We read to know we are not alone.",
    author: "C.S. Lewis"
  },
  {
    quote: "To read is to fly: it is to soar into a point of view that is not yours.",
    author: "A.C. Grayling"
  }
];

export const BOOK_ISBNS: Record<string, string> = {
  "Atomic Habits": "9780735211292",
  "The Courage To Be Disliked": "9781501197277",
  "Thinking, Fast and Slow": "9780374533557",
  "Deep Work": "9781455586691",
  "Sapiens": "9780062316097",
  "Quiet": "9780307352156",
  "Man's Search for Meaning": "9780807014295",
  "Shoe Dog": "9781501135910",
  "Zero to One": "9780804139298",
  "Stolen Focus": "9781526620224",
  "The Creative Act": "9780593652886",
  "The Creative Act: A Way of Being": "9780593652886",
  "Educated": "9780399590504",
  "The Alchemist": "9780062315007",
  "Siddhartha": "9780553208849",
  "Blink": "9780316010665",
  "Dune": "9780441172719",
  "The Great Gatsby": "9780743273565",
  "1984": "9780451524935",
  "The Laws of Human Nature": "9780525428145",
  "Flow": "9780061339202",
  "Algorithms to Live By": "9781627790369",
  "Black Swan": "9781400063512",
  "High Output Management": "9780394548050",
  "Creativity, Inc.": "9780812993011",
  "War of Art": "9781936891023",
  "Big Magic": "9781594634727",
  "Steal Like an Artist": "9780761169253",
  "Outliers": "9780316017923",
  "The 7 Habits of Highly Effective People": "9781451639612",
  "Meditations": "9780812968255",
  "Zen and the Art of Motorcycle Maintenance": "9780688002305",
  "The Midnight Library": "9780525559474",
  "Life of Pi": "9780156027328"
};

export function getBookCover(title: string, customIsbn?: string): string {
  if (customIsbn && customIsbn.trim().length > 3) {
    return `https://covers.openlibrary.org/b/isbn/${customIsbn.trim()}-M.jpg`;
  }
  
  if (!title) return "";
  
  // Normalize title search: lowercased, alphanumerics only
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  if (!cleanTitle) return "";

  // 1. Exact or close lookup in custom list
  const foundKey = Object.keys(BOOK_ISBNS).find(key => {
    const cleanKey = key.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
    return cleanKey === cleanTitle || cleanTitle.includes(cleanKey) || cleanKey.includes(cleanTitle);
  });

  if (foundKey) {
    const isbn = BOOK_ISBNS[foundKey];
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }

  // Return empty string if no core matching cover exists, enabling clean CSS design fallback
  return "";
}

