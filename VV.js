// II - Matrix (arr of arr)
// OO - int
// (num of steps to cut nums > 1
// from smallest to largest,
// return -1 if no path to num>1)
// C/e -
// - can't pass 0
// - biggest to smallest
// - empty (all 0s) return -1



// 1. Tree not reachable - entire row/col == 0
// not on perimeter

function cutTrees(matrix) {

//UNREACHABLE
  for(var r = 1; r < matrix.length-1; r++) {
    var allZero = true;
    for(var c = 1; c < matrix[r].length-1; c++) {
      if(matrix[r][c] !== 0) {allZero = false; break;}
    }
    if(allZero) {
      //check if any tree exists on either side
      var bothSides = checkBothSides(rowCol);
      //if true
      if(bothSides) {
        return -1;
      }
    }
  }

  //sort loactions in ordered array
  var coordinates = [0, [x,y], null, null, [x,y]];
  for(var r = 0; r < matrix.length; r++) {
    for(var c = 0; c < matrix[r].length; c++) {
      if(matrix[r][c] > 1) { //its a tree
        if(coordinates[matrix[r][c]]) {coordinates[matrix[r][c]] = [coordinates[matrix[r][c]], [r,c]]}
        coordinates[matrix[r][c]] = [r,c];
      }
    }
    if() {
    }
  }

  var totalSteps = 0;
  var currentCoor = [0,0];
  coordinates.forEach((coor, i) => {
    if(coor) {
      //invoke simulation to find steps
      //add steps to totalSteps;
      currentCoor = coor;
    }
  })

  return totalSteps;


// create simulation recursive function that steps through Matrix, finds shortest path to next coordinate

}
