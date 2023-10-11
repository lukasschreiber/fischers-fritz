import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GalleryProvider } from "./components/gallery/Gallery.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { Tipps } from "./pages/Tipps.tsx";
import { Container } from "./components/Container.tsx";
import { Imprint } from "./pages/Imprint.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "tipps",
    element: <Tipps />,
  },
  {
    path: "impressum",
    element: <Imprint />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GalleryProvider>
      <Header />
      <RouterProvider router={router} />
      <Container className="text-sm text-neutral-400">
        <Container.Section className="text-center">&copy; 2020-{new Date().getFullYear()} Lukas Schreiber | <a href="/impressum">Impressum</a></Container.Section>
      </Container>
    </GalleryProvider>
  </React.StrictMode>
);
