import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {apiService, authService} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Report from '../../components/Report';

export default function Home({}) {

    return (
    <div>
        <Head>
        <title>Maps</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box>
            <Report chartMethod={"94D281D1-2E5E-4CB8-8F9C-D956044DF3FD"} title={"Area Chart"} width={"100%"} payload={{
                startDate: 2,
                endDate: 2
            }} />
        </Box>
    </div>
    )
}
