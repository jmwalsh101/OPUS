import Navigation from "./components/navigation/Navigation";
import "./style/master.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </>
  );
}

export default App;
