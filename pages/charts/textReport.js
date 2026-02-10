import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function Home({}) {

    return (
    <div>
        <Head>
        <title>Text Report</title>
        <meta name="description" content="Text report example" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box>
            <Report chartMethod={"D4E5F6A7-B8C9-0D1E-2F3A-4B5C6D7E8F90"} title={"Text Report"} width={"100%"} payload={{}} />
        </Box>
    </div>
    )
}
