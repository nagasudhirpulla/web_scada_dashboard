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
    _this.trace_props = [];

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
    _this.set_trace_props = set_cells;

    //getters
    _this.get_trace_props = get_cells;

    //Public Methods
    _this.refresh_cell = refresh_cells;
    _this.push_trace = push_cell;
    _this.get_dashboard_div = get_dashboard_div;

    /**Setters**/
    function set_cells(cellsInput) {
        _this.trace_props = cellsInput;
    }

    function push_cell(cellInput) {
        _this.trace_props.push(cellInput);
    }

    /**Getters**/
    function get_cells() {
        return _this.trace_props;
    }

    function layCells(){
        // todo implement this
    }

    function refresh_cells() {
        // todo implement this
    }

    function get_dashboard_div() {
        // todo implement this
        // add class to div - https://stackoverflow.com/questions/11444640/add-a-class-to-a-div-with-javascript
    }
}