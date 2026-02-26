//adjacency list construction
import { LINE_SEQUENCES, INTERCHANGES } from './transitData';

export function buildGraph(options = { excludeERL: false }) {
  const graph: Record<string, Record<string, number>> = {};
  const TIME_BETWEEN_STOPS = 3; 
  const TRANSFER_PENALTY = 5;

  const addEdge = (a: string, b: string, weight: number) => {
    if (!graph[a]) graph[a] = {};
    if (!graph[b]) graph[b] = {};
    graph[a][b] = weight;
    graph[b][a] = weight;
  };

  // 1. Connect stations along the same line
  Object.entries(LINE_SEQUENCES).forEach(([lineName, line]) => {
    // NEW: Skip ERL lines if the user requested it
    if (options.excludeERL && (lineName === 'ERL_EXPRESS' || lineName === 'ERL_TRANSIT')) {
      return; 
    }

    for (let i = 0; i < line.length - 1; i++) {
      addEdge(line[i], line[i + 1], TIME_BETWEEN_STOPS);
    }
  });

  // 2. Connect the interchange stations
  INTERCHANGES.forEach(group => {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        addEdge(group[i], group[j], TRANSFER_PENALTY);
      }
    }
  });

  return graph;
}