import Box from '@mui/material/Box';
import React, {useMemo, useState, useEffect, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import Script from 'next/script';
import { Backdrop, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const getBaseStyle = (theme) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  paddingTop: "50px",
  paddingBottom: "50px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#fafafa',
  color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
});

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const handleOneDriveFilePick = () => {
    const odOptions = {
      clientId: 'clientId',
      action: 'share',
      multiSelect: false,
      advanced: {
        redirectUri: 'http://localhost:3000/fileUploading',
      },
      success: (files) => {
        console.log('Files picked:', files);
      },
      cancel: () => {
        console.log('File picking cancelled');
      },
      error: (error) => {
        console.error('Error picking file:', error);
      },
    };
    OneDrive.open(odOptions);
};


export const DropZone = ({text = "Drag 'n' drop some files here, or click to select files", image = null, styleOverride = null, onDrop = null, maxFiles = 1, multiple = false, accept = null}) => {

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [tempUrl, setTempUrl] = useState(null);

  const imageUrl = useRef(image);

  // in the event the image hasn't loaded yet from the caller
  useEffect(() => {

    imageUrl.current = image;

  }, [image]);

  let baseStyle = getBaseStyle(theme);

  if (styleOverride != null)
  {
    let combined = { ...baseStyle, ...styleOverride }
    baseStyle = combined;
  }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
        accept: accept != null ? accept : "*",
        maxFiles: maxFiles,
        multiple: multiple,
        onDrop: async (files) => {

          if (multiple)
          {
            await onDrop(files);
          }
          else
          {
            const newUrl = URL.createObjectURL(files[0]);
            imageUrl.current = newUrl;

            await onDrop(files[0]);
          }
          
        }
    });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [isFocused, isDragAccept, isDragReject, baseStyle]);

  return (
    <>
        {/* <Script crossorigin src="https://js.live.net/v7.2/OneDrive.js" /> */}

        {/* <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading.current}>
          <CircularProgress color="inherit" sx={{marginRight:4}} /> Uploading...
        </Backdrop> */}
        <Box className="container" sx={{cursor:"pointer"}}>
            
            {/* <Box onClick={() => {
                handleFilePick();
            }}>
                OneDrive
            </Box> */}

            <Box {...getRootProps({style})} >
                <input {...getInputProps()} />
                <Box sx={{paddingBottom:1}}>

                {(imageUrl.current != null && imageUrl.current != "") &&
                    <img src={imageUrl.current} width={200} height={200} style={{objectFit: "contain"}} />
                }
                </Box>
                <Box>{text}</Box>
            </Box>
        </Box>
    </>
  );
}