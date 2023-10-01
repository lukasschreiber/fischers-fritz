import { useContext } from "react";
import { GalleryContext } from "../components/gallery/Gallery";

export function useGalleryContext() {
  return useContext(GalleryContext);
}
