import "./App.less";
import MdxTreeRenderer from "./components/mdx-tree-renderer";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

function App() {
  return (
    <div>
      <Header />
      <MdxTreeRenderer />
      <Footer />
    </div>
  );
}

export default App;
