/**
 * Created by Nagasudhir on 4/30/2018.
 */

var dashboardConfig = {
    cell_props: [
        {
            width: '50%',
            height: '50%',
            dtick: 120,
            title: 'WR Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'WR Wind D-2',
                    trace_color: 'rgb(255, 0, 255)',
                    pnt_id: 'WRLDCMP.SCADA3.A0107701',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -2,
                    end_date_offset: -2
                },
				{
                    trace_title: 'WR Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0107701',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'WR Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0107701',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: 0,
                    end_date_offset: 0
                }
            ]
        },{
            column: 1,
            width: '50%',
            height: '50%',
            dtick: 120,
            title: 'Gujarat Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'Gujarat Wind D-2',
                    trace_color: 'rgb(255, 0, 255)',
                    pnt_id: 'WRLDCMP.SCADA3.A0104731',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -2,
                    end_date_offset: -2
                },{
                    trace_title: 'Gujarat Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0104731',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'Gujarat Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0104731',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: 0,
                    end_date_offset: 0
                }
            ]
        }, {
            column: 0,row: 1,
            width: '50%',
            height: '50%',
            dtick: 120,
            title: 'Maharashtra Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'Maharashtra Wind D-2',
                    trace_color: 'rgb(255, 0, 255)',
                    pnt_id: 'WRLDCMP.SCADA3.A0109531',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -2,
                    end_date_offset: -2
                },{
                    trace_title: 'Maharashtra Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0109531',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'Maharashtra Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0109531',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: 0,
                    end_date_offset: 0
                }
            ]
        }, {
            column: 1,row: 1,
            width: '50%',
            height: '50%',
            dtick: 120,
            title: 'MP Wind',
            x_axis_title: '',
            y_axis_title: 'MW',
            trace_props: [
                {
                    trace_title: 'MP Wind D-2',
                    trace_color: 'rgb(255, 0, 255)',
                    pnt_id: 'WRLDCMP.SCADA3.A0108547',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -2,
                    end_date_offset: -2
                },{
                    trace_title: 'MP Wind Yesterday',
                    trace_color: 'rgb(255, 0, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0108547',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: -1,
                    end_date_offset: -1
                },
                {
                    trace_title: 'MP Wind',
                    trace_color: 'rgb(255, 255, 0)',
                    pnt_id: 'WRLDCMP.SCADA3.A0108547',
                    server_base_address: 'http://wmrm0mc1:62448',
                    history_fetch_strategy: 'average',
                    start_date_offset: 0,
                    end_date_offset: 0
                }
            ]
        }
    ]
};
