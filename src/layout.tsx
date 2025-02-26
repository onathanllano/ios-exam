import { Outlet } from "react-router";
import { Container } from "./components/container/container.component";
import React from "react";
import { Toaster } from "sonner";

type Props = {
  showBackButton?: boolean
  pageTitle?: string
  rightElement?: React.ReactNode
}

export const Layout = (props: Props) => (
  <main>
    <Toaster richColors position="top-right" />
    <Container>

      
      <Outlet />
    </Container>
  </main>
);
