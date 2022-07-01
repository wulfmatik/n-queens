// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var length = this.get('n');
      var counter = 0;
      var row = this.get(rowIndex); //<-- Only import the current row: array

      if (length === 0) {
        return false;
      }

      for (var i = 0; i < length; i++) {
        counter += row[i];
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var row = this.get('n');

      if (row === 0) {
        return false;
      }

      for (var i = 0; i < row; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var col = this.get('n');
      var counter = 0;

      if (col === 0) {
        return false;
      }

      for (var i = 0; i < col; i++) {
        counter += this.attributes[i][colIndex];
        if (counter > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    // scenario for empty board
    hasAnyColConflicts: function() {
      var col = this.get('n');

      if (col === 0) {
        return false;
      }

      for (var i = 0; i < col; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // does this only test for diagonals to the right of main (i==j)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var currMatrix = this.attributes;
      var counter = 0;

      if (currMatrix.n === 0) {
        return false;
      }

      for (var key in currMatrix) {
        for (var i = 0; i < currMatrix.n; i++) {
          if (Math.abs(key - i) === colIndex && (key - i) <= 0) {
            counter += currMaxtrix[key][colIndex];
            if (counter > 1) {
              return true;
            }
          }
          var currMatrix = this.attributes;
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var currMatrix = this.attributes;

      for (var k = 0; k <= 2 * (currMatrix.n - 1); ++k) {
        var counter = 0;
        var temp = [];
        for (var y = currMatrix.n - 1; y >= 0; --y) {
          var x = k - (currMatrix.n - y);
          if (x >= 0 && x < currMatrix.n) {
            temp.push(currMatrix[y][x]);
          }
        }
        for (var i = 0; i < temp.length; i++) {
          counter += temp[i];
          if (counter > 1) {
            return true;
          }
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    // 00 01 02 03  <-- 0, 1, 2, 3 Possible Inputs
    // 10 11 12 13
    // 20 21 22 23
    // 30 31 32 33


    // 00 01 02 *03  <-- Input = 3
    // 10 11 *12 13
    // 20 *21 22 23
    // *30 31 32 33
    // 03, 12, 21, 30
    // i++, j--


    // 10 *11 12 13
    // 00 01 *02 03  <-- Input = 2
    // *20 21 22 23
    // 30 31 32 33
    // 02, 11, 20
    // i++, j--


    // 00 *01 02 03  <-- Input = 1
    // *10 11 12 13
    // 20 21 22 23
    // 30 31 32 33
    // 01 10
    // i++, j--


    // *00 01 02 03  <-- Input = 0
    // 10 11 12 13
    // 20 21 22 23
    // 30 31 32 33

    // 00 01 02 *03.1  <-- Input = 3
    // 10 11 *12.1 13
    // 20 *21.0 22 23
    // *30.0 31 32 33
    // 03 (0), 12 (0), 21 (1), 30 (0)

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var currMatrix = this.attributes;
      var counter = 0;
      var j = minorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i <= minorDiagonalColumnIndexAtFirstRow; i++) {
        count += currMatrix[i][j];
        j--;
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var currMatrix = this.attributes;
      var numRows = currMatrix.n;
      var numCols = currMatrix[0].length;
      var row = 0;
      var col = 0;

      for (var i = 0; i < numRows + numCols - 1; i++) {
        var counter = 0;

        if (i % 2 === 0) {
          while (row >= 0 && col < numCols) {
            counter += currMatrix[row--][col++];
            if (counter > 1) {
              return true;
            }
          }
          row++;
          if (col === numCols) {
            row++;
            col = numCols - 1;
          }
        } else {
          while (col >= 0 && row < numRows) {
            counter += currMatrix[row++][col--];
            if (counter > 1) {
              return true;
            }
          }
          col++;
          if (row === numRows) {
            row = numRows - 1;
            col++;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

// n = 4
// board = {       //index (first index = key, second index = i)  key - i <= 0 && abs(key-i) <= n-2 (2)
//   0: [0,0,0,0], //00, 01, 02, 03
//   1: [0,0,0,0], //10, 11, 12, 13
//   2: [0,0,0,0], //20, 21, 22, 23
//   3: [0,0,0,0]  //30, 31, 32, 33
// }

// i==j --> main diagonal
// [0][n-1] --> corners
// --> expanded to n x n matrix
// -----> abs(i-j) === n-1
// [n-1][0] --> corners
// abs(i-j) === 1 || 2 --> sub diagonals // n = 4  1,2 --> n-2, n-3
// --> expanded to n x n matrix
// abs(i-j) === n-


// n = 6

// board = {       //index
// input = colIndex = 0,1,2,3,4,5
//   0: [0,0,0,0,0,0], //00, 01, 02, 03, 04, 05
//   1: [0,0,0,0,0,0], //10, 11, 12, 13, 14, 15
//   2: [0,0,0,0,0,0], //20, 21, 22, 23, 24, 25
//   3: [0,0,0,0,0,0], //30, 31, 32, 33, 34, 35
//   4: [0,0,0,0,0,0], //40, 41, 42, 43, 44, 45
//   5: [0,0,0,0,0,0]  //50, 51, 52, 53, 54, 55
// }

// General rules:
// abs(i-j) === n-1 //n = 6 -> 5 --> top right / bottom left corners
// abs(i-j) <= n-2 && abs(i-j) >= 0 --> sub diagonals
// n = 6
//if (mainDiagnal) {} // key - i === 0
//  good
//if(subDiagnal1) {} // key - i === -1
//  good
//if(subDiagnal2) {} // key - i === -2
//  good
//if(subDiagonalN) {} // abs(key - i) === n - 2
//  diff = 4 === n-2










