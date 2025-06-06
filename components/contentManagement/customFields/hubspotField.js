"use client"; // Required for Next.js App Router

import { useEffect } from "react";

const HubSpotField = ({portalId, formId}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: portalId,
          formId: formId,
          region: "na1",
          target: "#hubspotForm",
        });
      }
    };
  }, []);

  return <div id="hubspotForm"></div>;
};

export default HubSpotField;