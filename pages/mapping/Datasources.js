import React, {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
// import Datasources from '../../components/Mapping/datasources';
import {Datasources} from 'authscape';

export default function Home() {

    return (
        <Box>
          <Head>
              <title>Welcome to AuthScape</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          
          <Datasources />

        </Box>
    )
}