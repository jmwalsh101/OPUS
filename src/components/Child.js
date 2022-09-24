import { ContentState, Editor, EditorState } from "draft-js";

function Child(props) {
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(props.data)
  );
  return (
    <div className="App">
      <Editor editorState={editorState} readOnly={true} />
    </div>

    /*
    <div>
      {data.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
    </div>
    */
  );
}

export default Child;
