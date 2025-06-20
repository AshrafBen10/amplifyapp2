import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from 'aws-amplify/auth';
import { withAuthenticator } from "@aws-amplify/ui-react";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";

Amplify.configure(outputs);

function App({ Component, pageProps, signOut }: AppProps & { signOut?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        // Redirect to Canvas
        window.location.href = "https://canvas.instructure.com/";
      } catch (err) {
        console.log("Not authenticated", err);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  // This will only render if the user is not authenticated
  return <Component {...pageProps} />;
}

export default withAuthenticator(App);
