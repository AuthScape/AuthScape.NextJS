import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
// import UserManagement from 'authscape-usermanagement';

import {UserManagement} from '../../components/usermanagement/UserManagement';

export default function Companies({}) {

    return (
        <Box sx={{paddingTop:8}}>
            <UserManagement
                platformType={3}
                height={"80vh"}
                onPasswordChanged={(response) => {

                    // alert(response.status); 
                    if (response != null && response.status == 200)
                    {
                        alert("Password has been updated!"); 
                    }
                    
                }}
                onUploadCompleted={() => {
                    alert("uploaded user");
                }}
                onAccountCreated={(location) => {

                    alert(JSON.stringify(location));

                    return null;
                }}

                onCustomTabs={(platformId, identifier) => {

                    return ([{
                        id:  45,
                        title: "Custom Tab",
                        content: <div>Custom Content {platformId} - {identifier}</div>
                    }])

                }}
            />
        </Box>
    );
}