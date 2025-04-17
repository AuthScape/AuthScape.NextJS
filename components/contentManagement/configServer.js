import React, { useRef, useState, useEffect } from "react";
import HeroSection from "./customizableComponents/heroSection";
import FeaturedService from "./customizableComponents/featuredService";
import ImageGridList from "./customizableComponents/imageGridList";
import ImageGridListWithTag from "./customizableComponents/imageGridListWithTag";
import LargeImageGridList from "./customizableComponents/largeImageGridList";
import ContentExplainCardRight from "./customizableComponents/contentExplainCardRight";
import ContentExplainCardLeft from "./customizableComponents/contentExplainCardLeft";
import TestimionialSeciton from "./customizableComponents/testimionialSection";
import AboutSection from "./customizableComponents/aboutSection";
import AnimatedContents from "./customizableComponents/animatedContents";
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

import { DropZone } from "@measured/puck";
import TopBrandList from "./preconfiguredComponents/topBrandSection";
import SpaceInspirationSection from "./preconfiguredComponents/spaceInspirationSection";
import ProductsSection from "./customizableComponents/productsSections";
import { apiService } from "authscape";
// cards
import SpaceComponent from "./baseComponents/spaceComponent";

// fields
import colorPickerField from "./customFields/colorpickerField";
import { Box, Typography } from "@mui/material";

const featureInfoList = [
  {
    Id: "feature-1",
    feature: "Feature #1",
    title: "Feature #1 Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    ImageUrl: -1,
    button: "Learn more about Feature #1",
    buttonLink: "/",
  },
  {
    Id: "feature-2",
    feature: "Feature #2",
    title: "Feature #2 Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    ImageUrl: -1,
    button: "Learn more about Feature #2",
    buttonLink: "/",
  },
  {
    Id: "feature-3",
    feature: "Feature #3",
    title: "Feature #3 Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    ImageUrl: -1,
    button: "Learn more about Feature #3",
    buttonLink: "/",
  },
  {
    Id: "feature-4",
    feature: "Feature #4",
    title: "Feature #4 Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    ImageUrl: -1,
    button: "Learn more about Feature #4",
    buttonLink: "/",
  },
];

