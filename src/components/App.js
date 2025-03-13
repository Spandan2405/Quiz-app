import Loader from "./Loader.js";
import NextButton from "./NextButton.js";
import Timer from "./Timer.js";
import FinishedScreen from "./FinishedScreen.js";
import ProgressTitle from "./ProgressTitle.js";
import Questions from "./Questions.js";
import StartScreen from "./StartScreen.js";
// import Header from "./Header.js";
import Error from "./Error.js";
import Main from "./Main.jsx";
import { useQuiz } from "../contexts/QuizContext.jsx";
import { useEffect, useState } from "react";
import Home from "./Home.js";

export default function App() {
  const { status, index } = useQuiz();
  const [imageUrl, setImageUrl] = useState("");
  const collectionId = "11TXOVH5JuU"; // Your Unsplash Collection ID
  const accessKey = "A_2BXZ-4HXWji6RacJWR0W5TQjrKuL8Inp_nIcasloA"; // Replace with your Unsplash API Key

  useEffect(() => {
    fetchRandomImage();
  }, [status, index]);

  const fetchRandomImage = async () => {
    const url = `https://api.unsplash.com/collections/${collectionId}/photos?per_page=30&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      if (data.length > 0) {
        // Pick a random image from the collection
        const randomImage = data[Math.floor(Math.random() * data.length)];
        setImageUrl(randomImage.urls.full);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="overlay">
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "choose" && <Home />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <div className="quiz">
              <ProgressTitle />
              <Questions />
              <footer>
                <Timer />
                <NextButton />
              </footer>
            </div>
          )}
          {status === "finished" && <FinishedScreen />}
        </Main>
      </div>
    </div>
  );
}
