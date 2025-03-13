import React from "react";
import Card from "./Card";
import heading from "../data/QUIZ-APP.png";

const cards = [
  {
    title: "HTML",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/800px-HTML5_logo_and_wordmark.svg.png",
  },
  {
    title: "CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
  },
  {
    title: "JS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    title: "React",
    logo: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
  },
  {
    title: "SQL",
    logo: "https://www.rogersoft.com/storage/attachments/1694676692.jpg",
  },
  {
    title: "GITHUB",
    logo: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  },
];
function Home() {
  return (
    <div className="home">
      <img src={heading} alt="quiz-app" className="app-header" />
      <div className="cards">
        {cards.map((item) => (
          <Card title={item.title} logo={item.logo} />
        ))}
      </div>
    </div>
  );
}

export default Home;
