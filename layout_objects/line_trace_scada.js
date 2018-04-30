/**
 * Created by Nagasudhir on 4/29/2018.
 */
"use strict";

function LineTraceScada(opt_options) {
    // avoiding .bind(this) in every function
    // https://stackoverflow.com/questions/30912506/how-to-avoid-bindthis-on-every-function
    var _this = this;

    //initial values
    _this.fetch_objects = [];
    _this.trace_title = 'Plot title';
    _this.trace_color = 'rgb(255, 0, 0)';
    _this.trace_width = 3;
    _this.pnt_id = 'xyz';
    _this.server_base_address = 'http://wmrm0mc1:62448';
    _this.history_fetch_strategy = 'snap';
    _this.fetch_period = '60';
    _this.start_time_mode = 'absolute';
    _this.start_date_mode = 'variable';
    _this.start_date_offset = 0;
    _this.start_hrs = 0;
    _this.start_mins = 0;
    _this.start_secs = 0;
    _this.start_day = 1;
    _this.start_month = 1;
    _this.start_year = 2018;
    _this.end_time_mode = 'absolute';
    _this.end_date_mode = 'variable';
    _this.end_date_offset = 0;
    _this.end_hrs = 23;
    _this.end_mins = 59;
    _this.end_secs = 59;
    _this.end_day = 1;
    _this.end_month = 1;
    _this.end_year = 2018;


    // set provided options, if any
    if (opt_options) {
        setOptions(opt_options);
    }

    function setOptions(options) {
        if (options.trace_title !== undefined) {
            set_trace_title(options.trace_title);
        }
        if (options.trace_color !== undefined) {
            _this.trace_color = options.trace_color;
        }
        if (options.trace_width !== undefined) {
            _this.trace_width = options.trace_width;
        }
        if (options.pnt_id !== undefined) {
            set_pnt_id(options.pnt_id)
        }
        if (options.history_fetch_strategy !== undefined) {
            set_history_fetch_strategy(options.history_fetch_strategy)
        }
        // create setters if required, but here we are using directly _this for setting properties
        if (options.fetch_period !== undefined) {
            _this.fetch_period = options.fetch_period;
        }
        if (options.server_base_address !== undefined) {
            _this.server_base_address = options.server_base_address;
        }
        if (options.start_time_mode !== undefined) {
            _this.start_time_mode = options.start_time_mode;
        }
        if (options.start_date_mode !== undefined) {
            _this.start_date_mode = options.start_date_mode;
        }
        if (options.start_date_offset !== undefined) {
            _this.start_date_offset = options.start_date_offset;
        }
        if (options.start_hrs !== undefined) {
            _this.start_hrs = options.start_hrs;
        }
        if (options.start_mins !== undefined) {
            _this.start_mins = options.start_mins;
        }
        if (options.start_secs !== undefined) {
            _this.start_secs = options.start_secs;
        }
        if (options.start_day !== undefined) {
            _this.start_day = options.start_day;
        }
        if (options.start_month !== undefined) {
            _this.start_month = options.start_month;
        }
        if (options.start_year !== undefined) {
            _this.start_year = options.start_year;
        }
        if (options.end_time_mode !== undefined) {
            _this.end_time_mode = options.end_time_mode;
        }
        if (options.end_date_mode !== undefined) {
            _this.end_date_mode = options.end_date_mode;
        }
        if (options.end_date_offset !== undefined) {
            _this.end_date_offset = options.end_date_offset;
        }
        if (options.end_hrs !== undefined) {
            _this.end_hrs = options.end_hrs;
        }
        if (options.end_mins !== undefined) {
            _this.end_mins = options.end_mins;
        }
        if (options.end_secs !== undefined) {
            _this.end_secs = options.end_secs;
        }
        if (options.end_day !== undefined) {
            _this.end_day = options.end_day;
        }
        if (options.end_month !== undefined) {
            _this.end_month = options.end_month;
        }
        if (options.end_year !== undefined) {
            _this.end_year = options.end_year;
        }
    }

    //setters
    _this.set_trace_title = set_trace_title;
    _this.set_pnt_id = set_pnt_id;
    _this.set_history_fetch_strategy = set_history_fetch_strategy;

    //getters
    _this.get_trace_title = get_trace_title;
    _this.get_pnt_id = get_pnt_id;
    _this.get_history_fetch_strategy = get_history_fetch_strategy;
    _this.get_start_time_mode = get_start_time_mode;
    _this.get_start_date_mode = get_start_date_mode;
    _this.get_start_date_offset = get_start_date_offset;

    //Public Methods
    _this.get_fetch_url = get_fetch_url;
    _this.get_start_time_str = get_start_time_str;
    _this.get_end_time_str = get_end_time_str;
    _this.fetch_scada_data_async = fetch_scada_data_async;
    _this.get_timestamps = get_timestamps;
    _this.get_values = get_values;
    _this.get_status_values = get_status_values;
    _this.get_trace_obj = get_trace_obj;

    /**Setters**/
    function set_trace_title(cellsInput) {
        _this.trace_title = cellsInput;
    }

    function set_pnt_id(pnt_id) {
        _this.pnt_id = pnt_id;
    }

    function set_history_fetch_strategy(history_fetch_strategy) {
        _this.history_fetch_strategy = history_fetch_strategy;
    }

    /**Getters**/
    function get_trace_title() {
        return _this.trace_title;
    }

    function get_pnt_id() {
        return _this.pnt_id;
    }

    function get_history_fetch_strategy() {
        return _this.history_fetch_strategy;
    }

    function get_start_time_mode() {
        return _this.start_time_mode;
    }

    function get_start_date_mode() {
        return _this.start_date_mode;
    }

    function get_start_date_offset() {
        return _this.start_date_offset;
    }

    function fetch_scada_data_async(callback) {
        var urlStr = _this.get_fetch_url();
        $.ajax({
            //fetch revisions data from sever
            url: urlStr,
            type: "GET",
            success: function (data) {
                //WriteLineConsole(urlStr);
                //WriteLineConsole(JSON.stringify(data));
                _this.fetch_objects = data;
                callback(null, true);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                WriteLineConsole(JSON.stringify(jqXHR));
                console.log(textStatus, errorThrown);
                callback(textStatus);
            }
        });
    }

    function get_timestamps() {
        var xLabels = [];

        for (var i = 0; i < _this.fetch_objects.length; i++) {
            xLabels.push(_this.fetch_objects[i]['timestamp']);
        }

        return xLabels;
    }

    function get_values() {
        var values = [];

        for (var i = 0; i < _this.fetch_objects.length; i++) {
            values.push(_this.fetch_objects[i]['dval']);
        }

        return values;
    }

    function get_status_values() {
        var statusLabels = [];

        for (var i = 0; i < _this.fetch_objects.length; i++) {
            statusLabels.push(_this.fetch_objects[i]['status']);
        }

        return statusLabels;
    }

    function get_trace_obj() {
        var trace_obj = {
            y: [],
            line: {
                color: 'rgb(255,255,0)',
                width: 3
            },
            name: 'TraceName'
        };
        trace_obj.name = _this.trace_title;
        trace_obj.line.color = _this.trace_color;
        trace_obj.line.width = _this.trace_width;
        trace_obj.y = _this.get_values();
        return trace_obj;
    }

    function get_fetch_url() {
        var url = "";
        if (_this.history_fetch_strategy == "real") {
            url = _this.server_base_address + "/api/values/" + _this.history_fetch_strategy + "?pnt=" + this.pnt_id;
        } else if (["snap", "average", "max", "min", "raw"].indexOf(_this.history_fetch_strategy) != -1) {
            var strtime = get_start_time_str();
            var endtime = get_end_time_str();
            url = _this.server_base_address + "/api/values/history?pnt=" + this.pnt_id + "&strtime=" + strtime + "&endtime=" + endtime + "&secs=" + _this.fetch_period + "&type=" + _this.history_fetch_strategy;
        }
        //WriteLineConsole(url);
        return url;
    }

    function get_start_time_str() {
        return get_time_str(_this.start_time_mode, _this.start_date_mode, _this.start_date_offset, _this.start_hrs, _this.start_mins, _this.start_secs, _this.start_day, _this.start_month, _this.start_year);
    }

    function get_end_time_str() {
        return get_time_str(_this.end_time_mode, _this.end_date_mode, _this.end_date_offset, _this.end_hrs, _this.end_mins, _this.end_secs, _this.end_day, _this.end_month, _this.end_year);
    }

    function get_time_str(timeMode, dateMode, daysOffset, hrs, mins, secs, day, month, year) {
        var timeStr = "";
        // example result = 30/11/2016/00:00:00
        var dateObj = new Date();
        if (timeMode == "absolute") {
            if (dateMode == "absolute") {
                // new Date(year, month, day, hours, minutes, seconds, milliseconds)
                dateObj = new Date(year, month, day, hrs, mins, secs, 0);
            } else {
                // this is a variable date mode
                dateObj = new Date((new Date()).getTime() + daysOffset * 86400000);
                dateObj.setHours(hrs);
                dateObj.setMinutes(mins);
                dateObj.setSeconds(secs);
                dateObj.setMilliseconds(secs);
            }
        }
        else {
            // this variable time mode
            dateObj = new Date((new Date()).getTime() + daysOffset * 86400000 + hrs * 3600000 + mins * 60000 + secs * 1000);
        }
        return timeObjToStr(dateObj);
    }

    function timeObjToStr(x) {
        var timStr = makeTwoDigits(x.getDate()) + "/" + makeTwoDigits(x.getMonth() + 1) + "/" + x.getFullYear() + "/" + makeTwoDigits(x.getHours()) + ":" + makeTwoDigits(x.getMinutes()) + ":" + makeTwoDigits(x.getSeconds());
        return timStr;
    }

    function makeTwoDigits(x) {
        if (x < 10) {
            return "0" + x;
        }
        else {
            return x;
        }
    }
}