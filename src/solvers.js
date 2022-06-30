/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// n=0,1
// --> 1
// n>1

// n = 2 2 rooks
// 1 1
// 0 0
// run hasColConflict, hasRowConflict --> if both false --> numSolution++

// 1 0
// 1 0
// run hasColConflict, hasRowConflict --> if both false --> numSolution++

// 1 0
// 0 1
// run hasColConflict, hasRowConflict --> if both false --> numSolution++

// 0 1
// 1 0
// run hasColConflict, hasRowConflict --> if both false --> numSolution++

// 0 1
// 0 1
// run hasColConflict, hasRowConflict --> if both false --> numSolution++

// 0 0
// 1 1
// run hasColConflict, hasRowConflict --> if both false --> numSolution++

var board = new Board({n:n})
for i in n {
  for j in n {
    board[i][j] = 1;

  }
}

//Step 1:
//Find all combinations of n rook placement
//Step 2:
//For each arrangement, run hasColConflit && hasRowConflict && hadDiagConflict
//Step 3:
//If hasColConflict && hasRowConflict === false, numSolution++
//Step 4:
//Return numSolution

window.findNRooksSolution = function(n) {

  var board = new Board({n});

  // Function to print all
// combinations of setting N
// pieces in N x N board
function allCombinations(piecesPlaced, N, row, col, ans) {

  // If the total 2d array's space
  // is exhausted then backtrack.
  if (row == N) {

    // If all the pieces are
    // placed then print the answer.
    if (piecesPlaced == N) {
      document.write(ans);
    }
    return;
  }
  let nr = 0;
  let nc = 0;

  // Declare one string
  // that will set the piece.
  let x = "";

  // Declare one string that
  // will leave the space blank.
  let y = "";

  // If the current column
  // is out of bounds then
  // increase the row
  // and set col to 0.
  if (col == N - 1) {
    nr = row + 1;
    nc = 0;
    x = ans + "*<br>";
    y = ans + "-<br>";
  }

  // Else increase the col
  else {
    nr = row;
    nc = col + 1;
    x = ans + "*     ";
    y = ans + "-     ";
  }

  // Set the piece in the
  // box and move ahead
  allCombinations(piecesPlaced + 1, N, nr, nc, x);

  // Leave the space blank
  // and move forward
  allCombinations(piecesPlaced, N, nr, nc, y);
}
  var solution =

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
