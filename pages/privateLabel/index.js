import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import { PrivateLabelEditor } from 'authscape';

export default function Home({loadedUser, setIsLoading, currentUser, toast}) {

    return (
    <div>
        <Head>
            <title>OEM</title>
            <meta name="description" content="AuthScape OEM" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box sx={{width: '100%' }}>
            <Box>
                <PrivateLabelEditor azureWebsite={"yoursitename.azurewebsites.net"} azureTxtValue={"txtValue"} loadedUser={loadedUser} showAllDomains={true} toast={toast} notification={() => {
                }} />
            </Box>
        </Box>
    </div>
    )
}