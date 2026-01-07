import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function WordTreeChart() {
    return (
        <div>
            <Head>
                <title>Word Tree Chart</title>
                <meta name="description" content="Word Tree Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"E832DC1A-0A81-476B-982A-155900AE9F71"}
                    title={"Word Tree - Cat Phrases"}
                    width={"100%"}
                    height={500}
                />
            </Box>
        </div>
    )
}
