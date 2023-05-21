import { AppShell } from "@mantine/core";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function App() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
    </AppShell>
  );
}
