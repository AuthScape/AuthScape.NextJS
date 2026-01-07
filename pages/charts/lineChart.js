import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function LineChart() {
    return (
        <div>
            <Head>
                <title>Line Chart</title>
                <meta name="description" content="Line Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-111111111111"}
                    title={"Monthly Sales Trend"}
                    width={"100%"}
                    height={400}
                />
            </Box>
        </div>
    )
}
