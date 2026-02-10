import React, { useEffect, useState } from 'react';
import { apiService } from 'authscape';
import Chart from "react-google-charts";
import { Box, Skeleton, Alert, Grid, Card, CardContent, Typography } from '@mui/material';
import { useRef } from 'react';
import { getChartOptions } from './chartTheme';

// Helper function to process widget data for Google Charts
const processWidgetData = (widget) => {
    let dataArray = [];

    // Handle typed columns (for Timeline, Gantt, Calendar, etc.)
    if (widget.columns && widget.columns.length > 0 && typeof widget.columns[0] === 'object' && widget.columns[0].type) {
        let typedColumns = widget.columns.map(col => ({
            type: col.type,
            label: col.id
        }));
        dataArray.push(typedColumns);
    } else {
        dataArray.push(widget.columns);
    }

    if (widget.content != null) {
        for (let index = 0; index < widget.content.length; index++) {
            const contentData = widget.content[index];

            // Handle date conversion for charts that need it
            // Timeline (14), Calendar (5), Gantt (20)
            if (widget.reportType == 14 || widget.reportType == 5 || widget.reportType == 20) {
                let contentArray = Array.isArray(contentData) ? contentData : contentData.toString().split(",");
                let newArray = [];

                for (let i = 0; i < contentArray.length; i++) {
                    const element = contentArray[i];

                    if (typeof element === 'string' && element.indexOf("DT-") != -1) {
                        newArray.push(new Date(element.replace("DT-", "")));
                    } else if (element === null || element === undefined) {
                        newArray.push(null);
                    } else {
                        newArray.push(element);
                    }
                }

                dataArray.push(newArray);
            } else {
                dataArray.push(contentData);
            }
        }
    }

    return dataArray;
};

// Map report type IDs to Google Charts chart types
const GetChartType = (responseChartId) => {
    const chartTypeMap = {
        1: "AnnotationChart",    // AnnotationChartReport
        2: "AreaChart",          // AreaChartReport
        3: "Bar",                // BarChartReport (horizontal)
        4: "BubbleChart",        // BubbleChartReport
        5: "Calendar",           // CalendarChartReport
        6: "CandlestickChart",   // CandleStickChartReport
        7: "ColumnChart",        // ColumnChartReport (vertical)
        8: "Gauge",              // GaugeChartReport
        9: "PieChart",           // PieChartReport
        10: "ScatterChart",      // ScatterChartReport
        11: "Table",             // TableReport
        12: "Table",             // TextReport (fallback to table)
        13: "Histogram",         // HistogramsReport
        14: "Timeline",          // TimelineReport
        15: "WordTree",          // WordTree
        16: "Sankey",            // SanKey
        17: "LineChart",         // LineChartReport
        18: "ComboChart",        // ComboChartReport
        19: "PieChart",          // DonutChartReport (uses PieChart with pieHole)
        20: "Gantt",             // GanttChartReport
        21: "GeoChart",          // GeoChartReport
        22: "OrgChart",          // OrgChartReport
        23: "SteppedAreaChart",  // SteppedAreaChartReport
        24: "TreeMap",           // TreeMapChartReport
        25: "CandlestickChart",  // WaterfallChartReport (uses Candlestick)
    };

    return chartTypeMap[responseChartId] || "Table";
};

// Get chart-specific options based on report type
const getOptionsForChart = (chartId, chartTitle, apiOptions) => {
    const chartType = GetChartType(chartId);
    let customOptions = {};

    switch (chartId) {
        case 15: // WordTree
            if (apiOptions && apiOptions.wordtree) {
                customOptions = { wordtree: apiOptions.wordtree };
            } else {
                customOptions = {
                    wordtree: {
                        format: 'implicit',
                        word: 'cats'
                    }
                };
            }
            break;
        case 19: // Donut
            customOptions = { pieHole: 0.4 };
            break;
        case 20: // Gantt
            if (apiOptions && apiOptions.gantt) {
                customOptions = { gantt: apiOptions.gantt };
            } else {
                customOptions = {
                    gantt: {
                        trackHeight: 30,
                        criticalPathEnabled: true,
                        criticalPathStyle: {
                            stroke: '#FA896B',
                            strokeWidth: 2,
                        },
                    },
                };
            }
            break;
        case 25: // Waterfall (uses candlestick)
            customOptions = {
                bar: { groupWidth: '80%' },
                candlestick: {
                    fallingColor: { fill: '#FA896B', stroke: '#FA896B' },
                    risingColor: { fill: '#13DEB9', stroke: '#13DEB9' },
                },
            };
            break;
        default:
            if (apiOptions) {
                customOptions = { ...apiOptions };
            }
            break;
    }

    return getChartOptions(chartType, chartTitle, customOptions);
};

// Text Widget Component (for TextReport type 12)
const WidgetText = ({ widget, width, height }) => {
    const text = widget.content && widget.content.length > 0 ? widget.content[0] : '';
    const textTitle = widget.options?.title;

    return (
        <Box sx={{ width, minHeight: height, p: 2 }}>
            {textTitle && (
                <Typography variant="h6" gutterBottom>
                    {textTitle}
                </Typography>
            )}
            <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                {text}
            </Typography>
        </Box>
    );
};

