import React, { useEffect, useState } from 'react';
import Card from '../../components/marketplace/card';
import Marketplace from '../../components/marketplace/Marketplace';


export default function Index({setIsLoading, oemCompanyId}) {

    return (
        <Marketplace
          platformId={1}
          cardGridSize={3}
          expandAllCategoriesByDefault={true}
          setIsLoading={setIsLoading}
          oemCompanyId={oemCompanyId}
          cardView={(productData) => {
            return <Card product={productData} />;
          }}
        />
    )
}