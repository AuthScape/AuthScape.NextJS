import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/system';
import { CrmConnections } from '../../components/usermanagement/CrmConnections';
import { CrmEntityMappings } from '../../components/usermanagement/CrmEntityMappings';
import { CrmFieldMappings } from '../../components/usermanagement/CrmFieldMappings';
import { CrmRelationshipMappings } from '../../components/usermanagement/CrmRelationshipMappings';

export default function CrmPage() {
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [selectedEntityMapping, setSelectedEntityMapping] = useState(null);
    const [viewMode, setViewMode] = useState('fields'); // 'fields' or 'relationships'

    const handleSelectConnection = (connection) => {
        setSelectedConnection(connection);
        setSelectedEntityMapping(null);
        setViewMode('fields');
    };

    const handleBackToConnections = () => {
        setSelectedConnection(null);
        setSelectedEntityMapping(null);
        setViewMode('fields');
    };

    const handleSelectEntityMapping = (mapping) => {
        setSelectedEntityMapping(mapping);
        setViewMode('fields');
    };

    const handleBackToEntityMappings = () => {
        setSelectedEntityMapping(null);
        setViewMode('fields');
    };

    const handleOpenRelationships = () => {
        console.log('handleOpenRelationships called, setting viewMode to relationships');
        setViewMode('relationships');
    };

    const handleBackToFields = () => {
        setViewMode('fields');
    };

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>CRM Integration | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box sx={{ py: 2 }}>
                    {!selectedConnection && (
                        <CrmConnections onSelectConnection={handleSelectConnection} />
                    )}

                    {selectedConnection && !selectedEntityMapping && (
                        <CrmEntityMappings
                            connection={selectedConnection}
                            onBack={handleBackToConnections}
                            onSelectEntityMapping={handleSelectEntityMapping}
                        />
                    )}

                    {selectedConnection && selectedEntityMapping && viewMode === 'fields' && (
                        <CrmFieldMappings
                            connection={selectedConnection}
                            entityMapping={selectedEntityMapping}
                            onBack={handleBackToEntityMappings}
                            onOpenRelationships={handleOpenRelationships}
                        />
                    )}

                    {selectedConnection && selectedEntityMapping && viewMode === 'relationships' && (
                        <CrmRelationshipMappings
                            connection={selectedConnection}
                            entityMapping={selectedEntityMapping}
                            onBack={handleBackToFields}
                        />
                    )}
                </Box>
            </main>
        </div>
    );
}
