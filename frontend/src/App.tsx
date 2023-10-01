import { Banner } from "./components/Banner";
import { SideBySide } from "./components/SideBySide";
import { Header } from "./components/Header";
import { MainStage } from "./components/MainStage";
import { Reviews } from "./components/Reviews";

function App() {
  return (
    <>
      <Header />
      <MainStage />
      <Banner />
      {/* <Reviews /> */}
      <SideBySide>
        <SideBySide.Section>
          Test
        </SideBySide.Section>
        <SideBySide.Section>
          Right
        </SideBySide.Section>
      </SideBySide>
      <Reviews />
    </>
  );
}

export default App;
