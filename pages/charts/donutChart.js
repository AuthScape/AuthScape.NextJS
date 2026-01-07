import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function DonutChart() {
    return (
        <div>
            <Head>
                <title>Donut Chart</title>
                <meta name="description" content="Donut Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-333333333333"}
                    title={"Sales by Channel"}
                    width={"100%"}
                    height={400}
                />
            </Box>
        </div>
    )
}
