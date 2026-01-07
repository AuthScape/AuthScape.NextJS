import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function WaterfallChart() {
    return (
        <div>
            <Head>
                <title>Waterfall Chart</title>
                <meta name="description" content="Waterfall Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-BBBBBBBBBBBB"}
                    title={"Profit Breakdown"}
                    width={"100%"}
                    height={400}
                />
            </Box>
        </div>
    )
}
