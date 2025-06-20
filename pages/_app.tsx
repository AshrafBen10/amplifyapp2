import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { Auth } from "aws-amplify";

Amplify.configure(outputs);

function App({ Component, pageProps, signOut }: AppProps & { signOut?: () => void }) {
  useEffect(() => {
    // Check if user is authenticated
    Auth.currentAuthenticatedUser()
      .then(() => {
        // Redirect to Canvas
        window.location.href = "https://canvas.instructure.com/";
      })
      .catch((err) => {
        console.log("Not authenticated", err);
      });
  }, []);

  return <Component {...pageProps} />;
}

export default withAuthenticator(App);
