import React from "react";
import { Link } from "react-router-dom";
import doodle1 from "../../Assets/doodle1.png";
import MorphinWords from "../MorphinWords";
import About from "../About/About";
import Welcoming from "../../Components/Welcome/Welcoming";
import WelcomeImg from "../../Assets/welcome1white.png"
import "./welcomepg.css"

function Welcome() {
  // const languageFlip = [
  //   "Welcome!",
  //   "bienvenido!",
  //   "স্বাগতম!",
  //   "مرحباً!",
  //   "स्वागत!",
  //   "いらっしゃいませ!",
  //   "欢迎!",
  //   "akeyi!",
  //   "maligayang pagdating!",
  //   "خوش آمدید!",
  // ];

  return (
    <div >
      <div className="welcometext">
        <p >
          <MorphinWords />
        </p>
      </div>
      {/* <p className="welcome_p">Find Your Community</p>
      <div className="welcome-btn-div">
        <div className="doodle1">
          <img src={doodle1} alt="doddle1" width={100} height={100} />
        </div>

        <div>
          <Link to={`/login`}>
            <button className="welcome-btn">Get Started</button>
          </Link>
        </div>
      </div> */}
      <Welcoming />
      <div className="doodle1">
          <img className="welcome-img" src={WelcomeImg} alt="doddle1" />
        </div>
      <About/>

    </div>
  );
}

export default Welcome;
