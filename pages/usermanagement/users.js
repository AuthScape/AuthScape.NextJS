import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
// import UserManagement from 'authscape-usermanagement';

import {UserManagement} from '../../components/usermanagement/UserManagement';

export default function Users({}) {

    return (
        <Box>
            <UserManagement
                platformType={1}
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
                onAccountCreated={(user) => {

                    alert(user.firstName + " " + user.lastName + " " + user.email);

                    return null;
                }}
                onSaved={(shouldClose, platformType, id, fields) => {
                    // alert(shouldClose + " - " + platformType + " - " + id);
                    // alert(JSON.stringify(fields));
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