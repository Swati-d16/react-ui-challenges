import { useState, useMemo } from "react";
import { Search, User } from "lucide-react";

const NAMES = [
  "Alexander Hamilton",
  "Benjamin Franklin",
  "Catherine Anderson",
  "Daniel Rodriguez",
  "Elizabeth Thompson",
  "Franklin Roosevelt",
  "Georgia Martinez",
  "Harrison Ford",
  "Isabella Garcia",
  "Jackson Williams",
  "Katherine Johnson",
  "Leonardo DiCaprio",
  "Maria Santos",
  "Nicholas Cage",
  "Olivia Newton",
  "Patrick Stewart",
  "Quinn Hughes",
  "Rachel Green",
  "Samuel Jackson",
  "Taylor Swift",
  "Uma Thurman",
  "Victoria Beckham",
  "William Shakespeare",
  "Xavier Charles",
  "Yolanda Adams",
  "Zachary Taylor",
  "Anna Anderson",
  "Anderson Cooper",
];

const LiveSearch = () => {
  const [query, setQuery] = useState("");

  const filteredNames = useMemo(() => {
    if (!query.trim()) return NAMES;
    return NAMES.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const highlightMatches = (name: string, searchQuery: string) => {
    if (!searchQuery.trim()) return <span>{name}</span>;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = name.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="highlight">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const matchCount = filteredNames.length;
  const hasQuery = query.trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Search</h1>
        <p className="text-muted-foreground">
          Search through names with real-time highlighting
        </p>
      </div>

      {/* Search Input */}
      <div className="task-card mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search names..."
            className="input-field pl-12 text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {hasQuery ? (
            matchCount > 0 ? (
              <>
                Found <span className="font-semibold text-foreground">{matchCount}</span>{" "}
                {matchCount === 1 ? "match" : "matches"} for "{query}"
              </>
            ) : (
              "No matches found"
            )
          ) : (
            <>
              Showing all <span className="font-semibold text-foreground">{NAMES.length}</span> names
            </>
          )}
        </p>
        {hasQuery && (
          <button
            onClick={() => setQuery("")}
            className="text-sm text-primary hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="task-card">
        {matchCount === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium text-foreground mb-1">No matches found</p>
            <p className="text-muted-foreground">
              Try searching for a different name
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filteredNames.map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 py-3 animate-fade-in"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-foreground">
                  {highlightMatches(name, query)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Info Card */}
      <div className="task-card mt-6 bg-secondary/30">
        <h3 className="text-sm font-semibold text-foreground mb-2">Features</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Case-insensitive search</li>
          <li>• Real-time filtering as you type</li>
          <li>• Multiple occurrence highlighting</li>
          <li>• Match count display</li>
        </ul>
      </div>
    </div>
  );
};

export default LiveSearch;
