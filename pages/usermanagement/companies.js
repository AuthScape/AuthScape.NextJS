import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import {UserManagement} from '../../components/usermanagement/UserManagement';
import { Button } from '@mui/material';

export default function Companies({}) {

    return (
        <Box sx={{paddingTop:8}}>

            <UserManagement
                platformType={2}
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
                onAccountCreated={(company) => {

                    alert(company.companyName);

                    return null;
                }}
                onCustomTabs={(platformId, identifier) => {

                    return ([
                        {
                            id:  45,
                            title: "Custom Tab",
                            content: <div>Custom Content {platformId} - {identifier}</div>
                        },
                        {
                            id:  2,
                            title: "Another tab",
                            content: <div><Button variant={"contained"}>Hello world</Button></div>
                        }
                    ])

                }}
            />
        </Box>
    );
}