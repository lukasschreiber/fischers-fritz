export function MainStage() {
  return (
    <div className="min-h-[calc(100vh-68px)] h-[calc(100vh-68px)] overflow-hidden flex items-center">
      <img
        src="/intro-bg.webp"
        className="min-h-full w-auto object-center object-cover"
      />
      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 items-center">
        <h1 className="[text-shadow:_0_0_15px_rgba(0,0,0,0.5)] text-7xl text-white font-[500] text-center">
          Fischers Fritz Greetsiel
        </h1>
        <div className="bg-fritz-teal-700 text-white rounded-md p-4">
          Im Juni 2020 haben wir unser wunderschönes <b>Friesenhaus „Fischers
          Fritz“</b> im Herzen von <b>Greetsiel</b> fertiggestellt. Wir laden Sie herzlich
          ein, Ihren Urlaub in unserem liebevoll eingerichteten Feriendomizil zu
          verbringen.
        </div>
        <a href="#about" className="uppercase bg-fritz-teal-500 w-fit text-white hover:bg-fritz-teal-700 font-semibold py-4 px-3 rounded-md text-sm transition">Mehr Erfahren</a>
      </div>
    </div>
  );
}
