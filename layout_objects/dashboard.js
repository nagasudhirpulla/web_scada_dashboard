/**
 * Created by Nagasudhir on 4/29/2018.
 */
"use strict";

function Dashboard(opt_options) {
    // div class = dashboard
    // avoiding .bind(this) in every function
    // https://stackoverflow.com/questions/30912506/how-to-avoid-bindthis-on-every-function
    var _this = this;

    //initial values
    _this.cells = [];
    _this.dashboard_div = document.createElement('div');
    _this.dashboard_div.className += ' dashboard';

    // set provided options, if any
    if (opt_options) {
        setOptions(opt_options);
    }

    function setOptions(options) {
        if (options.cells !== undefined) {
            set_cells(options.cells);
        }
    }

    //setters
    _this.set_trace_objs = set_cells;

    //getters
    _this.get_trace_objs = get_cells;

    //Public Methods
    _this.refresh_cells_async = refresh_cells_async;
    _this.push_trace = push_cell;
    _this.getRowColRange = getRowColRange;
    _this.getMaxColForRowIndex = getMaxColForRowIndex;
    _this.lay_cells = lay_cells;
    _this.get_dashboard_div = get_dashboard_div;

    /**Setters**/
    function set_cells(cellsInput) {
        _this.cells = cellsInput;
    }

    function push_cell(cellInput) {
        _this.trace_objs.push(cellInput);
    }

    /**Getters**/
    function get_cells() {
        return _this.cells;
    }

    function getRowColRange() {
        var maxRows = 0;
        var maxCols = 0;
        for (var cellIter = 0; cellIter < _this.cells.length; cellIter++) {
            if (_this.cells[cellIter].row + 1 > maxRows) {
                maxRows = _this.cells[cellIter].row + 1;
            }
            if (_this.cells[cellIter].column + 1 > maxCols) {
                maxCols = _this.cells[cellIter].column + 1;
            }
        }
        return {maxRows: maxRows, maxCols: maxCols};
    }

    function getMaxColForRowIndex(rowIndex) {
        var maxCols = 0;
        for (var cellIter = 0; cellIter < _this.cells.length; cellIter++) {
            if (_this.cells[cellIter].row == rowIndex) {
                if (_this.cells[cellIter].column + 1 > maxCols) {
                    maxCols = _this.cells[cellIter].column + 1;
                }
            }
        }
        return maxCols;
    }

    function lay_cells() {
        var maxRowCol = _this.getRowColRange();
        _this.dashboard_div.innerHTML = '';
        // create row divs
        for (var rowIter = 0; rowIter < maxRowCol.maxRows; rowIter++) {
            var rowDiv = document.createElement('div');
            rowDiv.className += ' dashboard-row';
            _this.dashboard_div.appendChild(rowDiv);
        }
        var rowDivs = _this.dashboard_div.getElementsByClassName('dashboard-row');

        // create cell divs matrix
        var cellMatrix = [];
        for(var rowIter = 0; rowIter < rowDivs.length; rowIter++){
            cellMatrix.push([]);
        }
        for (var cellIter = 0; cellIter < _this.cells.length; cellIter++){
            cellMatrix[_this.cells[cellIter].row][_this.cells[cellIter].column] = _this.cells[cellIter].cell_div;
        }

        // insert cells into rows
        for (var rowIter = 0; rowIter < cellMatrix.length; rowIter++){
            for (var cellIter = 0; cellIter < cellMatrix[rowIter].length; cellIter++){
                // find if the cell is a div of class 'dashboard-cell'
                // https://stackoverflow.com/questions/6518802/check-if-element-is-a-div
                // https://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
                if(cellMatrix[rowIter][cellIter].tagName == 'DIV' && cellMatrix[rowIter][cellIter].classList.contains('dashboard-cell')){
                    // push into the rowDiv
                    rowDivs[rowIter].appendChild(cellMatrix[rowIter][cellIter]);
                }
            }
        }
        for (var cellIter = 0; cellIter < _this.cells.length; cellIter++){
            _this.cells[cellIter].relayout_cell_div();
        }
    }

    function refresh_cells_async(callback) {
        var cellIterators = [];
        for (var cellIter = 0; cellIter < _this.cells.length; cellIter++) {
            cellIterators.push(cellIter);
        }
        var refreshCell = function (iter, callback) {
            //stub
            _this.cells[iter].refresh_cell_data_async(function (err, results) {
                if(err){
                    return callback(null);
                }
                return callback(null);
            });
        };
        async.mapSeries(cellIterators, refreshCell, function (err, results) {
            if(err){
                return callback(null);
                // todo handle error
            }
            // cell refresh done
            return callback(null);
        });
    }

    function get_dashboard_div() {
        // add class to div - https://stackoverflow.com/questions/11444640/add-a-class-to-a-div-with-javascript
        return _this.dashboard_div;
    }
}