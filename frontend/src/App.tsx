import { Banner } from "./components/Banner";
import { ContentSection } from "./components/ContentSection";
import { Header } from "./components/Header";
import { MainStage } from "./components/MainStage";
// import { Reviews } from "./components/Reviews";

function App() {
  return (
    <>
      <Header />
      <MainStage />
      <Banner />
      {/* <Reviews /> */}
      <ContentSection>
        <ContentSection.Left>
          Test
        </ContentSection.Left>
        <ContentSection.Left>
          Right
        </ContentSection.Left>
      </ContentSection>
    </>
  );
}

export default App;
