import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MdxTreeRenderer from "./components/mdx-tree-renderer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MdxTreeRenderer filename={"~/test/mock-resume"}/>
    </>
  );
}

export default App;
