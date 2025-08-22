import React, { useEffect } from "react";
import { GDPRConsentDialog } from "authscape";

export default function Index({}) {

    useEffect(() => {
        const stored = localStorage.getItem("gdpr-consent");
        if (stored) {
        const prefs = JSON.parse(stored);
        console.log("User previously consented:", prefs);
        // optional: send to your backend
        }
    }, []);

    const handleConsentAccepted = (prefs) => {
        console.log("Consent accepted:", prefs);
        // optional: send to backend
    };

    const handleConsentRejected = () => {
        console.log("Consent rejected");
        // disable analytics scripts, etc.
    };

    return (
        <>
            <GDPRConsentDialog
                onAccept={handleConsentAccepted}
                onReject={handleConsentRejected}
                enableAnalytics={true}
                enableMarketing={true}
                additionalPrivacyFeatures={[
                    {id: "danceParty", title: "Dance Party", description: "Hello world this is about the feature", checked: true },
                    {id: "frog", title: "Able to see Frogs", description: "Frogs will appear on your screen", checked: true }
                ]}
            />
        </>
    )

};