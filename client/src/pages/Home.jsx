import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="travsy-navigation">
      <h1>Homepage</h1>
     Travsy-code
      <ul>
        <li>
          <Link to="/">Homeguest</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
