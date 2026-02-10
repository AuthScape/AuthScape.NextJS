import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function Home({}) {

    return (
    <div>
        <Head>
        <title>Table Report</title>
        <meta name="description" content="Table report example" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box>
            <Report chartMethod={"E5F6A7B8-C9D0-1E2F-3A4B-5C6D7E8F9A01"} title={"Table Report"} width={"100%"} payload={{}} />
        </Box>
    </div>
    )
}
