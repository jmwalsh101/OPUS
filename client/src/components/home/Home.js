import CodeExample from "../../images/codeExample.webp";
import WebExample from "../../images/publish2.webp";
import DocExample from "../../images/document.webp";
import MissingPiece from "../../images/missing-piece2.webp";

function Home() {
  return (
    <>
      <div className="home-header">
        <h1>OPUS</h1>
        <p>A docs-as-code manager without the code</p>
      </div>
      <div className="home-background">
        <div className="home-header2 second-home">
          <h2>Write, Convert, Publish</h2>
          <h3 className="home-info-text">
            OPUS's text editor is incredible for web writing. Clean. Simple.
            Intuitive. Write in plain text and convert to code in seconds.
            Publish the text code on the web with the click of a button.
          </h3>
          <div className="home-images">
            <span>
              <p>Just write...</p>
              <img
                src={DocExample}
                width="300"
                height="262"
                alt="example doc"
              />
            </span>
            <span>
              <p>...convert to code...</p>
              <img
                src={CodeExample}
                width="300"
                height="178"
                alt="code example"
              />
            </span>
            <span>
              <p>...and publish!</p>
              <img
                src={WebExample}
                width="300"
                height="229"
                alt="publish example"
              />
            </span>
          </div>
        </div>
        <div className="home-header3 third-home">
          <h2>Modularise and Customise</h2>
          <h3 className="home-info-text">
            Leverage OPUS's DITA architecture. Build documents out of texts and
            update all documents at once by editing a single text.
          </h3>
          <img src={MissingPiece} height="200" alt="jigsaw puzzle" />
        </div>
        <div className="home-header2">
          <h2>Powerfully Simple</h2>
          <p>Screenshots showing it done</p>
        </div>
      </div>
      <div className="home-header5"></div>
    </>
  );
}
export default Home;
