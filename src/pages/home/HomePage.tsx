import style from "./HomePage.module.scss";
import classNames from "classnames/bind";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays, faCircleCheck, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BiBadgeCheck, BiHeadphone, BiIdCard } from "react-icons/bi";
import Banner from "./components/Banner";
import Container from "@/components/Container";
import Service from "./components/Service";
import Achievement from "./components/Achievement";

const cx = classNames.bind(style);

const HomePage = () => {
  return (
    <>
      <Container>
        <Banner />
        <Service />
        <Achievement />
      </Container>
    </>
  );
};

export default HomePage;
