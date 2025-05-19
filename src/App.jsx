import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-6xl">Flavor Forge</h1>
      <form action="">
        <p className="">Tailwind Test</p>
        <label htmlFor="">Recipe Name asdf</label>
        <input
          id="FlavorForge-RecipeName"
          name="RecipeName"
          type="text"
          placeholder="placeholder"
        />
      </form>
    </>
  );
}

export default App;
