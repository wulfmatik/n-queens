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

// var board = new Board({n:n})
// for i in n {
//   for j in n {
//     board[i][j] = 1;

//   }
// }

//Step 1:
//Find all combinations of n rook placement
//Step 2:
//For each arrangement, run hasColConflit && hasRowConflict && hasDiagConflict
//Step 3:
//If hasColConflict && hasRowConflict === false, numSolution++
//Step 4:
//Return numSolution

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  //console.log('board: ', board);
  var solution;

  var rookSolver = function(row) {
    if (row === n) {
      solution = board.attributes;
      //console.log('solution: ', solution);
      var solutionArray = Object.entries(solution);
      //console.log('solutionArray: ', solutionArray);
      return solutionArray;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        rookSolver(row + 1);
        break;
      }
      board.togglePiece(row, col);
    }
  };

  rookSolver(0);

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;

  var rookSolver = function(row) {
    if (row === n) {
      solutionCount += 1;
      return solutionCount;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        rookSolver(row + 1);
      }
      board.togglePiece(row, col);
    }
  };

  rookSolver(0);

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
  var board = new Board({n: n});
  var solutionCount = 0;

  var queenSolver = function(row) {
    if (row === n) {
      solutionCount += 1;
      return solutionCount;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        queenSolver(row + 1);
      }
      board.togglePiece(row, col);
    }
  };

  queenSolver(0);

  return solutionCount;
};
