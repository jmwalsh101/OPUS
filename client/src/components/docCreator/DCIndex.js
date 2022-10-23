import "./style.css";
import "../style.css";
import Sidebar from "./Sidebar";
import DocCreator from "./DocCreator";

function DCIndex() {
  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-doc-creator">
          <div className="doc-creator">
            <DocCreator />
          </div>
        </div>
      </div>
    </>
  );
}

export default DCIndex;
