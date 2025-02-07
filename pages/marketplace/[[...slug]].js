import React, { useEffect, useState } from 'react';
import Card from '../../components/marketplace/card';
import Marketplace from '../../components/marketplace/Marketplace';


export default function Index({setIsLoading}) {

    return (
        <Marketplace 
            setIsLoading={setIsLoading}

            cardView={(productData) => {
                return (
                    <Card product={productData} />
                )
            }}
        />
    )
}