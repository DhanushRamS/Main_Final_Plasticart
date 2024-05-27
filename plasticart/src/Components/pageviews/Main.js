// Main Content component
import React from "react";
import { IconContext } from "react-icons";
import fog_1 from "../img/fog_1.png";
import fog_2 from "../img/fog_2.png";
import fog_3 from "../img/fog_3.png";
import fog_4 from "../img/fog_4.png";
import fog_5 from "../img/fog_5.png";
import fog_6 from "../img/fog_6.png";
import fog_7 from "../img/fog_7.png";
import black_shadow from "../img/black_shadow.png";
import background from "../img/background.png";
import sun_rays from "../img/sun_rays.png";
// import "./style.css";

const MainContent = () => {
  return (
    <main className="h-screen relative w-full">
      <div className="vignette"></div>
      <img alt="images-index" src={background} className="h-screen absolute w-screen" />
      <img alt="images-index" src={fog_7} className="" />
      <img alt="images-index" src={fog_6} className="" />
      <img alt="images-index" src={fog_5} className="" />
      <div className="text parallax">
        <h2>Environment</h2>
        <h1>Pollution</h1>
      </div>
      <img alt="images-index" src={fog_4} className="parallax fog-4" />
      <img alt="images-index" src={fog_3} className="parallax fog-3" />
      <img alt="images-index" src={fog_2} className="parallax fog-2" />
      <img alt="images-index" src={sun_rays} className="sun-rays" />
      <img alt="images-index" src={black_shadow} className="black-shadow" />
      <img alt="images-index" src={fog_1} className="parallax fog-1" />
    </main>
  );
};
export default MainContent;
