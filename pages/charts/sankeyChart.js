import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function SankeyChart() {
    return (
        <div>
            <Head>
                <title>Sankey Chart</title>
                <meta name="description" content="Sankey Diagram" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Report
                    chartMethod={"A1B2C3D4-E5F6-7890-ABCD-EF1234567890"}
                    title={"Website Traffic Flow"}
                    width={"100%"}
                    height={500}
                />
            </Box>
        </div>
    )
}
