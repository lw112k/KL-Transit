//Breadth first search 
export function getPathCost(graph: Record<string, Record<string, number>>, path: string[]) {
  let cost = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const currentStation = path[i];
    const nextStation = path[i + 1];
    
    if (graph[currentStation] && graph[currentStation][nextStation]) {
      cost += graph[currentStation][nextStation];
    } else {
      return Infinity; 
    }
  }
  return cost;
}

export function findAllRoutes(
  graph: Record<string, Record<string, number>>, 
  start: string, 
  end: string, 
  searchLimit: number = 20 // Search wider to ensure we find the absolute fastest
) {
  const validPaths: string[][] = [];
  const queue: { current: string; path: string[] }[] = [
    { current: start, path: [start] }
  ];

  // Breadth-First Search to find topological paths
  while (queue.length > 0 && validPaths.length < searchLimit) {
    const { current, path } = queue.shift()!;

    if (current === end) {
      validPaths.push(path);
      continue; 
    }

    if (graph[current]) {
      for (const neighbor in graph[current]) {
        if (!path.includes(neighbor)) {
          queue.push({ current: neighbor, path: [...path, neighbor] });
        }
      }
    }
  }

  // Format and sort strictly by the lowest time cost
  const formattedRoutes = validPaths.map(path => ({
    path,
    stops: path.length - 1,
    cost: getPathCost(graph, path)
  })).sort((a, b) => a.cost - b.cost); 

  // Filter out any duplicate routes that might have snuck in, 
  // and return the top 5 distinct options to keep the UI clean
  const uniqueRoutes = [];
  const seenCosts = new Set();
  
  for (const route of formattedRoutes) {
      const routeKey = route.path.join(',');
      if (!seenCosts.has(routeKey)) {
          seenCosts.add(routeKey);
          uniqueRoutes.push(route);
      }
      if (uniqueRoutes.length === 5) break; // Limit final output to 5 routes
  }

  return uniqueRoutes;
}