// Single Widget Chart Component
const WidgetChart = ({ widget, width, height, title }) => {
    // Handle TextReport separately (not a Google Chart)
    if (widget.reportType === 12) {
        return <WidgetText widget={widget} width={width} height={height} />;
    }

    const reportData = processWidgetData(widget);
    const chartTitle = widget.name || title;

    return (
        <Chart
            width={width}
            height={height}
            chartType={GetChartType(widget.reportType)}
            loader={
                <Box sx={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="rectangular" width="90%" height={height - 40} />
                </Box>
            }
            data={reportData}
            options={getOptionsForChart(widget.reportType, chartTitle, widget.options)}
            legendToggle
        />
    );
};

export default function Report({ chartMethod, title = "", payload = null, width = 400, height = 300 }) {

    const refIsLoadedReport = useRef(false);

    const [reportData, setReportData] = useState(null);
    const [responseChartId, setChartId] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);
    const [widgets, setWidgets] = useState(null);
    const [isFullReport, setIsFullReport] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GetData = async () => {
        try {
            setLoading(true);
            setError(null);

            let response = await apiService().post("/Reporting", {
                id: chartMethod,
                payload: JSON.stringify(payload)
            });
            let data = response.data;

            // Check if this is a full report (multi-widget) response
            if (data.isFullReport && data.widgets) {
                setIsFullReport(true);
                setWidgets(data.widgets);
            } else {
                // Legacy single-widget response format
                setIsFullReport(false);

                let dataArray = [];

                // Handle typed columns (for Timeline, Gantt, Calendar, etc.)
                if (data.columns && data.columns.length > 0 && typeof data.columns[0] === 'object' && data.columns[0].type) {
                    let typedColumns = data.columns.map(col => ({
                        type: col.type,
                        label: col.id
                    }));
                    dataArray.push(typedColumns);
                } else {
                    dataArray.push(data.columns);
                }

                if (data != "" && data.content != null) {
                    for (let index = 0; index < data.content.length; index++) {
                        const contentData = data.content[index];

                        if (data.reportType == 14 || data.reportType == 5 || data.reportType == 20) {
                            let contentArray = Array.isArray(contentData) ? contentData : contentData.toString().split(",");
                            let newArray = [];

                            for (let i = 0; i < contentArray.length; i++) {
                                const element = contentArray[i];

                                if (typeof element === 'string' && element.indexOf("DT-") != -1) {
                                    newArray.push(new Date(element.replace("DT-", "")));
                                } else if (element === null || element === undefined) {
                                    newArray.push(null);
                                } else {
                                    newArray.push(element);
                                }
                            }

                            dataArray.push(newArray);
                        } else {
                            dataArray.push(contentData);
                        }
                    }
                    setReportData(dataArray);
                }

                setChartId(data.reportType);

                if (data.options) {
                    setChartOptions(data.options);
                }
            }
        } catch (err) {
            console.error('Chart loading error:', err);
            setError('Failed to load chart data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!refIsLoadedReport.current) {
            refIsLoadedReport.current = true;
            const fetchData = async () => {
                await GetData();
            }
            fetchData();
        }
    }, [refIsLoadedReport.current])

    // Loading skeleton
    if (loading) {
        return (
            <Box sx={{ width, height, p: 2 }}>
                <Skeleton variant="text" width="60%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={height - 60} animation="wave" />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box sx={{ width, p: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    // Full Report with multiple widgets
    if (isFullReport && widgets && widgets.length > 0) {
        // Group widgets by row
        const rows = {};
        widgets.forEach(widget => {
            const rowNum = widget.row || 0;
            if (!rows[rowNum]) {
                rows[rowNum] = [];
            }
            rows[rowNum].push(widget);
        });

        // Sort rows by row number
        const sortedRowKeys = Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b));

        return (
            <Box sx={{ width: '100%' }}>
                {sortedRowKeys.map(rowKey => (
                    <Grid container spacing={2} key={rowKey} sx={{ mb: 2 }}>
                        {rows[rowKey]
                            .sort((a, b) => (a.column || 0) - (b.column || 0))
                            .map((widget, index) => {
                                // Convert 12-column grid to MUI 12-column grid
                                const colSpan = widget.columnSpan || 12;
                                return (
                                    <Grid item xs={12} md={colSpan} key={widget.widgetId || index}>
                                        <Card variant="outlined">
                                            {widget.name && (
                                                <CardContent sx={{ pb: 0 }}>
                                                    <Typography variant="h6" component="div">
                                                        {widget.name}
                                                    </Typography>
                                                </CardContent>
                                            )}
                                            <CardContent>
                                                <WidgetChart
                                                    widget={widget}
                                                    width="100%"
                                                    height={height}
                                                    title={widget.name || title}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                    </Grid>
                ))}
            </Box>
        );
    }

    // Legacy single widget - TextReport
    if (responseChartId === 12 && reportData != null) {
        const text = reportData.length > 1 ? reportData[1] : '';
        return (
            <Box sx={{ width, minHeight: height, p: 2 }}>
                {title && (
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                )}
                <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                </Typography>
            </Box>
        );
    }

    // Legacy single widget rendering
    return (
        <Box>
            {(reportData != null && responseChartId != null) &&
                <Chart
                    width={width}
                    height={height}
                    chartType={GetChartType(responseChartId)}
                    loader={
                        <Box sx={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Skeleton variant="rectangular" width="90%" height={height - 40} />
                        </Box>
                    }
                    data={reportData}
                    options={getOptionsForChart(responseChartId, title, chartOptions)}
                    legendToggle
                />
            }
        </Box>
    )
}
