type Link = { target: string; label: string };

export function Header() {
  const links: Link[] = [
    {
      label: "Das Haus",
      target: "#about",
    },
    {
      label: "Impressionen",
      target: "#services",
    },
    {
      label: "Anfahrt",
      target: "#map",
    },
    {
      label: "Bewertungen",
      target: "#testimonials",
    },
    {
      label: "Kontakt",
      target: "#contact",
    },
    {
      label: "Tipps",
      target: "tipps",
    },
  ];
  return (
    <nav className="bg-white shadow-md sticky top-0 overflow-hidden z-40 flex justify-center">
      <div className="container max-w-full md:max-w-6xl px-3 flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <a
              href=""
              className="text-3xl text-fritz-teal-700 tracking-[-1px] uppercase font-bold"
            >
              Fischers Fritz
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map((link) => (
              <a
                key={link.target}
                href={link.target}
                className="text-fritz-teal-700 hover:text-fritz-teal-300 uppercase px-2 py-0.5 font-bold text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
      </div>
    </nav>
  );
}
