import { Container } from "../components/Container";
import { Title } from "../components/Title";

export function Tipps() {
  return (
    <Container className="text-sm text-neutral-600 bg-white">
      <Container.Section>
        <Title style="h3" className="mt-2">
          Einkaufsmöglichkeiten für Lebensmittel:
        </Title>
        <ul className="list-disc ml-5">
          <li>
            Edeka Rah in Greetsiel (in der Saison auch an Sonn- und Feiertagen
            von 8 Uhr - 11 Uhr geöffnet)
          </li>
          <li>
            De Beer Krabben- und Fischhandel, Filialen siehe{" "}
            <a className="text-fritz-teal-500"href="http://www.debeer.de" target="_blank">
              www.debeer.de
            </a>
          </li>
        </ul>
        <p className="my-3">
          Größere Supermärkte und eine Drogerie finden sich in Pewsum (ca. 12 km
          entfernt):
        </p>
        <ul className="list-disc ml-5">
          <li>Combi</li>
          <li>Lidl</li>
          <li>Aldi</li>
          <li>Edeka</li>
          <li>Rossmann</li>
        </ul>
        <Title style="h3" className="mt-2">
          Apotheke:
        </Title>
        <p className="my-3">„Apotheke Greetsiel“ neben dem Edeka-Markt</p>
        <p className="my-3">
          Öffnungszeiten und Notdienst siehe{" "}
          <a className="text-fritz-teal-500"href="http://www.apotheke-greetsiel.de" target="_blank">
            www.apotheke-greetsiel.de
          </a>
        </p>
        <Title style="h3" className="mt-2">
          Restauranttipps in Greetsiel:
        </Title>
        <p className="my-3">
          Es gibt zahlreiche Restaurants/Cafés in Greetsiel. Trotzdem ist es in
          allen Restaurants ratsam, frühzeitig zu reservieren. Unsere
          Empfehlungen:
        </p>
        <ul className="list-disc ml-5">
          <li>
            <strong>Captains Dinner</strong> (
            <a className="text-fritz-teal-500"href="http://www.captains-dinner.com" target="_blank">
              captains-dinner.com
            </a>
            ): abwechslungsreiche Speisekarte, sowohl Fisch- als auch
            Fleischgerichte sehr zu empfehlen, tolles Ambiente, sehr nette
            Bedienung, Terrasse, unsere 1. Wahl 🙂!
          </li>
          <li>
            <strong>Hohes Haus</strong> (
            <a className="text-fritz-teal-500"href="http://www.hoheshaus.de" target="_blank">
              hoheshaus.de
            </a>
            ): gute Auswahl an Fisch- und Fleischgerichten, schöne Terrasse im
            Hinterhof, teils beheizt
          </li>
          <li>
            <strong>Festland</strong>: sehr gemütlich und ansprechend
            eingerichtet, tolle Lage direkt am Hafen mit Terrasse, sehr gute
            Küche, günstige Mittagsmenüs im Angebot
          </li>
          <li>
            <strong>SB-Fischrestaurants von „De Beer“:</strong> Greetje im
            Ortskern und Restaurant am Hauptsitz hinter den Zwillingsmühlen:
            <br />
            sehr guter und günstiger Fisch in Schnellrestaurant-Atmosphäre, sehr
            zu empfehlen sind auch die Fischbrötchen, alle Gerichte auch zum
            Mitnehmen,
            <br />
            die Auswahl an Fischgerichten ist im Restaurant am Hauptsitz
            deutlich größer (Speisekarten und Öffnungszeiten siehe{" "}
            <a className="text-fritz-teal-500"href="http://www.debeer.de" target="_blank">
              www.debeer.de
            </a>
            )
          </li>
        </ul>
        <ul className="list-disc ml-5">
          <li>
            <strong>Café Gezeiten</strong> (
            <a className="text-fritz-teal-500"href="http://www.gezeiten-greetsiel.de" target="_blank">
              gezeiten-greetsiel.de
            </a>
            ): hier findet sich zu jeder Tageszeit das passende Essen, am
            Wochenende gibt es ein Frühstücksbuffet
          </li>
          <li>
            <strong>Café Friesenherz</strong> (
            <a className="text-fritz-teal-500"href="http://www.friesenherz.com" target="_blank">
              friesenherz.com
            </a>
            ): stylisch eingerichtet, angeboten werden Frühstück, kleine Speisen
            und sehr zu empfehlender hausgebackener Kuchen. Bitte die Ruhetage
            beachten!
          </li>
          <li>
            <strong>Anleeger </strong>(
            <a className="text-fritz-teal-500"href="http://www.hotel-leegerpark-greetsiel.de" target="_blank">
              hotel-leegerpark-greetsiel.de
            </a>
            ): hier gibt es das beste Frühstücksbuffet in Greetsiel! Eine
            Anmeldung dafür ist erforderlich. Neben Frühstück werden kleine
            regionale Speisen und hausgebackene Kuchen angeboten. Etwas abseits
            des Trubels und dennoch nahe am Zentrum sitzt man gemütlich bei
            schönem Wetter auf der Terrasse direkt an der Gracht.
          </li>
          <li>
            <strong>Eiscafé am Hafen: </strong>das beste Eis Greetsiels in
            wechselnden Sorten, Eis „to go“ auf der Hafenmauer genießen und
            dabei die Fischkutter betrachten – das ist Urlaub!
          </li>
        </ul>
        <Title style="h3" className="mt-2">
          Sehenswürdigkeiten / Aktivitäten in Greetsiel und Umgebung:
        </Title>
        <p>
          Urlaub in Greetsiel und Umgebung verspricht jede Menge Abwechslung.
          Eine Auswahl an Ausflugstipps haben wir für Sie zusammengestellt:
        </p>
        <ul className="list-disc ml-5">
          <li>Greetsieler Mühlen</li>
          <li>
            Nationalparkhaus (
            <a className="text-fritz-teal-500"href="http://www.nationalparkhaus-wattenmeer.de" target="_blank">
              nationalparkhaus-wattenmeer.de
            </a>
            ): moderne Ausstellung rund um Leybucht und Wattenmeer, Angebot von
            Veranstaltungen, Exkursionen und Wattwanderungen
          </li>
          <li>
            Minigolf (Schläger und Bälle erhältlich in der Tourist-Info im Haus
            der Begegnung)
          </li>
          <li>Oase Greetsiel: Sauna und kleines Schwimmbad mit Kursangebot</li>
          <li>
            Lükko Leuchtturm Kinderhaus Greetsiel: tolle Angebote für Kinder,
            direkt am großen Abenteuerspielplatz hinter dem Haus der Begegnung
            gelegen
          </li>
          <li>
            Kanalfahrten/ Tretbootverleih/ Kettcarverleih (
            <a className="text-fritz-teal-500"href="http://www.abenteuer-am-wasser.de" target="_blank">
              abenteuer-am-wasser.de
            </a>
            )
          </li>
          <li>Fahrten mit dem Fischkutter (Infotafeln am Hafen beachten)</li>
          <li>
            Pilsumer Leuchtturm: Parkplatz in der Nähe, aber auch sehr gut mit
            dem Fahrrad von Greetsiel aus zu erreichen (immer am Deich entlang
            🙂)
          </li>
          <li>
            Norddeich: Sandstrand, Strandkorbmiete auch für einzelne Tage
            möglich, Drachenwiese (durch Baumaßnahmen kann es 2020/21
            Einschränkungen im Strandbereich geben
          </li>
          <li>
            Seehundstation Norddeich (
            <a className="text-fritz-teal-500"href="http://www.seehundstation-norddeich.de" target="_blank">
              seehundstation-norddeich.de
            </a>
            )
          </li>
          <li>
            Erlebnisbad Ocean Wave in Norddeich (
            <a className="text-fritz-teal-500"href="http://www.ocean-wave.de" target="_blank">
              ocean-wave.de
            </a>
            )
          </li>
          <li>
            Ostfriesisches Landwirtschaftsmuseum Campen (
            <a className="text-fritz-teal-500"href="http://www.olmc.de" target="_blank">
              olmc.de
            </a>
            ) mit Treckerverleih
          </li>
          <li>
            Städte in der Nähe von Greetsiel: Norden, Aurich und Emden
            (Otto-Fans finden hier das Otto-Museum)
          </li>
        </ul>
        <p className="my-3">Etwas weiter entfernt, aber sehr lohnenswert:</p>
        <ul className="list-disc ml-5">
          <li>
            Insel Norderney (Fähranleger Norddeich), es empfiehlt sich, die
            Insel mit dem Fahrrad zu erkunden (Fahrradverleih direkt am Hafen
            Norderney)
          </li>
          <li>
            Groningen (sehenswerte Stadt in den Niederlanden, ca. 120km
            entfernt)
          </li>
          <li>
            Leer (ca. 50km entfernt), schönes Stadtbild, zahlreiche
            Einkaufsmöglichkeiten, und einiges zu erleben (siehe{" "}
            <a className="text-fritz-teal-500"href="http://www.touristik-leer.de" target="_blank">
              touristik-leer.de
            </a>
            ), nicht nur bei „Schietwetter“ ist ein Besuch des Leeraner
            Miniaturlands lohnenswert
          </li>
        </ul>
      </Container.Section>
    </Container>
  );
}
