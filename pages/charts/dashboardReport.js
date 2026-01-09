import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Report from '../../components/Report';

export default function DashboardReport() {
    return (
        <div>
            <Head>
                <title>Dashboard Report</title>
                <meta name="description" content="Multi-widget dashboard report example" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Dashboard Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This report demonstrates multiple chart widgets arranged in a responsive grid layout.
                </Typography>
            </Box>

            <Report
                chartMethod={"A1B2C3D4-E5F6-7890-ABCD-EF1234567890"}
                title={"Dashboard Report"}
                width={"100%"}
                height={350}
                payload={{}}
            />
        </div>
    );
}
