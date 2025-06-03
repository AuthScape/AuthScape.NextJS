"use client"; // Required for Next.js App Router

import { useEffect } from "react";

const HubSpotField = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "47835682",
          formId: "9dfdd1b9-b0ba-4802-b077-fc8364d96cbe",
          region: "na1",
          target: "#hubspotForm",
        });
      }
    };
  }, []);

  return <div id="hubspotForm"></div>;
};

export default HubSpotField;