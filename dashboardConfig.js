/**
 * Created by Nagasudhir on 4/30/2018.
 */

var dashboardConfig = {
    cell_props: [
        {
            width: '100%',
            height: '33%',
            dtick: 1,
            title: 'Gujarat Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'Gujarat Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA1.A0104731',
                    server_base_address: 'http://localhost:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'Gujarat Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA1.A0104731',
                    server_base_address: 'http://localhost:62448',
                    history_fetch_strategy: 'average'
                }
            ]
        }, {
            row: 1,
            width: '100%',
            height: '33%',
            dtick: 1,
            title: 'Maharashtra Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'Maharashtra Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA1.A0109531',
                    server_base_address: 'http://localhost:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'Maharashtra Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA1.A0109531',
                    server_base_address: 'http://localhost:62448',
                    history_fetch_strategy: 'average'
                }
            ]
        }, {
            row: 2,
            width: '100%',
            height: '33%',
            dtick: 1,
            title: 'MP Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'MP Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA1.A0108547',
                    server_base_address: 'http://localhost:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'MP Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA1.A0108547',
                    server_base_address: 'http://localhost:62448',
                    history_fetch_strategy: 'average'
                }
            ]
        }
    ]
};
