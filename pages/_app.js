import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
//NextJS default generated page
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
