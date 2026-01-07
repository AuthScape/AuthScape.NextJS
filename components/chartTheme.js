/**
 * Chart Theme Configuration
 * Matches the MUI theme from theme.js
 * Primary: #5D87FF, Secondary: #49BEFF
 */

export const chartTheme = {
    // Color palette matching MUI theme
    colors: [
        '#5D87FF',  // Primary
        '#49BEFF',  // Secondary
        '#13DEB9',  // Success
        '#FFAE1F',  // Warning
        '#FA896B',  // Error
        '#8B5CF6',  // Purple
        '#EC4899',  // Pink
        '#10B981',  // Emerald
        '#F59E0B',  // Amber
        '#6366F1',  // Indigo
    ],

    // Base options applied to all charts
    baseOptions: {
        backgroundColor: 'transparent',
        fontName: 'Public Sans, Plus Jakarta Sans, Roboto, sans-serif',
        titleTextStyle: {
            color: '#2A3547',
            fontSize: 16,
            bold: true,
        },
        legendTextStyle: {
            color: '#5A6A85',
            fontSize: 12,
        },
        tooltip: {
            textStyle: {
                color: '#2A3547',
                fontSize: 13,
            },
            showColorCode: true,
        },
        animation: {
            startup: true,
            duration: 500,
            easing: 'out',
        },
    },

    // Axis styling
    axisStyles: {
        hAxis: {
            textStyle: { color: '#5A6A85', fontSize: 11 },
            titleTextStyle: { color: '#2A3547', fontSize: 12, italic: false },
            gridlines: { color: '#E0E0E0', count: -1 },
            minorGridlines: { color: '#F5F5F5' },
            baselineColor: '#E0E0E0',
        },
        vAxis: {
            textStyle: { color: '#5A6A85', fontSize: 11 },
            titleTextStyle: { color: '#2A3547', fontSize: 12, italic: false },
            gridlines: { color: '#F5F5F5', count: -1 },
            minorGridlines: { color: '#FAFAFA' },
            baselineColor: '#E0E0E0',
        },
    },

    // Chart-specific options
    chartOptions: {
        // Area Chart
        AreaChart: {
            areaOpacity: 0.3,
            lineWidth: 2,
            pointSize: 4,
            curveType: 'function',
        },

        // Line Chart
        LineChart: {
            lineWidth: 3,
            pointSize: 5,
            curveType: 'function',
        },

        // Bar Chart (horizontal bars)
        Bar: {
            bar: { groupWidth: '70%' },
            chartArea: { width: '70%', height: '80%' },
        },

        // Column Chart (vertical bars)
        ColumnChart: {
            bar: { groupWidth: '70%' },
        },

        // Combo Chart
        ComboChart: {
            seriesType: 'bars',
            bar: { groupWidth: '70%' },
        },

        // Pie Chart
        PieChart: {
            pieSliceTextStyle: { color: '#ffffff', fontSize: 12 },
            sliceVisibilityThreshold: 0.02,
            pieSliceBorderColor: '#ffffff',
        },

        // Donut Chart (Pie with hole)
        DonutChart: {
            pieHole: 0.4,
            pieSliceTextStyle: { color: '#ffffff', fontSize: 12 },
            sliceVisibilityThreshold: 0.02,
            pieSliceBorderColor: '#ffffff',
        },

        // Gauge Chart
        Gauge: {
            greenFrom: 70,
            greenTo: 100,
            yellowFrom: 40,
            yellowTo: 70,
            redFrom: 0,
            redTo: 40,
            minorTicks: 5,
        },

        // Scatter Chart
        ScatterChart: {
            pointSize: 8,
            trendlines: {
                0: {
                    type: 'linear',
                    color: '#5D87FF',
                    lineWidth: 2,
                    opacity: 0.4,
                    showR2: true,
                    visibleInLegend: true,
                }
            },
        },

        // Bubble Chart
        BubbleChart: {
            bubble: {
                textStyle: { fontSize: 11, color: '#2A3547' },
            },
            colorAxis: {
                colors: ['#ECF2FF', '#5D87FF'],
            },
        },

        // Candlestick Chart
        CandlestickChart: {
            candlestick: {
                fallingColor: { fill: '#FA896B', stroke: '#FA896B' },
                risingColor: { fill: '#13DEB9', stroke: '#13DEB9' },
            },
        },

        // Histogram
        Histogram: {
            histogram: { bucketSize: 'auto' },
            bar: { gap: 1 },
        },

        // Timeline
        Timeline: {
            timeline: {
                colorByRowLabel: true,
                showBarLabels: true,
            },
            avoidOverlappingGridLines: false,
        },

        // Gantt Chart
        Gantt: {
            gantt: {
                trackHeight: 30,
                criticalPathEnabled: true,
                criticalPathStyle: {
                    stroke: '#FA896B',
                    strokeWidth: 2,
                },
                arrow: {
                    angle: 100,
                    width: 2,
                    color: '#5D87FF',
                    radius: 0,
                },
            },
        },

        // Geo Chart
        GeoChart: {
            colorAxis: {
                colors: ['#ECF2FF', '#5D87FF', '#4570EA'],
            },
            datalessRegionColor: '#F0F0F0',
            defaultColor: '#E0E0E0',
        },

        // Org Chart
        OrgChart: {
            nodeClass: 'org-node',
            selectedNodeClass: 'org-node-selected',
            size: 'medium',
            allowCollapse: true,
        },

        // Stepped Area Chart
        SteppedAreaChart: {
            areaOpacity: 0.3,
            isStacked: false,
        },

        // TreeMap
        TreeMap: {
            minColor: '#ECF2FF',
            midColor: '#5D87FF',
            maxColor: '#4570EA',
            headerHeight: 20,
            fontColor: '#2A3547',
            showScale: true,
            highlightOnMouseOver: true,
        },

        // Word Tree
        WordTree: {
            wordtree: {
                format: 'implicit',
                type: 'double',
            },
        },

        // Sankey
        Sankey: {
            sankey: {
                node: {
                    colors: ['#5D87FF', '#49BEFF', '#13DEB9', '#FFAE1F', '#FA896B'],
                    label: {
                        fontName: 'Public Sans, sans-serif',
                        fontSize: 12,
                        color: '#2A3547',
                    },
                    nodePadding: 20,
                },
                link: {
                    colorMode: 'gradient',
                },
            },
        },

        // Calendar
        Calendar: {
            calendar: {
                cellSize: 15,
                cellColor: {
                    stroke: '#E0E0E0',
                    strokeOpacity: 0.5,
                    strokeWidth: 1,
                },
                focusedCellColor: {
                    stroke: '#5D87FF',
                    strokeOpacity: 1,
                    strokeWidth: 2,
                },
                monthLabel: {
                    fontName: 'Public Sans, sans-serif',
                    fontSize: 11,
                    color: '#5A6A85',
                },
                monthOutlineColor: {
                    stroke: '#E0E0E0',
                    strokeOpacity: 0.8,
                    strokeWidth: 1,
                },
                unusedMonthOutlineColor: {
                    stroke: '#F5F5F5',
                    strokeOpacity: 0.5,
                    strokeWidth: 1,
                },
                dayOfWeekLabel: {
                    fontName: 'Public Sans, sans-serif',
                    fontSize: 10,
                    color: '#5A6A85',
                },
            },
            colorAxis: {
                minValue: 0,
                colors: ['#ECF2FF', '#5D87FF', '#4570EA'],
            },
        },
    },
};

/**
 * Get merged options for a specific chart type
 * @param {string} chartType - The Google Charts chart type
 * @param {string} title - Chart title
 * @param {object} customOptions - Additional custom options
 * @returns {object} Merged chart options
 */
export const getChartOptions = (chartType, title = '', customOptions = {}) => {
    const baseOptions = {
        ...chartTheme.baseOptions,
        ...chartTheme.axisStyles,
        title,
        colors: chartTheme.colors,
    };

    // Map chart type to options key
    let optionsKey = chartType;

    // Handle special cases
    if (chartType === 'PieChart' && customOptions.pieHole) {
        optionsKey = 'DonutChart';
    }

    const chartSpecificOptions = chartTheme.chartOptions[optionsKey] || {};

    return {
        ...baseOptions,
        ...chartSpecificOptions,
        ...customOptions,
    };
};

export default chartTheme;
