import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function GeoChart() {
    return (
        <div>
            <Head>
                <title>Geo Chart</title>
                <meta name="description" content="Geographic Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-555555555555"}
                    title={"Global Sales Distribution"}
                    width={"100%"}
                    height={500}
                />
            </Box>
        </div>
    )
}
