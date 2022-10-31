import CodeExample from "../../images/codeExample.png";
import WebExample from "../../images/publish2.png";
import DocExample from "../../images/document.png";

function Home() {
  return (
    <>
      <div className="home-header">
        <h1>OPUS</h1>
        <p>A docs-as-code manager without the code</p>
      </div>
      <div className="home-header2">
        <h2>Write, Convert, Publish</h2>
        <h3 className="home-info-text">
          OPUS's text editor is incredible for web writing. Clean. Simple.
          Intuitive. Write in plain text and convert to code in seconds. Publish
          the text code on the web with the click of a button.
        </h3>
        <div className="home-images">
          <span>
            <p>Just write...</p>
            <img src={DocExample} width="400" height="350" />
          </span>
          <span>
            <p>...convert to code...</p>
            <img src={CodeExample} width="400" height="238" />
          </span>
          <span>
            <p>...and publish!</p>
            <img src={WebExample} width="400" height="306" />
          </span>
        </div>
      </div>
      <div className="home-header3">
        <h2>Modularise and Customise</h2>
      </div>
      <div className="home-header4">
        <h2>Powerfully simple</h2>
        <p>Screenshots showing it done</p>
      </div>
      <div className="home-header5"></div>
    </>
  );
}
export default Home;