let imageOptions = [];
const createConfig = (oemCompanyId, setIsLoading) => {
  
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
            render: colorPickerField,
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
      RequestAQuote: {
        label: "Contact Us",
        params: {
          label: "Settings",
        },
        fields: {
          text: { label: "Text", type: "text" },
          variant: {
            label: "Variant",
            type: "select",
            options: [
              { label: "Text", value: "text" },
              { label: "Contained", value: "contained" },
              { label: "Outlined", value: "outlined" },
            ],
          },
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

              <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                <Grid2 size ={{xs: 12, sm: 6 }}>
                  <TextField inputRef={titleRef} label="Title" variant="outlined" fullWidth />
                </Grid2>
                <Grid2 size ={{xs: 12, sm: 6 }}>
                  <TextField inputRef={typeOfProjectRef} label="Type of Project" variant="outlined" fullWidth />
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                <Grid2 size ={{xs: 12, sm: 6 }}>
                  <TextField inputRef={budgetRef} label="Budget" variant="outlined" fullWidth />
                </Grid2>
                <Grid2 size ={{xs: 12, sm: 6 }}>
                  <TextField inputRef={companyRef} label="Company *" variant="outlined" fullWidth />
                </Grid2>
              </Grid2>

              <TextField
                inputRef={tellMeMoreRef}
                label="Tell us more about your project"
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
                    phoneRef.current.value == "" || 
                    companyRef.current.value == ""
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
                      ticketTypeId: 4,
                      ticketStatusId: 1,
                      description: 
                      tellMeMoreRef.current.value + "<br/><br/>" + 
                      "Phone:" + phoneRef.current.value + "<br/>" +
                      "Title:" + titleRef.current.value + "<br/>" +
                      "Type of Project:" + typeOfProjectRef.current.value + "<br/>" +
                      "Budget:" + budgetRef.current.value + "<br/>" +
                      "Company:" + companyRef.current.value + "<br/>",
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
      Space: {
        label: "Space",
        fields: {
          spaceSettings: {
            type: "object",
            label: "Space Settings",
            objectFields: {
              spacing: {
                type: "number",
                label: "Spacing (px)",
                default: 16,
              },
            },
          },
        },
        defaultProps: {
          spaceSettings: {
            spacing: 16,
          },
        },
        render: ({ spaceSettings }) => {
          return <SpaceComponent spaceSettings={spaceSettings} />;
        },
      },
      HeroBanner: {
        label: "Hero Banner",
        fields: {
          wordContents: {
            type: "object",
            label: "Word Contents",
            objectFields: {
              title: { type: "text" },
              body: { type: "textarea" },
            },
          },
          buttons: {
            type: "object",
            label: "Buttons",
            objectFields: {
              primaryButton: { type: "text" },
              primaryButtonLink: { type: "text" },
              secondaryButton: { type: "text" },
              secondaryButtonLink: { type: "text" },
            },
          },
          imageContents: {
            type: "object",
            label: "Image Contents",
            objectFields: {
              imageUrl: {
                type: "select",
                label: "Select Image URL",
                options: imageOptions,
              },
              imageTitle: { type: "text" },
              imageSubtitle: { type: "text" },
            },
          },
        },
        defaultProps: {
          wordContents: {
            title: "Explore Our Amazing Services",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
          },
          buttons: {
            primaryButton: "Learn More",
            primaryButtonLink: "/",
            secondaryButton: "Get Started",
            secondaryButtonLink: "/",
          },
          imageContents: {
            imageUrl: -1,
            imageTitle: "Our Featured Design",
            imageSubtitle: "Inspiration for Your Next Project",
          },
        },
        render: ({ wordContents, buttons, imageContents }) => {
          return (
            <HeroSection
              wordContents={wordContents}
              buttons={buttons}
              imageContents={imageContents}
            />
          );
        },
      },
      FeaturedService: {
        label: "Featured Service",
        fields: {
          featureContents: {
            type: "object",
            label: "Feature Contents",
            objectFields: {
              title: { type: "text", label: "Title" },
              items: {
                type: "array",
                label: "Feature Items",
                max: 4,
                getItemSummary: (item, ind) =>
                  item.title || `Feature #${ind + 1}`,
                arrayFields: {
                  title: { type: "text", label: "Title" },
                  subtitle: { type: "text", label: "Subtitle" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                  description: { type: "text", label: "Description" },
                },
              },
            },
          },
        },
        defaultProps: {
          featureContents: {
            title: "Small business? Find a design kit for your next project",
            items: [
              {
                title: "Modern Hotel Lobby",
                subtitle: "Design Kit, 2 weeks ago",
                imageUrl: -1,
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
              {
                title: "Chic Coffee House",
                subtitle: "Design Kit, 2 weeks ago",
                imageUrl: -1,
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
              {
                title: "Neighborhood Pub",
                subtitle: "Design Kit, 2 weeks ago",
                imageUrl: -1,
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
              {
                title: "Humble Office Space",
                subtitle: "Design Kit, 2 weeks ago",
                imageUrl: -1,
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
            ],
          },
        },
        render: ({ featureContents }) => {
          return <FeaturedService featureContents={featureContents} />;
        },
      },
      ImageGridList: {
        label: "Image Grid List",
        fields: {
          imageListContents: {
            type: "object",
            label: "Image Grid List",
            objectFields: {
              title: { type: "text", label: "Title" },
              items: {
                type: "array",
                label: "List Items",
                max: 12,
                getItemSummary: (item, ind) => `Image #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  title: { type: "text", label: "Title" },
                  subTitle: { type: "text", label: "SubTitle" },
                  href: { type: "text", label: "Href" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                },
              },
            },
          },
        },
        defaultProps: {
          imageListContents: {
            title: "Buy top commercial furniture brands",
            items: Array.from({ length: 12 }, (_, index) => ({
              Id: `image-${index + 1}`,
              ImageUrl: -1,
            })),
          },
        },
        render: ({ imageListContents }) => {
          return <ImageGridList imageListContents={imageListContents} />;
        },
      },
      ImageGridListWithTag: {
        label: "Image Grid List With Tag",
        fields: {
          imageListWithTagContents: {
            type: "object",
            label: "Image Grid List With Tag",
            objectFields: {
              title: { type: "text", label: "Title" },
              items: {
                type: "array",
                label: "List Items",
                max: 6,
                getItemSummary: (item, ind) => `Image #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                  title: { type: "text", label: "Title" },
                },
              },
            },
          },
        },
        defaultProps: {
          imageListWithTagContents: {
            title: "Products We Sell",
            items: Array.from({ length: 6 }, (_, index) => ({
              Id: `image-${index + 1}`,
              ImageUrl: -1,
              title: `Image ${index + 1}`,
            })),
          },
        },
        render: ({ imageListWithTagContents }) => {
          return (
            <ImageGridListWithTag
              imageListWithTagContents={imageListWithTagContents}
            />
          );
        },
      },
      LargeImageGridList: {
        label: "Large Image Grid List",
        fields: {
          largeImageGridListContents: {
            type: "object",
            label: "Large Image Grid List",
            objectFields: {
              title: { type: "text", label: "Title" },
              items: {
                type: "array",
                label: "List Items",
                max: 6,
                getItemSummary: (item, ind) => `Image #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                  title: { type: "text", label: "Title" },
                  subtitle: { type: "text", label: "Subtitle" },
                },
              },
            },
          },
        },
        defaultProps: {
          largeImageGridListContents: {
            title: "Get Inspired",
            items: Array.from({ length: 6 }, (_, index) => ({
              Id: `image-${index + 1}`,
              ImageUrl: -1,
              title: `Image ${index + 1}`,
              subtitle: `Image subtitle ${index + 1}`,
            })),
          },
        },
        render: ({ largeImageGridListContents }) => {
          return (
            <LargeImageGridList
              largeImageGridListContents={largeImageGridListContents}
            />
          );
        },
      },
      ContentExplainCardRight: {
        label: "Content Explain Card Right",
        fields: {
          contentExplainCardRightContents: {
            type: "object",
            label: "Content Explain Card Right",
            objectFields: {
              sectiontitle: { type: "text", label: "Section Title" },
              title: { type: "text", label: "Title" },
              body: { type: "textarea", label: "Body" },
              primaryButton: { type: "text", label: "Primary Button" },
              primaryButtonLink: { type: "text", label: "Primary Button Link" },
              secondaryButton: { type: "text", label: "Secondary Button" },
              secondaryButtonLink: {
                type: "text",
                label: "Secondary Button Link",
              },
              imageUrl: {
                type: "select",
                label: "Select Image URL",
                options: imageOptions,
              },
            },

          },
        },
        defaultProps: {
          contentExplainCardRightContents: {
            sectiontitle: "Client Spotlight",
            title: "Technology Customer",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            primaryButton: "View Products",
            primaryButtonLink: "/",
            secondaryButton: "Read Story",
            secondaryButtonLink: "/",
            imageUrl: -1
          },
        },
        render: ({ contentExplainCardRightContents }) => {
          return (
            <ContentExplainCardRight
              contentExplainCardRightContents={contentExplainCardRightContents}
            />
          );
        },
      },
      ContentExplainCardLeft: {
        label: "Content Explain Card Left",
        fields: {
          contentExplainCardLeftContents: {
            type: "object",
            label: "Content Explain Card Left",
            objectFields: {
              sectiontitle: { type: "text", label: "Section Title" },
              title: { type: "text", label: "Title" },
              body: { type: "textarea", label: "Body" },
              primaryButton: { type: "text", label: "Primary Button" },
              primaryButtonLink: { type: "text", label: "Primary Button Link" },
              secondaryButton: { type: "text", label: "Secondary Button" },
              secondaryButtonLink: {
                type: "text",
                label: "Secondary Button Link",
              },
              imageUrl: {
                type: "select",
                label: "Select Image URL",
                options: imageOptions,
              },
            },
          },
        },
        defaultProps: {
          contentExplainCardLeftContents: {
            sectiontitle: "Client spotlight",
            title: "Biotech Customer",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            primaryButton: "View Products",
            primaryButtonLink: "/",
            secondaryButton: "Read Story",
            secondaryButtonLink: "/",
            imageUrl: -1
          },
        },
        render: ({ contentExplainCardLeftContents }) => {
          return (
            <ContentExplainCardLeft
              contentExplainCardLeftContents={contentExplainCardLeftContents}
            />
          );
        },
      },
      AnimatedFeatureDisplay: {
        fields: {
          animatedFeatureContents: {
            type: "object",
            label: "Animated Feature Section",
            objectFields: {
              animationSpeed: { type: "number", label: "Animation Speed" },
              sectionTitle: { type: "text", label: "Section Title" },
              contentsTitle: { type: "text", label: "Contents Title" },
              contentList: {
                type: "array",
                label: "Content List",
                max: 4,
                getItemSummary: (item, ind) => `Content #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  feature: { type: "text", label: "Title" },
                  title: { type: "text", label: "Subtitle" },
                  description: { type: "textarea", label: "Body" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                  button: { type: "text", label: "Button" },
                  buttonLink: { type: "text", label: "Button Link" },
                },
              },
            },
          },
        },
        defaultProps: {
          animatedFeatureContents: {
            animationSpeed: 5000,
            sectionTitle: "Our Design Process",
            contentsTitle: "OUR COMPANY FEATURES",
            contentList: featureInfoList,
          },
        },
        render: ({ animatedFeatureContents }) => {
          return (
            <AnimatedContents
              animatedFeatureContents={animatedFeatureContents}
            />
          );
        },
      },
      TestimionialSection: {
        label: "Testimionial Section",
        fields: {
          testimionialSection: {
            type: "object",
            label: "Testimionial Seciton",
            objectFields: {
              sectionTitle: { type: "text", label: "Section Title" },
              title: { type: "text", label: "Title" },
              testimionials: {
                type: "array",
                label: "Testimionials",
                max: 3,
                getItemSummary: (item, ind) => `Testimionial #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                  title: { type: "text", label: "Title" },
                  body: { type: "textarea", label: "Body" },
                },
              },
              customerSectionTitle: {
                type: "text",
                label: "Customer Section Title",
              },
              customers: {
                type: "array",
                label: "Customers",
                max: 5,
                getItemSummary: (item, ind) => `Customer #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  imageUrl: {
                    type: "select",
                    label: "Select Image URL",
                    options: imageOptions,
                  },
                },
              },
            },
          },
        },
        defaultProps: {
          testimionialSection: {
            sectionTitle: "PROOF IS IN THE PUDDING.",
            title: "Hear from our Customers",
            customerSectionTitle: "SOME OF OUR HAPPY CUSTOMERS",
            testimionials: Array.from({ length: 3 }, (_, index) => ({
              Id: `testimionial-${index + 1}`,
              ImageUrl: -1,
              title: `Testimionial ${index + 1}`,
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn`,
            })),
            customers: Array.from({ length: 5 }, (_, index) => ({
              Id: `customer-${index + 1}`,
              ImageUrl: -1,
            })),
          },
        },
        render: ({ testimionialSection }) => {
          return (
            <TestimionialSeciton testimionialSection={testimionialSection} />
          );
        },
      },
      AboutSection: {
        fields: {
          aboutSection: {
            type: "object",
            label: "About Section",
            objectFields: {
              sectionTitle: { type: "text", label: "Section Title" },
              aboutContents: {
                type: "array",
                label: "About Contents",
                max: 5,
                getItemSummary: (item, ind) => `About Content #${ind + 1}`,
                arrayFields: {
                  Id: { type: "text", label: "Id" },
                  title: { type: "text", label: "Title" },
                  body: { type: "textarea", label: "Body" },
                },
              },
            },
          },
        },
        defaultProps: {
          aboutSection: {
            sectionTitle: "ABOUTH LOTH",
            aboutContents: Array.from({ length: 5 }, (_, index) => ({
              Id: `aboutContent-${index + 1}`,
              title: `Topic ${index + 1}`,
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna consequat id viverra tristique sed. Eget neque felis sapien volutpat pharetra volutpat, massa nisl. Bibendum pretium augue ipsum ultrices. Nisi, enim consequat vitae eu ultrices viverra duis quis. Non orci tortor nec ullamcorper. Odio quam pellentesque proin tellus turpis. Ultricies amet placerat pellentesque in et pellentesque turpis mollis. Tortor augue diam, et ipsum. Potenti tempus et orci diam tincidunt.`,
            })),
          },
        },
        render: ({ aboutSection }) => {
          return <AboutSection aboutSection={aboutSection} />;
        },
      },
      TopBrandList: {
        label: "Top Brand List",
        fields: {
          title: { type: "text", label: "Title" },
        },
        defaultProps: {
          title: "Buy top commercial furniture brands",
        },
        render: ({ title }) => {
          return <TopBrandList title={title} />;
        },
      },
      SpaceInspirations: {
        label: "Space Inspirations",
        fields: {
          title: { type: "text", label: "Title" },
          numberOfSpace: { type: "number", label: "Number of Display" },
          spaceMarketSectors: {
            type: "custom",
            label: "Space MarketSectors",
            render: ({ name, onChange, value }) => (
              <>
                <Typography mb={1} variant="subtitle1">
                  Space MarketSectors
                </Typography>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={value}
                  onChange={onChange}
                  input={<Typography>dsaf</Typography>}
                >
                 <MenuItem>Hello</MenuItem>
                </Select>
                {/* <Autocomplete
                  multiple
                  limitTags={1}
                  options={spaceFilter.MarketSector}
                  getOptionLabel={(option) => option.label}
                  value={value || []}
                  disableClearable
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <Typography>dsa</Typography>
                    // <TextField {...params} variant="outlined" />
                  )}
                  sx={{ width: "100%" }}
                /> */}
              </>
            ),
          },
          spaceApplications: {
            type: "custom",
            label: "Space Applications",
            render: ({ name, onChange, value }) => (
              <>
                <Typography mb={1} variant="subtitle1">
                  Space Applications
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={1}
                  disableClearable
                  options={spaceFilter.Application}
                  getOptionLabel={(option) => option.label}
                  value={value || []}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <Typography>dsa</Typography>
                    // <TextField {...params} variant="outlined" />
                  )}
                  sx={{ width: "100%" }}
                />
              </>
            ),
          },
          spaceManufacturers: {
            type: "custom",
            label: "Space Manufacturers",
            render: ({ name, onChange, value }) => (
              <>
                <Typography mb={1} variant="subtitle1">
                  Space Manufacturers
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={1}
                  disableClearable
                  options={spaceFilter.Manufacturer}
                  getOptionLabel={(option) => option.label}
                  value={value || []}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <Typography>dsa</Typography>
                    // <TextField {...params} variant="outlined" />
                  )}
                  sx={{ width: "100%" }}
                />
              </>
            ),
          },
        },
        defaultProps: {
          title: "Space Inspirations",
          numberOfSpace: 6,
          spaceMarketSectors: [],
          spaceApplications: [],
          spaceManufacturers: [],
        },
        render: ({
          title,
          numberOfSpace,
          spaceMarketSectors,
          spaceApplications,
          spaceManufacturers,
        }) => {
          return (
            <SpaceInspirationSection
              title={title}
              oemCompanyId={oemCompanyId}
              numberOfSpace={numberOfSpace}
              spaceMarketSectors={spaceMarketSectors}
              spaceApplications={spaceApplications}
              spaceManufacturers={spaceManufacturers}
            />
          );
        },
      },
      ProductsSection: {
        label: "Products Section",
        fields: {
          title: { type: "text", label: "Title" },
          numberOfProducts: { type: "number", label: "Number of Display" },

          productManufacturers: {
            type: "custom",
            label: "Product Manufacturer",
            render: ({ name, onChange, value }) => (
              <>
                <Typography mb={1} variant="subtitle1">
                  Product Manufacturer
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={1}
                  options={productFilter?.Manufacturer}
                  getOptionLabel={(option) => option.label}
                  value={value || []}
                  disableClearable
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <Typography>dsa</Typography>
                    // <TextField {...params} variant="outlined" />
                  )}
                  sx={{ width: "100%" }}
                />
              </>
            ),
          },
        },
        defaultProps: {
          title: "Products We Sell",
          numberOfProducts: 6,
          productManufacturers: [],
        },
        render: ({ title, numberOfProducts, productManufacturers }) => {
          return (
            <ProductsSection
              title={title}
              numberOfProducts={numberOfProducts}
              productManufacturers={productManufacturers}
            />
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
      preconfigured: {
        label: "Preconfigured",
        components: ["TopBrandList", "SpaceInspirations", "ProductsSection"],
      },
      customizable: {
        label: "Customizable",
        components: [
          "HeroBanner",
          "FeaturedService",
          "ImageGridList",
          "ImageGridListWithTag",
          "LargeImageGridList",
          "ContentExplainCardRight",
          "ContentExplainCardLeft",
          "AnimatedFeatureDisplay",
          "TestimionialSection",
          "AboutSection",
        ],
      },
    },
  };
};

export { createConfig };
