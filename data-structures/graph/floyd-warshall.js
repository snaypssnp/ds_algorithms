const INF = Infinity;

const floydWarshall = (graph) => {
  const dist = [];
  const {length} = graph;

  for (let i = 0; i < length; i++) {
    dist[i] = [];
    
    for (let j = 0; j < length; j++) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};

const graph = [
  [0, 1, 3, INF],
  [INF, INF, INF, 3],
  [INF, INF, INF, 5],
  [INF, INF, INF, INF],
];

console.log(floydWarshall(graph));
