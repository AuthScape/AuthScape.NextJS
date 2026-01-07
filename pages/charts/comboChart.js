import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function ComboChart() {
    return (
        <div>
            <Head>
                <title>Combo Chart</title>
                <meta name="description" content="Combo Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-222222222222"}
                    title={"Revenue vs Expenses"}
                    width={"100%"}
                    height={400}
                />
            </Box>
        </div>
    )
}
