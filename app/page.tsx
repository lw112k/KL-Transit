"use client";

import { useState, useMemo } from "react";
import { LINE_SEQUENCES, INTERCHANGES } from "../lib/transitData";
import { buildGraph } from "../lib/graphBuilder";
import { findAllRoutes } from "../lib/pathfinding";

const formatStationName = (id: string) => {
  return id
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const checkIfTransfer = (path: string[], currentIndex: number) => {
  if (currentIndex >= path.length - 1) return false;

  const currentStation = path[currentIndex];
  const nextStation = path[currentIndex + 1];

  const isExplicitInterchange = INTERCHANGES.some(group => 
    group.includes(currentStation) && group.includes(nextStation)
  );
  if (isExplicitInterchange) return true;

  if (currentIndex > 0) {
    const prevStation = path[currentIndex - 1];

    const prevLines = Object.entries(LINE_SEQUENCES)
      .filter(([_, stations]) => stations.includes(prevStation) && stations.includes(currentStation))
      .map(([lineName]) => lineName);

    const nextLines = Object.entries(LINE_SEQUENCES)
      .filter(([_, stations]) => stations.includes(currentStation) && stations.includes(nextStation))
      .map(([lineName]) => lineName);

    const hasCommonLine = prevLines.some(line => nextLines.includes(line));
    if (!hasCommonLine) return true;
  }

  return false;
};

const countTransfers = (path: string[]) => {
  let transfers = 0;
  for (let i = 0; i < path.length - 1; i++) {
    if (checkIfTransfer(path, i)) transfers++;
  }
  return transfers;
};

function StationSearchInput({ options, value, onChange, placeholder }: any) {
  const [query, setQuery] = useState(value ? formatStationName(value) : "");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((st: string) => 
    formatStationName(st).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 font-medium"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
      />
      
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredOptions.map((st: string) => (
            <li 
              key={st}
              className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium border-b border-gray-50 last:border-none"
              onClick={() => {
                setQuery(formatStationName(st)); 
                onChange(st);                    
                setIsOpen(false);                
              }}
            >
              {formatStationName(st)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function KLTransitApp() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"fastest" | "least_transfers">("fastest");
  
  // NEW: State for the ERL toggle (Defaults to true to save users money!)
  const [excludeERL, setExcludeERL] = useState(true);

  // NEW: Rebuild the graph automatically if the user toggles the ERL switch
  const transitGraph = useMemo(() => buildGraph({ excludeERL }), [excludeERL]);

  const allStations = useMemo(() => {
    const rawStations = Object.values(LINE_SEQUENCES).flat();
    return Array.from(new Set(rawStations)).sort();
  }, []);

  const handleSearch = () => {
    if (origin === destination) {
      alert("Origin and destination cannot be the same!");
      return;
    }
    
    const rawRoutes = findAllRoutes(transitGraph, origin, destination);
    
    const routesWithTransferCounts = rawRoutes.map(route => ({
      ...route,
      transfers: countTransfers(route.path)
    }));

    setRoutes(routesWithTransferCounts);
  };

  const sortedRoutes = [...routes].sort((a, b) => {
    if (sortBy === "least_transfers") {
      if (a.transfers !== b.transfers) return a.transfers - b.transfers;
      return a.cost - b.cost;
    } else {
      if (a.cost !== b.cost) return a.cost - b.cost;
      return a.transfers - b.transfers;
    }
  });

  const mainRoute = sortedRoutes[0];
  const alternativeRoutes = sortedRoutes.slice(1);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            KL Transit Finder
          </h1>
          <p className="text-gray-500">Navigate the Klang Valley with ease</p>
        </div>
        
        {/* Search Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <StationSearchInput 
              options={allStations}
              value={origin}
              onChange={setOrigin}
              placeholder="Search starting station..."
            />

            <StationSearchInput 
              options={allStations}
              value={destination}
              onChange={setDestination}
              placeholder="Search destination..."
            />

            <button 
              onClick={handleSearch}
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm w-full md:w-auto"
            >
              Search
            </button>
          </div>

          {/* Settings & Sorting Toggles */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-100 pt-4">
            
            {/* Optimize For Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Optimize For:</span>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setSortBy("fastest")}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition ${
                    sortBy === "fastest" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  ⚡ Fastest
                </button>
                <button 
                  onClick={() => setSortBy("least_transfers")}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition ${
                    sortBy === "least_transfers" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  🚶 Least Transfers
                </button>
              </div>
            </div>

            {/* NEW: Exclude Premium Lines Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                checked={excludeERL}
                onChange={(e) => setExcludeERL(e.target.checked)}
              />
              <span className="text-sm font-medium text-gray-600">
                Exclude Premium Lines (ERL)
              </span>
            </label>

          </div>
        </div>

        {/* Results Display */}
        {sortedRoutes.length > 0 && (
          <div className="space-y-8">
            
            {/* Main Route Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                {sortBy === "fastest" ? "⚡ Fastest Route" : "🚶 Easiest Route (Least Transfers)"}
              </h2>
              <div className="bg-blue-50 p-6 rounded-xl shadow-md border-2 border-blue-200 relative overflow-hidden">
                <div className="flex flex-wrap gap-4 text-sm font-bold text-blue-800 mb-6 bg-blue-100 inline-block px-4 py-2 rounded-lg">
                  <span>⏱️ Est. {mainRoute.cost} mins</span>
                  <span>🚉 {mainRoute.stops} stops</span>
                  <span className={mainRoute.transfers === 0 ? "text-green-600" : ""}>
                    🔄 {mainRoute.transfers} {mainRoute.transfers === 1 ? "transfer" : "transfers"}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-y-4">
                  {mainRoute.path.map((station: string, i: number) => {
                    const isNextInterchange = checkIfTransfer(mainRoute.path, i);

                    return (
                      <div key={i} className="flex items-center">
                        <span className="bg-white border border-blue-200 px-3 py-1.5 rounded-md text-sm font-semibold text-blue-900 shadow-sm">
                          {formatStationName(station)}
                        </span>
                        
                        {i < mainRoute.path.length - 1 && (
                          isNextInterchange ? (
                            <span className="mx-2 flex items-center gap-1 text-orange-600 font-bold text-xs bg-orange-100 px-2 py-1 rounded-full border border-orange-300 shadow-sm animate-pulse">
                              🔄 Transfer
                            </span>
                          ) : (
                            <span className="mx-2 text-blue-400 font-bold">→</span>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Alternative Routes Section */}
            {alternativeRoutes.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-4 mt-8">
                  Alternative Routes
                </h3>
                <div className="space-y-4">
                  {alternativeRoutes.map((route, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 opacity-90 hover:opacity-100 transition">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-700">Option {index + 2}</span>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-md">
                          <span>⏱️ {route.cost} mins</span>
                          <span>🚉 {route.stops} stops</span>
                          <span>🔄 {route.transfers} transfers</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-y-3">
                        {route.path.map((station: string, i: number) => {
                          const isNextInterchange = checkIfTransfer(route.path, i);

                          return (
                            <div key={i} className="flex items-center">
                              <span className="bg-gray-50 border border-gray-200 px-2.5 py-1 rounded text-xs font-medium text-gray-700 shadow-sm">
                                {formatStationName(station)}
                              </span>
                              
                              {i < route.path.length - 1 && (
                                isNextInterchange ? (
                                  <span className="mx-1.5 flex items-center text-orange-500 font-bold text-[10px] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                                    🔄
                                  </span>
                                ) : (
                                  <span className="mx-1 text-gray-300 text-xs font-bold">→</span>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
    </main>
  );
}