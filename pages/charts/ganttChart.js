import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function GanttChart() {
    return (
        <div>
            <Head>
                <title>Gantt Chart</title>
                <meta name="description" content="Gantt Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-444444444444"}
                    title={"Project Timeline"}
                    width={"100%"}
                    height={400}
                />
            </Box>
        </div>
    )
}
