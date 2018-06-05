// example code from vis.js docs:

// create an array with nodes
var nodes = new vis.DataSet([
  { id: 1, label: "A" },
  { id: 2, label: "B" },
  { id: 3, label: "C" },
  { id: 4, label: "D" },
  { id: 5, label: "E" }
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3, color: { color: "#ef8fd2", opacity: 0.3 } },
  { from: 1, to: 2, color: { color: "#ef8fd2" } },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 }
]);

// create a network
var container = document.getElementById("basic graph");
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);
