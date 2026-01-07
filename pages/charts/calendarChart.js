import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function CalendarChart() {
    return (
        <div>
            <Head>
                <title>Calendar Chart</title>
                <meta name="description" content="Calendar Heatmap Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-AAAAAAAAAAAA"}
                    title={"Activity Heatmap"}
                    width={"100%"}
                    height={300}
                />
            </Box>
        </div>
    )
}
