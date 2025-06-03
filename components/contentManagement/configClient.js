import React, { useRef, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Autocomplete, MenuItem, Select, TextField, FormControl, OutlinedInput, Grid2} from "@mui/material";
import Button from "@mui/material/Button";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import HubSpotField from "./customFields/hubspotField";

import { DropZone } from "@measured/puck";
import { apiService } from "authscape";

// fields
import {ColorPickerField} from "./customFields/colorpickerField";
import { Box, Typography } from "@mui/material";


const fetchImageAssets = async (oemCompanyId) => {

  const url = oemCompanyId
    ? `/Pages/GetPageImageAssets?oemCompanyId=${oemCompanyId}`
    : `/Pages/GetPageImageAssets`;

  const response = await apiService().get(url);

  if (response && response.status === 200) {
    const assets = response.data.map((asset) => ({
      label: asset.title || "Untitled",
      value: asset.url,
    }));
    return [{ label: "Not Selected", value: "-1" }, ...assets];
  }
};

let imageOptions = [];

const createConfig = async (oemCompanyId, setIsLoading) => {
  
    imageOptions = await fetchImageAssets(oemCompanyId);

    return {
        root: {
            fields: {
                title: { type: "text", label: "Meta Title" },
                description: { type: "textarea", label: "Meta Description" },
            },
        },
        components: {
            Box: {
                label: "Box",
                params: {
                label: "Settings",
                },
                fields: {
                backgroundColor: { label: "Background Color", type: "text" },
                textAlign: {
                    label: "TextAlign",
                    type: "select",
                    options: [
                    { label: "Center", value: "center" },
                    { label: "Left", value: "left" },
                    { label: "Right", value: "right" },
                    ],
                },
                backgroundImage: {
                    type: "select",
                    label: "Background Image",
                    options: imageOptions,
                },
                backgroundSize: {
                    label: "Background Size",
                    type: "select",
                    options: [
                    { label: "auto", value: "auto" },
                    { label: "cover", value: "cover" },
                    { label: "contain", value: "contain" },
                    { label: "percentage", value: "percentage" },
                    { label: "length", value: "length" },
                    ],
                },
                backgroundRepeat: {
                    label: "Background Repeat",
                    type: "select",
                    options: [
                    { label: "repeat", value: "repeat" },
                    { label: "repeat-x", value: "repeat-x" },
                    { label: "repeat-y", value: "repeat-y" },
                    { label: "no-repeat", value: "no-repeat" },
                    { label: "space", value: "space" },
                    { label: "round", value: "round" },
                    ],
                },
                backgroundPositionHorizontal: {
                    label: "Background Position Horizontal",
                    type: "select",
                    options: [
                    { label: "left", value: "left" },
                    { label: "center", value: "center" },
                    { label: "right", value: "right" },
                    ],
                },
                backgroundPositionVertical: {
                    label: "Background Position Vertical",
                    type: "select",
                    options: [
                    { label: "top", value: "top" },
                    { label: "center", value: "center" },
                    { label: "bottom", value: "bottom" },
                    ],
                },

                Padding: {
                    label: "Padding",
                    type: "object",
                    objectFields: {
                    paddingLeft: { label: "Padding Left", type: "number" },
                    paddingRight: { label: "Padding Right", type: "number" },
                    paddingTop: { label: "Padding Top", type: "number" },
                    paddingBottom: { label: "Padding Bottom", type: "number" },
                    },
                },
                Margin: {
                    label: "Margin",
                    type: "object",
                    objectFields: {
                    marginLeft: { label: "Margin Left", type: "number" },
                    marginRight: { label: "Margin Right", type: "number" },
                    marginTop: { label: "Margin Top", type: "number" },
                    marginBottom: { label: "Margin Bottom", type: "number" },
                    },
                },
                },
                render: (settings) => {
                return (
                    <Box
                    sx={{
                        backgroundImage: "url(" + settings.backgroundImage + ")",
                        backgroundSize: settings.backgroundSize, // need to be able to specify the size
                        backgroundPosition:
                        settings.backgroundPositionHorizontal +
                        " " +
                        settings.backgroundPositionVertical,
                        backgroundRepeat: settings.backgroundRepeat,
                        backgroundColor: settings.backgroundColor,
                        textAlign: settings.textAlign,
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    >
                    <DropZone zone="Box" />
                    </Box>
                );
                },
            },
            Image: {
                label: "Image",
                params: {
                label: "Settings",
                },
                fields: {
                width: { type: "text", label: "Width (px or %)" },
                height: { type: "text", label: "Height (px or %)" },
                alt: { type: "text", label: "Alt" },
                objectFit: {
                    type: "select",
                    label: "Object Fit",
                    options: [
                    { label: "Cover", value: "cover" },
                    { label: "Contain", value: "contain" },
                    { label: "Fill", value: "fill" },
                    { label: "None", value: "none" },
                    { label: "Scale Down", value: "scale-down" },
                    ],
                    default: "cover",
                },
                alignment: {
                    type: "select",
                    label: "Alignment",
                    options: [
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                    ],
                    default: "left",
                },
                imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                },
                },
                render: (imageSettings) => {
                return (
                    <Box sx={{ textAlign: imageSettings.alignment }}>
                    <LazyLoadImage
                        alt={imageSettings.alt}
                        style={{ objectFit: imageSettings.objectFit || "cover" }}
                        height={
                        imageSettings.height != null ? imageSettings.height : 200
                        }
                        src={imageSettings.imageUrl}
                        width={imageSettings.width != null ? imageSettings.width : 200}
                    />
                    </Box>
                );
                //return <ImageComponent imageSettings={imageSettings} />;
                },
            },
            Text: {
                fields: {
                params: {
                    label: "Settings",
                },
                text: { type: "textarea", label: "Text" },
                color: {
                    type: "text",
                    label: "Color (HEX)",
                    render: ColorPickerField,
                },
                variant: {
                    type: "select",
                    label: "variant",
                    options: [
                    { label: "None", value: "none" },
                    { label: "H1", value: "h1" },
                    { label: "H2", value: "h2" },
                    { label: "H3", value: "h3" },
                    { label: "H4", value: "h4" },
                    { label: "H5", value: "h5" },
                    { label: "H6", value: "h6" },
                    { label: "H6", value: "h6" },
                    { label: "Subtitle1", value: "subtitle1" },
                    { label: "Subtitle2", value: "subtitle2" },
                    { label: "Body1", value: "body1" },
                    { label: "Body2", value: "body2" },
                    { label: "Custom Size", value: "custom" },
                    ],
                    default: "Body1",
                },
                size: { type: "number", label: "Size (PX)" },
                alignment: {
                    type: "select",
                    label: "align",
                    options: [
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                    ],
                    default: "left",
                },
                fontWeight: {
                    type: "select",
                    label: "Weight",
                    options: [
                    { label: "Normal", value: "normal" },
                    { label: "Bold", value: "bold" },
                    { label: "Bolder", value: "bolder" },
                    { label: "Lighter", value: "lighter" },
                    ],
                    default: "normal",
                },
                decorators: {
                    type: "select",
                    label: "Decoration",
                    options: [
                    { label: "None", value: "none" },
                    { label: "Underline", value: "underline" },
                    { label: "Overline", value: "overline" },
                    { label: "Line Through", value: "line-through" },
                    ],
                    default: "none",
                },
                Padding: {
                    label: "Padding",
                    type: "object",
                    objectFields: {
                    paddingLeft: { label: "Padding Left", type: "number" },
                    paddingRight: { label: "Padding Right", type: "number" },
                    paddingTop: { label: "Padding Top", type: "number" },
                    paddingBottom: { label: "Padding Bottom", type: "number" },
                    },
                },
                Margin: {
                    label: "Margin",
                    type: "object",
                    objectFields: {
                    marginLeft: { label: "Margin Left", type: "number" },
                    marginRight: { label: "Margin Right", type: "number" },
                    marginTop: { label: "Margin Top", type: "number" },
                    marginBottom: { label: "Margin Bottom", type: "number" },
                    },
                },
                },
                render: (settings) => {
                return (
                    <Typography
                    variant={
                        settings.variant != null && settings.variant != "custom"
                        ? settings.variant
                        : "body1"
                    }
                    sx={{
                        color: settings.color,
                        fontSize: settings.size,
                        textAlign: settings.alignment,
                        fontWeight: settings.fontWeight,
                        textDecoration: settings.decorators,
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    gutterBottom
                    >
                    {settings.text != null && settings.text != ""
                        ? settings.text
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    </Typography>
                );

                // return <TextComponent settings={settings} />;
                },
            },
            Columns: {
                label: "Columns",
                params: {
                label: "Settings",
                },
                fields: {
                Columns: { type: "number" },
                Padding: {
                    label: "Padding",
                    type: "object",
                    objectFields: {
                    paddingLeft: { label: "Padding Left", type: "number" },
                    paddingRight: { label: "Padding Right", type: "number" },
                    paddingTop: { label: "Padding Top", type: "number" },
                    paddingBottom: { label: "Padding Bottom", type: "number" },
                    },
                },
                Margin: {
                    label: "Margin",
                    type: "object",
                    objectFields: {
                    marginLeft: { label: "Margin Left", type: "number" },
                    marginRight: { label: "Margin Right", type: "number" },
                    marginTop: { label: "Margin Top", type: "number" },
                    marginBottom: { label: "Margin Bottom", type: "number" },
                    },
                },
                },
                render: (settings) => {

                const isMobile = window.innerWidth < 768; // Example breakpoint
                const adjustedColumns = isMobile ? 1 : settings.Columns; // Set columns to

                return (
                    <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${adjustedColumns}, 1fr)`,
                        gap: isMobile ? 8 : 16, // Reduce gap for mobile screens
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    >
                    {[...Array(adjustedColumns)].map((_, index) => (
                        <DropZone key={index} zone={`column-${index}`} /> // Use a loop to generate DropZone components
                    ))}
                    </div>
                );
                },
            },
            Container: {
                label: "Container",
                params: {
                label: "Settings",
                },
                fields: {
                maxWidth: {
                    label: "Max Width",
                    type: "select",
                    options: [
                    { label: "None", value: "" },
                    { label: "Extra Large", value: "xl" },
                    { label: "Large", value: "lg" },
                    { label: "Medium", value: "md" },
                    { label: "Small", value: "sm" },
                    { label: "Extra Small", value: "xs" },
                    ],
                },
                Padding: {
                    label: "Padding",
                    type: "object",
                    objectFields: {
                    paddingLeft: { label: "Padding Left", type: "number" },
                    paddingRight: { label: "Padding Right", type: "number" },
                    paddingTop: { label: "Padding Top", type: "number" },
                    paddingBottom: { label: "Padding Bottom", type: "number" },
                    },
                },
                Margin: {
                    label: "Margin",
                    type: "object",
                    objectFields: {
                    marginLeft: { label: "Margin Left", type: "number" },
                    marginRight: { label: "Margin Right", type: "number" },
                    marginTop: { label: "Margin Top", type: "number" },
                    marginBottom: { label: "Margin Bottom", type: "number" },
                    },
                },
                },
                render: (settings) => {
                return (
                    <Container
                    maxWidth={settings.maxWidth}
                    sx={{
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    >
                    <DropZone zone="container" />
                    </Container>
                );
                },
            },
            Button: {
                label: "Button",
                params: {
                label: "Settings",
                },
                fields: {
                text: { label: "Text", type: "text" },
                color: { label: "Color", type: "text" },
                buttonColor: { label: "Button Color", type: "text" },
                href: { label: "Href", type: "text" },
                variant: {
                    label: "Variant",
                    type: "select",
                    options: [
                    { label: "Text", value: "text" },
                    { label: "Contained", value: "contained" },
                    { label: "Outlined", value: "outlined" },
                    ],
                },
                size: {
                    label: "Size",
                    type: "select",
                    options: [
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                    ],
                },
                fullWidth: {
                    label: "FullWidth",
                    type: "select",
                    options: [
                    { label: "Disable", value: false },
                    { label: "Enable", value: true },
                    ],
                },
                navigation: {
                    label: "Navigation",
                    type: "select",
                    options: [
                    { label: "Link", value: false },
                    { label: "Open New Window", value: true },
                    ],
                },
                Padding: {
                    label: "Padding",
                    type: "object",
                    objectFields: {
                    paddingLeft: { label: "Padding Left", type: "number" },
                    paddingRight: { label: "Padding Right", type: "number" },
                    paddingTop: { label: "Padding Top", type: "number" },
                    paddingBottom: { label: "Padding Bottom", type: "number" },
                    },
                },
                Margin: {
                    label: "Margin",
                    type: "object",
                    objectFields: {
                    marginLeft: { label: "Margin Left", type: "number" },
                    marginRight: { label: "Margin Right", type: "number" },
                    marginTop: { label: "Margin Top", type: "number" },
                    marginBottom: { label: "Margin Bottom", type: "number" },
                    },
                },
                },
                render: (settings) => {
                return (
                    <Button
                    variant={settings.variant}
                    fullWidth={settings.fullWidth}
                    size={settings.size}
                    sx={{
                        color: settings.color + " !important",
                        backgroundColor: settings.buttonColor + " !important",
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    onClick={() => {
                        if (settings.navigation) {
                        window.open(settings.href);
                        } else {
                        window.location.href = settings.href;
                        }
                    }}
                    >
                    {settings.text}
                    </Button>
                );
                },
            },
            ContactUs: {
                label: "Contact Us",
                params: {
                label: "Settings",
                },
                fields: {
                text: { label: "Text", type: "text" },
                },
                render: (settings) => {

                const firstNameRef = useRef(null);
                const lastNameRef = useRef(null);
                const emailRef = useRef(null);
                const phoneRef = useRef(null);
                const titleRef = useRef(null);
                const typeOfProjectRef = useRef(null);
                const budgetRef = useRef(null);
                const companyRef = useRef(null);
                const tellMeMoreRef = useRef(null);

                const [openThankYouDialog, setOpenThankYouDialog] = useState(false);
                const [missingFields, setMissingFields] = useState(false);

                return (

                    <Box sx={{ padding: { xs: 1, sm: 2, md: 3 }, margin: "auto"}}>

                    <Dialog
                        open={openThankYouDialog}
                        onClose={() => {
                            setOpenThankYouDialog(false);
                        }}
                        aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle>{"Thank you for your request"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            We have received your request and our team will respond within 48 business hours. We appreciate your patience and look forward to assisting you.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={() => {
                            setOpenThankYouDialog(false);
                        }}>OK</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={missingFields}
                        onClose={() => {
                            setMissingFields(false);
                        }}
                        aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle>{"Missing required fields"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Please provide information for all required fields *
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={() => {
                            setMissingFields(false);
                        }}>OK</Button>
                        </DialogActions>
                    </Dialog>


                    <Grid2 container spacing={2}>
                        <Grid2 size ={{xs: 12, sm: 6 }}>
                        <TextField inputRef={firstNameRef} label="First Name *" variant="outlined" fullWidth={true} />
                        </Grid2>
                        <Grid2 size ={{xs: 12, sm: 6 }}>
                        <TextField inputRef={lastNameRef} label="Last Name *" variant="outlined" fullWidth />
                        </Grid2>
                    </Grid2>

                    <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                        <Grid2 size ={{xs: 12, sm: 6 }}>
                        <TextField inputRef={emailRef} label="Email *" variant="outlined" fullWidth />
                        </Grid2>
                        <Grid2 size ={{xs: 12, sm: 6 }}>
                        <TextField inputRef={phoneRef} label="Phone *" variant="outlined" fullWidth />
                        </Grid2>
                    </Grid2>

                    <TextField
                        inputRef={tellMeMoreRef}
                        label="How can we help?"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        sx={{ marginTop: 2 }}
                    />

                    <Button
                        variant="contained"
                        sx={{ marginTop: 2, width: { xs: "100%", sm: "auto" } }}
                        onClick={async () => {


                        if (firstNameRef.current.value == "" || 
                            lastNameRef.current.value == "" || 
                            emailRef.current.value == "" || 
                            phoneRef.current.value == "" 
                        )
                        {
                            setMissingFields(true);
                            return;
                        }

                        setIsLoading(true);

                        let ticketRequest = {
                            firstName: firstNameRef.current.value,
                            lastName: lastNameRef.current.value,
                            email: emailRef.current.value,
                            ticketTypeId: 2,
                            ticketStatusId: 1,
                            description: tellMeMoreRef.current.value,
                            PrivateLabelCompanyId: oemCompanyId
                        }

                        const ticketResponse = await apiService().post("/Ticket/CreateTicketPublic", ticketRequest);
                        if (ticketResponse != null && ticketResponse.status == 200)
                        {
                            setOpenThankYouDialog(true);
                        }
                        setIsLoading(false);

                        }}
                    >
                        Submit
                    </Button>
                    </Box>


                );
                },
            },
            hubspotForm: {
                label: "Hubspot Form",
                params: {
                    label: "hubspotform",
                },
                fields: {
                    portalId: { label: "Portal Id", type: "text" },
                    formId: { label: "Form Id", type: "text" },
                },
                render: ({ portalId, formId }) => {

                    return (
                        <Box sx={{ padding: { xs: 1, sm: 2, md: 3 }, margin: "auto"}}>
                            <HubSpotField portalId={portalId} formId={formId} />
                        </Box>
                    );
                },
            },
            Divider: {
                label: "Divider",
                params: {
                label: "Settings",
                },
                fields: {
                text: { label: "Text", type: "text" },
                orientation: {
                    label: "Orientation",
                    type: "select",
                    options: [
                    { label: "Horizontal", value: "horizontal" },
                    { label: "Vertical", value: "vertical" },
                    ],
                },
                flexItem: {
                    label: "FlexItem",
                    type: "select",
                    options: [
                    { label: "Disabled", value: false },
                    { label: "Enabled", value: true },
                    ],
                },
                textAlign: {
                    label: "TextAlign",
                    type: "select",
                    options: [
                    { label: "Center", value: "center" },
                    { label: "Left", value: "left" },
                    { label: "Right", value: "right" },
                    ],
                },
                Padding: {
                    label: "Padding",
                    type: "object",
                    objectFields: {
                    paddingLeft: { label: "Padding Left", type: "number" },
                    paddingRight: { label: "Padding Right", type: "number" },
                    paddingTop: { label: "Padding Top", type: "number" },
                    paddingBottom: { label: "Padding Bottom", type: "number" },
                    },
                },
                Margin: {
                    label: "Margin",
                    type: "object",
                    objectFields: {
                    marginLeft: { label: "Margin Left", type: "number" },
                    marginRight: { label: "Margin Right", type: "number" },
                    marginTop: { label: "Margin Top", type: "number" },
                    marginBottom: { label: "Margin Bottom", type: "number" },
                    },
                },
                },
                render: (settings) => {
                return (
                    <Divider
                    orientation={settings.orientation}
                    flexItem={settings.flexItem}
                    textAlign={settings.textAlign}
                    sx={{
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    >
                    {settings.text}
                    </Divider>
                );
                },
            },
        },
        categories: {
            Basic: {
                label: "Image",
                components: ["Image", "Text", "Button", "Divider"],
            },
            Layout: {
                label: "Layout",
                components: ["Columns", "Container", "Box", "Space"],
            },
        },
    }
};

export { createConfig };
