import "./style.css";
import ComponenetSidebar from "./ComponentSidebar";
import TextEditor from "./TextEditor";

function Index() {
  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <ComponenetSidebar />
        </div>
        <div className="main-text-editor">
          <div className="text-editor">
            <TextEditor />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
