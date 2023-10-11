import { Image } from "@fischers-fritz/types";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useGalleryContext } from "../../hooks/gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Close } from "../../assets";

export interface GalleryState {
  open: boolean;
  slide: string | undefined;
}

export const GalleryContext = createContext<{
  images: Image[];
  addImage: (image: Image) => void;
  setState: (state: GalleryState) => void;
  state: GalleryState;
}>({
  images: [],
  addImage: () => {},
  state: { open: false, slide: undefined },
  setState: () => {},
});

export function GalleryProvider(props: PropsWithChildren) {
  const [images, setImages] = useState<Image[]>([]);
  const [state, setState] = useState<GalleryState>({
    open: false,
    slide: undefined,
  });

  const addImage = (image: Image) => {
    if (!images.some((i) => i.src === image.src)) {
      setImages((rest) => [...rest, image]);
    }
  };

  return (
    <GalleryContext.Provider value={{ images, addImage, state, setState }}>
      {props.children}
    </GalleryContext.Provider>
  );
}

export function Gallery() {
  const { images, state, setState } = useGalleryContext();
  const [swiper, setSwiper] = useState<SwiperType | undefined>(undefined);

  const handleClick = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).classList.contains("swiper-slide"))
      return;
    setState({ open: false, slide: undefined });
  };

  useEffect(() => {
    if (state.slide !== undefined && swiper !== undefined) {
      swiper.slideTo(
        images.findIndex((image) => image.src === state.slide),
        0
      );
    }
  }, [state, swiper, images]);

  return createPortal(
    <div
      className={`${
        !state.open ? "hidden" : ""
      } gallery fixed top-0 left-0 w-screen h-screen bg-neutral-50/60 backdrop-blur-md z-50`}
      onClick={handleClick}
    >
      <div
        className="text-black/60 w-8 h-8 absolute right-4 top-4 cursor-pointer z-50"
        onClick={() => setState({ open: false, slide: undefined })}
      >
        <Close />
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        onInit={(swiper) => setSwiper(swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.src + index}
            className="py-20 px-40 flex justify-center flex-col gap-4 items-center"
          >
            <img src={image.src} className="max-h-full" />
            <div className="bg-white px-8 py-2 w-fit rounded-2xl shadow-md">
              {image.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>,
    document.body
  );
}
