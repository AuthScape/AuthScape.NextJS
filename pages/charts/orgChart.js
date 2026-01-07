import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function OrgChart() {
    return (
        <div>
            <Head>
                <title>Org Chart</title>
                <meta name="description" content="Organization Chart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"F1A2B3C4-D5E6-7890-ABCD-666666666666"}
                    title={"Company Organization"}
                    width={"100%"}
                    height={500}
                />
            </Box>
        </div>
    )
}
