import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function TreeMapChart() {
    return (
        <div>
            <Head>
                <title>Tree Map Chart</title>
                <meta name="description" content="Tree Map Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-888888888888"}
                    title={"Department Budget Allocation"}
                    width={"100%"}
                    height={500}
                />
            </Box>
        </div>
    )
}
