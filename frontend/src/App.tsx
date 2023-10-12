import { Banner } from "./components/Banner";
import { Container } from "./components/Container";
import { Grid } from "./components/Grid";
import { List } from "./components/List";
import { MainStage } from "./components/MainStage";
import { Reviews } from "./components/reviews/Reviews";
import { Title } from "./components/Title";
import { Gallery } from "./components/gallery/Gallery";
import { Image } from "./components/gallery/Image";
import { GoogleLogo } from "./assets";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash.replace("#", "") === "") return;
    
    const element = document.querySelector(
      `[data-id=${hash.replace("#", "")}]`
    );
    if (element !== null) {
      window.scrollTo({
        top:
          element.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          68, // the height of the header in px
      });
    }
  }, [hash]);
  return (
    <>
      <MainStage />
      <Banner />
      <Container data-id="about">
        <Container.Section>
          <Image
            className="p-5 shadow-lg bg-white"
            src="about_img.jpg"
            title="Außenansicht"
          />
        </Container.Section>
        <Container.Section>
          <Title>Über das Haus</Title>
          <p className="my-5 text-neutral-500 text-sm">
            Das hochwertig eingerichtete Friesenhaus „Fischers Fritz“ bietet auf
            knapp 100 qm Platz für bis zu 6 Personen. Es eignet sich
            gleichermaßen für einen Urlaub mit Freunden wie für einen Urlaub mit
            der Großfamilie. Das Ferienhaus liegt in einem ruhigen Wohngebiet am
            Ortsrand von Greetsiel. Zu Fuß oder mit dem Fahrrad lassen sich das
            Zentrum mit Restaurants und Einkaufsmöglichkeiten sowie der Hafen
            und die Zwillingsmühlen gut erreichen. Entspannen Sie in „Fischers
            Fritz“ bei einer Tasse Ostfriesentee in der gemütlichen Leseecke,
            einem Grillabend auf der vollmöblierten Terrasse oder beim
            gemütlichen Spieleabend am großzügigen Esstisch. Für Aktivurlauber
            steht ein abschließbarer Fahrradraum mit Lademöglichkeit für E-Bikes
            zur Verfügung. Alternativ können die beiden hauseigenen Fahrräder
            kostenfrei genutzt werden. Bettwäsche sowie Handtücher für Bad und
            Küche sind optional buchbar.
          </p>
          <Title style="h3">Was wir Ihnen bieten:</Title>
          <List>
            <List.Item>
              gemütlich eingerichtetes Nichtraucher-Haus für bis zu 6 Personen
            </List.Item>
            <List.Item>hochwertige, moderne Ausstattung</List.Item>
            <List.Item>
              schöne möblierte Terrasse mit Grill Fußbodenheizung in allen
              Räumen
            </List.Item>
            <List.Item>
              große Fenster mit Insektenschutz und elektrischen Rollläden
            </List.Item>
            <List.Item>Be- und Entlüftungsanlage</List.Item>
            <List.Item>Gerätehaus mit Lademöglichkeiten für E-Bikes</List.Item>
            <List.Item>zwei Fahrräder zur freien Verfügung</List.Item>
            <List.Item>Wlan-Anschluss und Waschtrockner</List.Item>
          </List>
        </Container.Section>
      </Container>
      <Container className="bg-white" data-id="services">
        <Container.Section>
          <Title>Impressionen</Title>
          <Grid>
            <Grid.Item imageSrc="/services/service-1.jpg" title="Badezimmer">
              Es gibt zwei vollwertig ausgestattete Badezimmer im OG und EG
              jeweils mit bodengleicher Dusche und Haartrockner. Das EG-Bad
              verfügt zusätzlich über eine elektrische Handtuchheizung, einen
              Waschtrockner und einen Kosmetikspiegel.
            </Grid.Item>
            <Grid.Item imageSrc="/services/service-2.jpg" title="Schlafzimmer">
              Es stehen drei Schlafzimmer zur Verfügung:
              <ul className="list-decimal list-outside pl-4">
                <li>Schlafzimmer mit Boxspringbett 180x200cm und TV im EG</li>
                <li>
                  Schlafzimmer mit zwei Einzelbetten 90x200cm und 90x190cm im OG
                </li>
                <li>Schlafzimmer mit Boxspringbett 180x200cm und TV im OG</li>
              </ul>
              Alle Schlafzimmer bieten ausreichend Stauraum für Ihre Wäsche.
            </Grid.Item>
            <Grid.Item imageSrc="/services/service-3.jpg" title="Küche">
              In der modernen, umfangreich ausgestatteten Einbauküche finden
              Sie: Cerankochfeld, Backofen, Kühl /Gefrierkombination,
              Geschirrspüler, Mikrowelle, Kaffeemaschine Senseo Switch für Pads
              und Filterkaffee, Mixer, Stabmixer, Wasserkocher, Toaster,
              Vorratsschrank, DAB-Radio mit Bluetooth-Funktion,
            </Grid.Item>
            <Grid.Item
              imageSrc="/services/service-4.jpg"
              title="Wohn-/Essbereich"
            >
              Im Wohn-/Essbereich befindet sich ein großer Massivholztisch (1m x
              2m) mit 6 Polsterstühlen sowie ein Ecksofa und ein Lowboard mit
              TV. Über eine großzügige Schiebetür erreicht man die Terrasse.
            </Grid.Item>
            <Grid.Item
              imageSrc="/services/service-5.jpg"
              title="Sonstige Ausstattungsmerkmale"
            >
              Eingangsbereich mit großer Garderobe. Leseecke mit Sessel und
              Büchern im oberen Flur. Abstellraum mit Vorratsregal,
              Wäschespinne, Bügelbrett und Bügeleisen. Abschließbares Gerätehaus
              mit Abstellmöglichkeiten und Ladestation für Fahrräder. Zwei
              hauseigene Räder zur kostenfreien Nutzung (ein Herren-Trekkingrad
              und ein Damen-Hollandrad).
            </Grid.Item>
            <Grid.Item imageSrc="/services/service-6.jpg" title="Terrasse">
              Die Terrasse ist mit einer elektrischen Markise, einem Esstisch, 4
              Hochlehnern und zwei Stapelstühlen ausgestattet. Außerdem stehen
              ein Grill, zwei Sonnenliegen und ein Sonnenschirm zur Verfügung.
            </Grid.Item>
          </Grid>
        </Container.Section>
      </Container>
      <Container data-id="map">
        <Container.Section className="flex-grow-0">
          <iframe
            className="p-5 shadow-lg bg-white max-w-[100%] md:max-w-none"
            width="500"
            height="350"
            src="https://maps.google.com/maps?width=300&amp;height=250&amp;hl=en&amp;q=Ferienhaus%20Fischers%20Fritz%2C%20Greetsiel+(Titel)&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </Container.Section>
        <Container.Section className="text-sm text-neutral-500 flex gap-4 flex-col">
          <Title style="h3">Anfahrt</Title>
          <Title style="h4">Adresse</Title>
          <p>
            Gabrand-Doolmann - Weg 3<br />
            Greetsiel, 26736 Krummhörn
          </p>
          <Title style="h4">Achtung!</Title>
          <p>
            Da die Straße noch sehr neu ist, ist sie in den meisten
            Navigationsgeräten noch nicht zu finden. Im Navi können Sie einfach{" "}
            <b>Peter-Barfs-Straße</b> eingeben. Am Ende dieser Straße finden sie
            dann Fischers Fritz.
          </p>
        </Container.Section>
      </Container>
      <Container className="bg-white" data-id="testimonials">
        <Container.Section className="w-full">
          <Title>
            Bewertungen
            <a
              className="text-sm  shadow-md p-3 rounded-md flex gap-2 items-center border border-neutral-100"
              href={import.meta.env.VITE_GOOGLE_REVIEW_LINK}
              target="_blank"
            >
              Jetzt Bewerten <GoogleLogo className="w-4 h-4" />
            </a>
          </Title>
          <Reviews />
        </Container.Section>
      </Container>
      <Gallery />
    </>
  );
}

export default App;
