import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function SteppedAreaChart() {
    return (
        <div>
            <Head>
                <title>Stepped Area Chart</title>
                <meta name="description" content="Stepped Area Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-777777777777"}
                    title={"Inventory Levels"}
                    width={"100%"}
                    height={400}
                />
            </Box>
        </div>
    )
}
