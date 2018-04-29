/**
 * Created by Nagasudhir on 4/29/2018.
 */
"use strict";

function DashboardCell(opt_options) {
    // div class = dashboard-cell
    // avoiding .bind(this) in every function
    // https://stackoverflow.com/questions/30912506/how-to-avoid-bindthis-on-every-function

    var _this = this;

    //initial values
    _this.trace_props = [];
    _this.row = 0;
    _this.column = 0;
    _this.width = '100px';
    _this.height = '100px';
    _this.padding = '0';
    _this.dtick = 120;
    _this.x_axis_title = '';
    _this.y_axis_title = 'MW';


    // set provided options, if any
    if (opt_options) {
        setOptions(opt_options);
    }

    function setOptions(options) {
        if (options.trace_props !== undefined) {
            set_trace_props(options.trace_props);
        }
        if (options.row !== undefined) {
            set_row(options.row)
        }
        if (options.column !== undefined) {
            set_column(options.column)
        }
        if (options.width !== undefined) {
            set_width(options.width)
        }
        if (options.height !== undefined) {
            set_height(options.height)
        }
        if (options.padding !== undefined) {
            set_padding(options.padding)
        }
        if (options.dtick !== undefined) {
            _this.dtick = options.dtick;
        }
        if (options.x_axis_title !== undefined) {
            _this.x_axis_title = options.x_axis_title;
        }
        if (options.y_axis_title !== undefined) {
            _this.y_axis_title = options.y_axis_title;
        }
    }

    //setters
    _this.set_trace_props = set_trace_props;
    _this.set_row = set_row;
    _this.set_column = set_column;
    _this.set_width = set_width;
    _this.set_height = set_height;
    _this.set_padding = set_padding;

    //getters
    _this.get_trace_props = get_trace_props;
    _this.get_row = get_row;
    _this.get_column = get_column;
    _this.get_width = get_width;
    _this.get_height = get_height;
    _this.get_padding = get_padding;

    //Public Methods
    _this.refresh_cell = refresh_cell;
    _this.push_trace = push_trace;
    _this.get_cell_div = get_cell_div;

    /**Setters**/
    function set_trace_props(cellsInput) {
        _this.trace_props = cellsInput;
    }

    function set_row(row) {
        _this.row = row;
    }

    function set_column(column) {
        _this.column = column;
    }

    function set_width(width) {
        _this.width = width;
    }

    function set_height(height) {
        _this.height = height;
    }

    function set_padding(padding) {
        _this.padding = padding;
    }

    function push_trace(cellInput) {
        _this.trace_props.push(cellInput);
    }

    /**Getters**/
    function get_trace_props() {
        return _this.trace_props;
    }

    function get_row() {
        return _this.row;
    }

    function get_column() {
        return _this.column;
    }

    function get_width() {
        return _this.width;
    }

    function get_height() {
        return _this.height;
    }

    function get_padding() {
        return _this.padding;
    }

    function get_cell_div() {
        // todo implement this
        // follow initializePlotDiv() function in state_dem.js file for reference
    }

    function refresh_cell(cellInput) {
        // todo implement this
    }

    var plotly_layout_opts = {
        title: "Plot Title",
        plot_bgcolor: 'rgb(0,0,0)',
        paper_bgcolor: 'rgb(0,0,0)',
        xaxis: {
            dtick: 120,
            tickcolor: 'rgb(100,100,100)',
            tickfont: {
                /*size: 25,*/
                color: 'rgb(200,200,200)'
            },
            gridcolor: '#333333'
        },
        yaxis: {
            title: "MW",
            tickcolor: 'rgb(100,100,100)',
            tickfont: {
                /*size: 25,*/
                color: 'rgb(200,200,200)'
            },
            titlefont: {
                size: 20,
                color: '#000000'
            },
            gridcolor: '#333333'
        },
        margin: {l: 50, pad: 1, t: 0, r: 0},
        legend: {
            orientation: 'h',
            font: {
                size: 20,
                color: 'rgb(200,200,200)'
            }
        },
        titlefont: {
            /*size: 35,*/
            color: 'rgb(200,200,200)'
        }
    };

}