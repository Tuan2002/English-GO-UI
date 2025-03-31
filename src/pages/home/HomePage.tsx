import AboutBox from "./components/AboutBox";
import ContactBox from "./components/ContactBox";
import EvaluateBox from "./components/EvaluateBox";
import FeedbackBox from "./components/FeedbackBox";
import Footer from "./components/Footer";
import HomeHeader from "./components/HomeHeader";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <AboutBox />
      <FeedbackBox />
      <EvaluateBox />
      <ContactBox />
      <Footer />
    </>
  );
};

export default HomePage;
