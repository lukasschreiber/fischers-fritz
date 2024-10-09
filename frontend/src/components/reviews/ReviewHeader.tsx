import { Review } from "../../types";
import { ApartmentsGreetsielLogo, FewoDirectLogo, GoogleLogo, Star, TraumFewoLogo } from "../../assets";
import { Stars } from "./Stars";
import { Popup } from "./Popup";
import { useState } from "react";

export function ReviewHeader(props: { review: Review; starStyle: "small" | "normal" }) {
    const [popupOpen, setPopupOpen] = useState(false);
    return (
        <>
            <div className="flex flex-row justify-between gap-2 items-center">
                {props.review.profileImage && <img src={props.review.profileImage} className="h-10 w-10" />}
                <div className="flex flex-col">
                    <div className="text-neutral-700">{props.review.authorName}</div>
                    <div className="text-xs text-neutral-400 flex flex-row gap-1 items-center">
                        <div>
                            {new Date(props.review.time * 1000).toLocaleDateString("de-DE", {
                                month: "long",
                                year: "numeric",
                                // day: "2-digit",
                            })}{" "}
                            über
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => setPopupOpen(true)}
                            onMouseLeave={() => setPopupOpen(false)}
                        >
                            {props.review.source === "greetsiel-apartments" && (
                                <ApartmentsGreetsielLogo className="h-6 w-6" />
                            )}
                            {props.review.source === "google" && <GoogleLogo className="h-4 w-4" />}
                            {props.review.source === "fewo-direct" && <FewoDirectLogo className="h-5 w-5" />}
                            {props.review.source === "traum-ferienwohnungen" && <TraumFewoLogo className="h-5 w-5" />}
                            <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
                                {props.review.source === "greetsiel-apartments" && (
                                    <div className="flex flex-row gap-1 items-center">
                                        <ApartmentsGreetsielLogo className="h-8 w-8" />
                                        <div className="text-neutral-700 flex flex-col gap-0.5 whitespace-nowrap">
                                            <div>Apartments Greetsiel</div>
                                            <a
                                                href="https://www.apartments-greetsiel.de/Nordsee/Ostfriesland/Greetsiel/Fischers.Fritz"
                                                className="text-fritz-teal-500 underline cursor-pointer"
                                                target="_blank"
                                            >
                                                Zu unserem Ferienhaus
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {props.review.source === "google" && (
                                    <div className="flex flex-row gap-1 items-center">
                                        <GoogleLogo className="h-8 w-8" />
                                        <div className="flex flex-col gap-0.5 whitespace-nowrap">
                                            <div>Google</div>
                                            <a
                                                href={`https://www.google.com/search?sca_esv=c69687dd38f7d581&tbm=lcl&sxsrf=ADLYWIIq19ohrUr-iHgZImoH3avt0g31cg:1728485006258&q=Ferienhaus+Fischers+Fritz+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDEyMjU0NDQzNDGzNDE0NzOwMNjAyPiKUdUttSgzNS8jsbRYwS2zODkjtQjIKMosqVIISq1KzSvOzM9LzVvESpw6ACUYMghrAAAA&rldimm=14225111614694176080&hl=de-DE&sa=X&ved=2ahUKEwj4uLC2xIGJAxXBlP0HHVeED70Q9fQKegQIShAF&biw=1745&bih=834&dpr=1.1#lkt=LocalPoiReviews`}
                                                className="text-fritz-teal-500 underline cursor-pointer"
                                                target="_blank"
                                            >
                                                Zu Google Maps
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {props.review.source === "traum-ferienwohnungen" && (
                                    <div className="flex flex-row gap-1 items-center">
                                        <TraumFewoLogo className="h-8 w-8" />
                                        <div className="flex flex-col gap-0.5 whitespace-nowrap">
                                            <div>Traum-Ferienwohnungen</div>
                                            <a
                                                href="https://www.traum-ferienwohnungen.de/297743/"
                                                className="text-fritz-teal-500 underline cursor-pointer"
                                                target="_blank"
                                            >
                                                Zu unserem Ferienhaus
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                </div>
                {props.starStyle === "small" ? (
                    <div className="bg-yellow-300 text-yellow-700 font-bold p-1 rounded-md flex items-center gap-1 h-fit ml-auto">
                        <Star className="h-4 w-4" />
                        {props.review.rating}
                    </div>
                ) : (
                    <div className="ml-auto flex flex-col text-xs text-neutral-400 gap-1">
                        <Stars max={5} mean={props.review.rating} />
                        <div>{props.review.rating} Sterne</div>
                    </div>
                )}
            </div>
        </>
    );
}
