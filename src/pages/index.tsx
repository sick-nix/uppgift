import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";

import { MantineProvider } from "@mantine/core";
import App from "~/components/App";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Uppgift</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {sessionData && (
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <App />
            <ToastContainer />
          </MantineProvider>
        )}
        {!sessionData && (
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
