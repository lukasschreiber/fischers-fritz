import { Banner } from "./components/Banner";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { MainStage } from "./components/MainStage";
import { Reviews } from "./components/Reviews";
import { Title } from "./components/Title";
import { Gallery } from "./components/gallery/Gallery";
import { Image } from "./components/gallery/Image";

function App() {
  return (
    <>
      <Header />
      <MainStage />
      <Banner />
      <Container>
        <Container.Section>
          <Image className="p-5 shadow-lg" src="about_img.jpg" title="Außenansicht" />
        </Container.Section>
        <Container.Section>
          <Title text="Über das Haus" />
          <p className="my-5 text-neutral-500 text-sm">
            Das hochwertig eingerichtete Friesenhaus „Fischers
            Fritz“ bietet auf knapp 100 qm Platz für bis zu 6 Personen. Es
            eignet sich gleichermaßen für einen Urlaub mit Freunden wie für
            einen Urlaub mit der Großfamilie. Das Ferienhaus liegt in einem
            ruhigen Wohngebiet am Ortsrand von Greetsiel. Zu Fuß oder mit dem
            Fahrrad lassen sich das Zentrum mit Restaurants und
            Einkaufsmöglichkeiten sowie der Hafen und die Zwillingsmühlen gut
            erreichen. Entspannen Sie in „Fischers Fritz“ bei einer Tasse
            Ostfriesentee in der gemütlichen Leseecke, einem Grillabend auf der
            vollmöblierten Terrasse oder beim gemütlichen Spieleabend am
            großzügigen Esstisch. Für Aktivurlauber steht ein abschließbarer
            Fahrradraum mit Lademöglichkeit für E-Bikes zur Verfügung.
            Alternativ können die beiden hauseigenen Fahrräder kostenfrei
            genutzt werden. Bettwäsche sowie Handtücher für Bad und Küche sind
            optional buchbar.
          </p>
          <Title text="Was wir Ihnen bieten:" style="h3" />
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
      <Reviews />
      <Gallery />
    </>
  );
}

export default App;
