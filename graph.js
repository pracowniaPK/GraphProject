// example code from vis.js docs:
function zczytaj() {
  //read text form textarea
  var input = document.getElementById("input");
  tmpLst = getGraphMatrix(input.value);
  unique = tmpLst[0];
  neighborMatrix = tmpLst[1];

  console.log(unique);
  console.log(neighborMatrix);

  algorytmSkojarzen(unique, neighborMatrix);
}

function getGraphMatrix(rawInput) {
  //split value to verticles
  var tab = rawInput.split(/\n|\s/);

  //split value to edges
  var edges = rawInput.split(/\n/);
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

  var neighborMatrix = new Array(unique.length);
  //function to creat Array two dimension
  for (i = 0; i < unique.length; i++) {
    neighborMatrix[i] = new Array(unique.length);
    for (j = 0; j < unique.length; j++) {
      neighborMatrix[i][j] = 0;
    }
  }

  for (i = 0; i < edges.length; i++) {
    singleEdge = edges[i].split(/\s/);
    for (j = 0; j < unique.length; j++) {
      if (singleEdge[0] == unique[j]) break;
    }
    for (k = 0; k < unique.length; k++) {
      if (singleEdge[1] == unique[k]) break;
    }

    neighborMatrix[j][k] = 1;
    neighborMatrix[k][j] = 1;
  }

  return [unique, neighborMatrix];
}

function algorytmSkojarzen(unique, neighborMatrix) {
  ////////////////////////////////////////////////////////////
  //Skojarzenie maksymalne (ang. Maximal matching)
  ////////////////////////////////////////////////////////////

  //copy unique

  var table = unique.slice();

  tab2 = new Array();
  var licznik = 0;
  while (table.length > 1) {
    var a = table[0];
    var b = table[1];

    for (i = 0; i < unique.length; i++) {
      if (unique[i] == a) {
        break;
      }
    }

    for (j = 0; j < unique.length; j++) {
      if (unique[j] == b) break;
    }

    if (neighborMatrix[i][j] == 1) {
      // tab2.push({ from: i, to: j, color: "#000000" });
      neighborMatrix[i][j] = 2;
      neighborMatrix[j][i] = 2;
      table.shift();
      table.shift();
      licznik = 0;
    } else {
      table.shift();
      table.push(a);
      licznik += 1;
    }
    if (licznik > table.length) break;
  }

  drawGraph(unique, neighborMatrix, "graph");

  return neighborMatrix;
}

function drawGraph(unique, neighborMatrix, elementId) {
  // create an array with nodes
  var tab1 = new Array();
  for (i = 0; i < unique.length; i++) {
    tab1.push({ id: i, label: unique[i] });
  }
  var nodes = new vis.DataSet(tab1);

  // create an array with edges
  var tab2 = new Array();
  for (i = 0; i < neighborMatrix.length; i++) {
    for (j = 0; j <= i; j++) {
      if (neighborMatrix[i][j] == 1) {
        tab2.push({
          from: i,
          to: j,
          width: 1.5,
          color: { color: "#405dfc", opacity: 0.3 }
        });
      } else if (neighborMatrix[i][j] == 2) {
        tab2.push({ from: i, to: j, width: 3, color: { color: "#fc4141" } });
      }
    }
  }
  var edges = new vis.DataSet(tab2);

  // create a network
  var container = document.getElementById(elementId);
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
}

/*
{ from: 1, to: 3, color: { color: "#ef8fd2", opacity: 0.3 } },
{ from: 1, to: 2, color: { color: "#ef8fd2" } },

 tab2.push({ from: i, to: j, color: "#ef8fd2" });
*/
