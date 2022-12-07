import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
//NextJS default generated page
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
