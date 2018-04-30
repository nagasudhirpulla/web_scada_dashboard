/**
 * Created by Nagasudhir on 4/29/2018.
 */
"use strict";

function DashboardCell(opt_options) {
    // div class = dashboard-cell

    // set tick texts separately
    // https://codepen.io/etpinard/pen/zqLxzm

    // avoiding .bind(this) in every function
    // https://stackoverflow.com/questions/30912506/how-to-avoid-bindthis-on-every-function
    var _this = this;

    //initial values
    _this.trace_objs = [];
    _this.row = 0;
    _this.column = 0;
    _this.width = '500';
    _this.height = '500';
    _this.padding = '0';
    _this.dtick = 120;
    _this.title = 'Cell Title';
    _this.x_axis_title = '';
    _this.y_axis_title = 'MW';

    _this.cell_div = document.createElement('div');
    _this.cell_div.className += ' dashboard-cell';
    _this.plot_div = document.createElement('div');
    _this.plot_div.id = createUUID();
    _this.plot_div.className += ' plot-div';
    _this.cell_div.appendChild(_this.plot_div);

    // set provided options, if any
    if (opt_options) {
        setOptions(opt_options);
    }

    function setOptions(options) {
        if (options.trace_objs !== undefined) {
            set_trace_objs(options.trace_objs);
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
        if (options.title !== undefined) {
            _this.title = options.title;
        }
        if (options.x_axis_title !== undefined) {
            _this.x_axis_title = options.x_axis_title;
        }
        if (options.y_axis_title !== undefined) {
            _this.y_axis_title = options.y_axis_title;
        }
    }

    //setters
    _this.set_trace_objs = set_trace_objs;
    _this.set_row = set_row;
    _this.set_column = set_column;
    _this.set_width = set_width;
    _this.set_height = set_height;
    _this.set_padding = set_padding;

    //getters
    _this.get_trace_objs = get_trace_objs;
    _this.get_row = get_row;
    _this.get_column = get_column;
    _this.get_width = get_width;
    _this.get_height = get_height;
    _this.get_padding = get_padding;

    //Public Methods
    _this.refresh_cell_data_async = refresh_cell_data_async;
    _this.get_plot_data = get_plot_data;
    _this.push_trace = push_trace;
    _this.relayout_cell_div = relayout_cell_div;

    /**Setters**/
    function set_trace_objs(cellsInput) {
        _this.trace_objs = cellsInput;
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
        _this.trace_objs.push(cellInput);
    }

    /**Getters**/
    function get_trace_objs() {
        return _this.trace_objs;
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

    function get_plot_data() {
        var plotData = [];
        //stub
        for (var trace_iter = 0; trace_iter < _this.trace_objs.length; trace_iter++) {
            plotData.push(_this.trace_objs[trace_iter].get_trace_obj());
        }
        return plotData;
    }

    function relayout_cell_div() {
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
        // stub
        // follow initializePlotDiv() function in state_dem.js file for reference
        _this.cell_div.style.height = _this.height;
        _this.cell_div.style.width = _this.width;
        _this.cell_div.style.padding = _this.padding;

        _this.plot_div.style.height = '100%';
        _this.plot_div.style.width = '100%';
        _this.plot_div.style.padding = 0;

        var plotData = _this.get_plot_data();
        // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
        var plot_layout_props = $.extend(true, {}, plotly_layout_opts);
        plot_layout_props.title = _this.title;
        plot_layout_props.xaxis.dtick = _this.dtick;
        Plotly.newPlot(_this.plot_div, plotData, plot_layout_props);
    }

    function refresh_cell_data_async(callback) {
        var traceIterators = [];
        for (var i = 0; i < _this.trace_objs.length; i++) {
            traceIterators.push(i);
        }

        var updateTraceValues = function (traceIterator, callback) {
            var traceObj = _this.trace_objs[traceIterator];
            _this.trace_objs[traceIterator].fetch_scada_data_async(function (err, isDone) {
                if (err) {
                    return callback(null);
                    //todo handle fetch error
                } else {
                    return callback(null);
                }
            });
        };

        async.mapSeries(traceIterators, updateTraceValues, function (err, results) {
            if (err) {
                // handle error - do nothing since the all values are not fetched
                //WriteLineConsole("All values not fetched via API due to error: " + JSON.stringify(err));
                return callback(null);
            }
            //All the values are fetched
            // now plot all the the divs
            var plotData = _this.get_plot_data();
            _this.plot_div.data = plotData;
            //stub
            Plotly.redraw(_this.plot_div);
            //_this.relayout_cell_div();
            return callback(null);
        });
    }

    function createUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}