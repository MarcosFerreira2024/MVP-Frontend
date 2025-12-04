import Header from "../components/Header";
import Section from "../components/home/Section";
import { TwoRowsCarousel } from "../components/outing/TwoRowsCarousel";
import ParkCards from "../components/outing/parks/ParkCards";
import RevealingImage from "../components/RevealingImage";
import TrailCardList from "../components/trails/TrailCardList";
import useTrailData from "../hooks/useTrail"; // Import useTrailData hook
import useEventData from "../hooks/useEvent"; // Import useEventData hook

function Home() {
  const { trailsData, error: errorTrails } = useTrailData();
  const { eventsCarouselData, error: errorEvents } = useEventData();

  const error = errorTrails || errorEvents;

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>; // Combined error message
  }

  return (
    <>
      <Header />
      <video
        loop
        autoPlay
        className="w-screen h-[600px] object-cover mt-8 grayscale-25 group-hover:grayscale-0"
        muted
        src="chuva.mp4"
      />
      <Section
        description="veja nossos principais parques"
        title="Parques"
        isOnLightBg
      >
        <ParkCards />
      </Section>
      <div>
        <RevealingImage image="/trilha.jpg" />
        <Section
          title="Trilhas"
          description="veja nossas principais trilhas"
          isOnLightBg={false}
        >
          {trailsData && <TrailCardList data={trailsData} />}
        </Section>
      </div>
      <div>
        <Section
          title="Eventos"
          description="veja nossos principais eventos"
          isOnLightBg
        >
          {eventsCarouselData && <TwoRowsCarousel items={eventsCarouselData} />}{" "}
        </Section>
      </div>
    </>
  );
}

export default Home;
