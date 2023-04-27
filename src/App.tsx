import "./App.css";
import MdxTreeRenderer from "./components/mdx-tree-renderer";

function App() {

  return (
      <MdxTreeRenderer filename={"~/test/mock-resume"} />
  );
}

export default App;
