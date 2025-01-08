import Banner from "./components/Banner";
import Container from "@/components/Container";
import Service from "./components/Service";
import Achievement from "./components/Achievement";
import Footer from "./components/Footer";

const HomePage = () => {
  return (
    <>
      <Container>
        <Banner />
        <Service />
        <Achievement />
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
