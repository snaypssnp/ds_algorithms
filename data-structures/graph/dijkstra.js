'use strict';

const INF = Number.MAX_SAFE_INTEGER;
const getMinIndex = (vertInfo) => {
  let min = INF;
  let index = -1;

  for (let i = 0; i < vertInfo.length; i++) {
    const {dist, visited} = vertInfo[i];

    if (!visited && dist < min) {
      min = dist;
      index = i;
    }
  }

  return index;
};

const dijkstra = (graph, src) => {
  const vertInfo = graph.reduce((result) =>
    [...result, {dist: INF, visited: false}], []
  );

  vertInfo[src].dist = 0;

  for (let i = 0; i < graph.length - 1; i++) {
    const vertexIndex = getMinIndex(vertInfo);
    const vertex = vertInfo[vertexIndex];

    vertex.visited = true;

    for (let j = 0; j < graph.length; j++) {
      const adjVertex = vertInfo[j];
      
      if (adjVertex.visited) {
        continue;
      }

      if (vertex.dist === INF) {
        continue;
      }

      const adjVertexDist = graph[vertexIndex][j];

      if (!adjVertexDist) {
        continue;
      }

      if (vertex.dist + adjVertexDist < adjVertex.dist) {
        adjVertex.dist = vertex.dist + adjVertexDist;
      }
    }
  }

  return vertInfo.map(({dist}) => dist);
};

const graph = [
  [0, 1, 3, 0],
  [0, 0, 0, 3],
  [0, 0, 0, 5],
  [0, 0, 0, 0],
];

console.log(dijkstra(graph, 0));
