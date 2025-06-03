import React, { useState, useRef, useEffect, useCallback } from "react";
import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import Editor, { useMonaco } from "@monaco-editor/react";
import Button from '@mui/material/Button';
import PageManagement from "./PageManagement";
import AssetManagement from "./AssetManagement";
import { apiService, Dropzone, ColorPicker, FileUploader } from "authscape";
import Grid from '@mui/material/Grid2';
import { DataGrid } from "@mui/x-data-grid";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import CheckIcon from '@mui/icons-material/Check';

export const ContentEngine = ({ config, minHeight, configLoad, oemCompanyId, notification }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(null);
  const handleSelectedTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }
  useEffect(() => {
    setSelectedTab(0);
  }, []);

  const monaco = useMonaco();

  const cssEditorRef = useRef(null);
  const htmlEditorRef = useRef(null);

  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);
  const [fonts, setFonts] = useState([]);
  const [oEMDomainList, setOEMDomainList] = useState([]);
  const [dnsFields, setDnsFields] = useState([]);
  const [selectedFont, setSelectedFont] = useState(null);
  const [fontUri, setFontUri] = useState(null);

  const [oEMDomain, setOEMDomain] = useState(null);
  const [isNewAccount, setIsNewAccount] = useState(false);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetBaseUrl = () => {
    return window.location.protocol + "//" + window.location.host;
  }

  const loadDNSFields = async (_domain = null) => {
      
      var domain = null;
      if (_domain != null)
      {
          domain = _domain;
      }
      else
      {
          domain = GetBaseUrl();
      }

      let responseFields = await apiService().get("/PrivateLabel/GetFields?domain=" + domain + (oemCompanyId != null ? ("&companyId=" + oemCompanyId) : ""));
      if (responseFields != null && responseFields.status == 200)
      {
        setDnsFields(responseFields.data);
      }
  }

  useEffect(() => {

      if (oEMDomain != null)
      {
          loadDNSFields(oEMDomain);
      }

  }, [oEMDomain]);


  const FetchOEMData = async () => {

      let response = await apiService().get("/PrivateLabel/GetFonts");
      if (response != null && response.status == 200)
      {
        setFonts(response.data);
      }

      let response2 = await apiService().get("/PrivateLabel/GetAllDomainsUser");
      if (response2 != null && response2.status == 200)
      {
          setOEMDomainList(response2.data);

          if (response2.data.length > 0)
          {
              setOEMDomain(response2.data[0].name);
          }
          else
          {
              setIsNewAccount(true);
          }
      }
  }

  useEffect(() => {

    FetchOEMData();

  }, []);


  const [paginationModel, setPaginationModel] = React.useState({
      page: 0,
      pageSize: 12,
  });


  function handleCSSEditorDidMount(editor, monaco) {
    cssEditorRef.current = editor; 
  }

  function handleHtmlEditorDidMount(editor, monaco) {
    htmlEditorRef.current = editor; 
  }

  const columns = [
    {
      field: "label",
      headerName: "Fonts",
      editable: false,
      width:300,
      renderCell: (params) => {
        const RenderData = (row) => {
          // const { id, value, field } = params;
          // const apiRef = useGridApiContext();
          return (
            <>
              <Box sx={{fontFamily: row.value, fontSize:20, cursor:"pointer"}}>{row.value}</Box>
              <link href={"https://fonts.googleapis.com/css2?family=" + row.value} rel="stylesheet"></link>
            </>
          );
        };
        return RenderData(params);
      },
    }
  ];

  useEffect(() => {

      const fetchData = async () => {

          setData(null);

          let response = await apiService().get("/PrivateLabel/GetEditorData?domain=" + oEMDomain + (oemCompanyId != null ? ("&companyId=" + oemCompanyId) : ""));
          if (response.status == 200)
          {
              setData(response.data);
              setSelectedFont(response.data.fontFamily);
              setFontUri(response.data.fontUrl);
          }
      }
      fetchData();

  }, [monaco, oEMDomain]);

  return (

    <Container maxWidth={"none"} sx={{ paddingTop: 4 }}>
      
      {(selectedFont != null && fontUri == null) &&
        <link href={"https://fonts.googleapis.com/css2?family=" + selectedFont} rel="stylesheet"></link>
      }

      {!isEditorOpen && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h4" mb={1}>
              Content Management
            </Typography>
            <Tabs
              value={selectedTab}
              onChange={handleSelectedTab}
              aria-label="basic tabs example"
            >
              <Tab label="Page Management" {...a11yProps(0)} />
              <Tab label="Asset Management" {...a11yProps(1)} />
              <Tab label="App Icon / Colors" {...a11yProps(2)} />
              <Tab label="Fonts" {...a11yProps(3)} />
              <Tab label="Style Sheet Editor" {...a11yProps(4)} />
              <Tab label="HTML Import Editor" {...a11yProps(5)} />
            </Tabs>
          </Box>
        </>
      )}
      <Box my={2}>
        {selectedTab === 0 && (
          
          <PageManagement
            config={config}
            oemCompanyId={oemCompanyId}
            minHeight={minHeight}
            isEditorOpen={isEditorOpen}
            setIsEditorOpen={setIsEditorOpen}
            configLoad={configLoad}
          />
        )}
        {selectedTab === 1 && (
          <AssetManagement minHeight={minHeight} configLoad={configLoad} oemCompanyId={oemCompanyId} />
        )}
        {selectedTab === 2 && (
          <Box>
              <Box>
                  {data != null &&
                  <Box sx={{paddingTop:2}}>
                      <Grid container spacing={2}>
                          <Grid item size={4}>
                              <Box sx={{paddingBottom:4}}>
                                  <Dropzone
                                      image={process.env.apiUri + "/api/PrivateLabel/GetFavIcon?oemCompanyId=" + oemCompanyId}
                                      text={"Drag 'n' drop your app icon here"}
                                      onDrop={async (file) => {
                                          const data = new FormData();

                                          data.append("file", file);
                                          data.append("domain", oEMDomain);

                                          // alert(oEMDomain)

                                          let response = await apiService().post(
                                          "/PrivateLabel/UploadAppIcon",
                                          data
                                          );
                                          if (response != null && response.status == 200) {
                                          window.location.reload();
                                          }
                                      }}
                                  />
                              </Box>
                          </Grid>
                          <Grid item size={8}>
                              <Box sx={{paddingBottom:2, fontWeight:"bold", fontSize:16}}>
                                  Adjust the colors for your site
                              </Box>
                              <Box>
                                  {dnsFields != null && dnsFields.map((dnsField, index) => {
                                      return (
                                          <Box key={index}>
                                              <Grid container spacing={2}>
                                                  <Grid item size={3}>
                                                      {dnsField.name}
                                                  </Grid>
                                                  <Grid item size={9}>

                                                      <ColorPicker name={dnsField.name} defaultColor={dnsField.value} onColorChanged={async (name, hex) => {

                                                          await apiService().post("/PrivateLabel/SetFieldValue", {
                                                              id: dnsField.id,
                                                              fieldId: dnsField.fieldId,
                                                              value: hex
                                                          });

                                                          notification(dnsField.name + " Saved");

                                                      }} />
                                                  </Grid>
                                              </Grid>
                                          </Box>
                                      )
                                  })}
                              </Box>
                          </Grid>
                      </Grid>
                  </Box>
                  }
              </Box>
          </Box>
        )}
        {selectedTab === 3 && (
          <Box>
            <Box>
                {data != null &&
                <Box>
                    <Grid container spacing={2}>
                        <Grid item size={6}>

                          <Box>
                              <DataGrid
                                  rows={fonts}
                                  columns={columns}
                                  sx={{height:"80vh", width:"100%"}}
                                  pagination
                                  disableSelectionOnClick={true}
                                  onPaginationModelChange={setPaginationModel}
                                  paginationModel={paginationModel}
                                  //pageSizeOptions={[5]}
                                  // rowCount={100}
                                  // rowSelectionModel={selectedFont}
                                  onRowClick={async (params) => {

                                      let response = await apiService().post("/PrivateLabel/SetFont", {
                                          companyId: oemCompanyId,
                                          domain: oEMDomain,
                                          value: params.row.label
                                      });
                                      if (response != null && response.status == 200)
                                      {
                                          setSelectedFont(params.row.label);
                                          setFontUri(null);
                                          notification("Font saved!");
                                      }
                                  }}
                              />
                          </Box>
                        
                        </Grid>
                        <Grid item size={6} >

                            <FileUploader url={"/PrivateLabel/UploadCustomFont"} accept={".otf,.ttf,.woff"} params={{
                                domain: oEMDomain
                            }} multiple={true} variant='custom' onUploadCompleted={() => {
                                window.location.reload();
                                }}>

                                <Button color="primary" variant="contained" fullWidth={true} sx={{height:50}} startIcon={<PublishRoundedIcon/>}><Box>Upload Font</Box>&nbsp;<Box sx={{textAlign:"center"}}><small>(.OTF, .TTF, OR .WOFF)</small></Box></Button>

                            </FileUploader>

                        <Box sx={{marginTop:4}}>Font Selected:</Box>
                        <Box sx={{marginBottom:2, fontWeight:"bold", fontSize:20}}> {selectedFont}</Box>
                        <hr />
                        <Box sx={{fontFamily: selectedFont}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ultricies odio. Nunc ut quam turpis. In hac habitasse platea dictumst. 
                            Suspendisse potenti. Nullam malesuada, purus id sagittis vestibulum, massa tellus gravida elit, vitae ultrices tortor nulla ac nunc. 
                            Aenean tempus semper est vel convallis. Sed feugiat, risus eu tincidunt eleifend, purus metus vulputate nulla, et condimentum sapien erat in nisi. 
                            Nunc non malesuada libero. Donec tempus tincidunt mi at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
                            Suspendisse potenti. Etiam nec eleifend orci. Suspendisse in est vel nunc rhoncus bibendum vitae id felis. 
                            Integer bibendum dolor elit, at tincidunt lacus tempor ac. Maecenas lobortis, mauris at condimentum feugiat, nulla orci condimentum massa, sed facilisis tellus ligula vitae metus. 
                            Aliquam erat volutpat. Quisque dignissim felis augue, at semper nisl posuere ut. Proin fringilla diam vitae faucibus finibus.
                            <br/><br/>
                            Aenean tempus semper est vel convallis. Sed feugiat, risus eu tincidunt eleifend, purus metus vulputate nulla, et condimentum sapien erat in nisi. Nunc non malesuada libero. Donec tempus tincidunt mi at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti
                        </Box>
                        </Grid>
                    </Grid>
                </Box>
                }
            </Box>
          </Box>
        )}
        {selectedTab === 4 && (
          <Box>
            <Box value={value} index={3}>

              <Grid container spacing={2}>
                  <Grid item size={6}>
                      <h4 style={{marginBottom:"0px"}}>Global CSS edits</h4>
                      <small>You can make edits to your stylesheet</small>
                  </Grid>
                  <Grid item size={6} sx={{textAlign:"right"}}>
                      <Button startIcon={<CheckIcon/>} sx={{marginTop:4}} variant="contained" onClick={async () => { 

                          let response = await apiService().post("/PrivateLabel/SetGlobalCSS", {
                          companyId: oemCompanyId,
                          domain: GetBaseUrl(),
                          value: cssEditorRef.current.getValue()
                          });
                          if (response != null && response.status == 200)
                          {
                              notification("CSS Saved!")
                          }

                      }}>Save Changes</Button>
                  </Grid>
              </Grid>

              <Box sx={{paddingTop:1}}>
                  
                  {data != null &&
                      <Editor
                          height="70vh"
                          onMount={handleCSSEditorDidMount}
                          defaultLanguage="css"
                          theme="vs-dark" 
                          defaultValue={(data == null || data.prettyCSS == null) ? "" : data.prettyCSS}
                      />
                  }
              </Box>

            </Box>
          </Box>
        )}
        {selectedTab === 5 && (
          <Box>
              <Grid container spacing={2}>
                  <Grid item size={6}>
                      <h4 style={{marginBottom:"0px"}}>HTML import Edits</h4>
                      <small>You can add imports such as google analytics or clarity</small>
                  </Grid>
                  <Grid item size={6} sx={{textAlign:"right"}}>
                      <Button startIcon={<CheckIcon/>} sx={{marginTop:4}} variant="contained" onClick={async () => {

                          let response = await apiService().post("/PrivateLabel/SetGlobalHTML", {
                              companyId: oemCompanyId,
                              domain: GetBaseUrl(),
                              value: htmlEditorRef.current.getValue()
                          });

                          if (response != null && response.status == 200)
                          {
                              notification("HTML saved!")
                          } 

                      }}>Save Changes</Button>
                  </Grid>
              </Grid>
              
              <Box sx={{paddingTop:1}}>
                  {data != null &&
                      <Editor
                          height="70vh"
                          onMount={handleHtmlEditorDidMount}
                          defaultLanguage="html"
                          theme="vs-dark"
                          defaultValue={(data == null || data.prettyHTML == null) ? "" : data.prettyHTML}
                      />
                  }
              </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};