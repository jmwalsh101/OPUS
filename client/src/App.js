import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import "./style/master.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
