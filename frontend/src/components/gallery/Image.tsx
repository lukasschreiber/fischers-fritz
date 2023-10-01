import { useEffect } from "react";
import { useGalleryContext } from "../../hooks/gallery";

export function Image(props: {
  title: string;
  src: string;
  className?: string;
}) {
  const { addImage, setState } = useGalleryContext();

  useEffect(() => {
    addImage({ src: props.src, title: props.title });
  }, [props.src, props.title]);

  return (
    <img src={props.src} alt={props.title} className={props.className || ""} onClick={() => setState({open: true, slide: props.src})} />
  );
}
