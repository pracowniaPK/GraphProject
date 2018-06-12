// example code from vis.js docs:
function zczytaj() {
  //read text form textarea
  var input = document.getElementById("input");
  var VALUE = input.value;

  //split value to verticles
  var tab = VALUE.split(/\n|\s/);

  //split value to edges
  var edges = VALUE.split(/\n/);
  var unique = new Array();

  for (i = 0; i < tab.length; i++) {
    var pointer = true;
    for (j = 0; j < unique.length; j++) {
      if (tab[i] == unique[j]) {
        pointer = false;
        break;
      }
    }
    if (pointer == true) {
      unique.push(tab[i]);
    }
  }

  var neighborMatrix = CreatorArray2d(unique.length);

  console.log(unique);

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
  var container = document.getElementById("basic_graph");
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
}

//unction to creat Array two dimension
function CreatorArray2d(liczba_wierszy) {
  var tab = new Array(liczba_wierszy);
  for (var i = 0; i < liczba_wierszy; i++) {
    tab[i] = [];
  }
  return tab;
}
