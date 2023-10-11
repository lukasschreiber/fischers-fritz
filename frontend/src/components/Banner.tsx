import { ApartmentsGreetsielLogo } from "../assets";

export function Banner() {
  return (
    <div className="bg-fritz-teal-700 w-full py-10 text-white">
      <div className="flex md:flex-row flex-col gap-10 md:justify-evenly mx-10 items-center">
        <div className="flex flex-col max-w-[400px]">
          <div className="text-2xl">Ein gemütliches und modernes Ferienhaus in Greetsiel</div>
          <div className="opacity-70 text-sm">In schöner Lage an der Nordsee, für die ganze Familie</div>
        </div>
        <a href="https://www.apartments-greetsiel.de/objekt/fischers-fritz.html" target="_blank" className="flex gap-2 items-center border-2 rounded-md p-3 h-fit uppercase text-sm font-bold hover:text-fritz-teal-700 hover:bg-white cursor-pointer">Verfügbarkeit Prüfen <ApartmentsGreetsielLogo className="w-6 h-6 pb-1"/></a>
      </div>
    </div>
  );
}
