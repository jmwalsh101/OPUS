import React, { useState, useEffect, useContext } from "react";

import { Editor, EditorState, RichUtils } from "draft-js";
import { clearEditorContent } from "draftjs-utils";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "./draft.css";
import "../style.css";

import ErrorModal from "../modals/ErrorModal";
import LoadingModal from "../modals/LoadingModal";
import SuccessModal from "../modals/SuccessModal";
import BackendErrorModal from "../modals/BackendErrorModal";
import ConfirmModal from "../modals/ConfirmModal";

import _ from "lodash";

import { backendComponentsContext } from "../../contexts/ComponentContext";
import { componentIdContext } from "../../contexts/ComponentContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faB } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

function TextEditor() {
  const { componentsFromBackend, setComponentsFromBackend } = useContext(
    backendComponentsContext
  );

  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [name, setName] = useState("");
  const editor = React.useRef(null);
  const [componentId, setComponentId] = useState(0);
  const [componentSelected, setComponentSelected] = useState(false);

  const [errorModal, setErrorModal] = useState(false);
  const handleClose = () => setErrorModal(false);
  const handleExistingName = () => setExistingNameModal(false);
  const [successModal, showSuccessModal] = useState(false);
  const [existingNameModal, setExistingNameModal] = useState(false);
  const [backendErrorModal, setBackendErrorModal] = useState(false);

  const [loadingModal, setShowLoading] = useState(false);

  //
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmUpdateModal, setConfirmUpdateModal] = useState(false);

  function handleConfirmUpdateModalClose() {
    const html = convertToHTML(editorState.getCurrentContent());
    const updateComponent = [{ id: componentId, name: name, content: html }];

    // need something to prevent submit if no changes

    fetch("/component-update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: updateComponent }),
    })
      .then((response) => {
        response.json();
        setShowLoading(false);
        if (response.ok) {
          showSuccessModal(true);
          setTimeout(() => showSuccessModal(false), 1000);
          setComponentSelected(false);
          setBackendComponentId();
          setName("");
          setEditorState(clearEditorContent(editorState));
          setConfirmUpdateModal(false);
        }
        //else for modal
      })
      .catch((error) => {
        setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }

  function handleConfirmModalClose() {
    setConfirmModal(false);
    setShowLoading(true);

    fetch("/component-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: componentId }),
    })
      .then((response) => {
        response.json();
        setShowLoading(false);
        if (response.ok) {
          showSuccessModal(true);
          setTimeout(() => showSuccessModal(false), 1000);
          setName("");
          setEditorState(clearEditorContent(editorState));
        }
        //else for modal
      })

      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  function handleCancel() {
    setConfirmModal(false);
    setConfirmUpdateModal(false);
  }

  function handleDelete(e) {
    e.preventDefault();
    if (editorState.getCurrentContent().hasText()) {
      setConfirmModal(true);
    } else {
      // error modal or disabled button
    }
  }

  //

  useEffect(() => {
    if (backendComponentId) {
      const convertedId = parseInt(backendComponentId);
      const selectedComponent = _.find(componentsFromBackend, {
        id: convertedId,
      });

      const selectedName = selectedComponent.name;
      const selectedContent = convertFromHTML(selectedComponent.content);

      /*}
      const contentState = ContentState.createFromBlockArray(
        selectedContent.contentBlocks,
        selectedContent.entityMap
      );
      */
      setComponentSelected(true);
      setComponentId(convertedId);
      setName(selectedName);
      setEditorState(EditorState.createWithContent(selectedContent));
    }
  }, [backendComponentId]);

  useEffect(() => {
    fetch("/component-id")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (componentSelected === false) {
          setComponentId(parseInt(data) + 1);
        }
      })
      .catch((error) => {
        setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }, [name]);

  function focusEditor() {
    editor.current.focus();
  }

  function handleClear(e) {
    e.preventDefault();
    setName("");
    setEditorState(clearEditorContent(editorState));
    setComponentSelected(false);
  }

  function handleSaveName(e) {
    e.preventDefault();
    setName(e.target.value);
    setComponentSelected(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const existingName = _.find(componentsFromBackend, { name: name });
    setShowLoading(true);

    if (name === "" || !editorState.getCurrentContent().hasText()) {
      setShowLoading(false);
      setErrorModal(true);
    } else if (componentSelected === true) {
      setShowLoading(false);
      setConfirmUpdateModal(true);

      // CONFIRM MODAL REQUIRED
    } else if (existingName) {
      setShowLoading(false);
      setExistingNameModal(true);
    } else {
      const html = convertToHTML(editorState.getCurrentContent());
      const newComponent = [{ id: componentId, name: name, content: html }];
      fetch("/component-new", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ parcel: newComponent }),
      })
        .then((response) => {
          response.json();
          setShowLoading(false);
          if (response.ok) {
            showSuccessModal(true);
            setTimeout(() => showSuccessModal(false), 1000);
            setName("");
            setEditorState(clearEditorContent(editorState));
          } else {
            setShowLoading(false);
          }
          //else for modal
        })
        .catch((error) => {
          setShowLoading(false);
          setTimeout(() => setBackendErrorModal(true), 3000);
        });
    }
  }

  useEffect(() => {
    focusEditor();
  }, []);

  const StyleButton = (props) => {
    let onClickButton = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return (
      <button
        className="RichEditor-controls RichEditor-styleButton RichEditor-activeButton"
        onMouseDown={onClickButton}
      >
        {props.label}
      </button>
    );
  };

  const HEADER_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
  ];

  const HeaderStyleControls = (props) => {
    return (
      <div>
        {HEADER_TYPES.map((type) => (
          <StyleButton
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const LIST_TYPES = [
    { label: "Blockquote", style: "blockquote" },
    { label: <FontAwesomeIcon icon={faCode} />, style: "code-block" },
    {
      label: (
        <>
          <FontAwesomeIcon icon={faQuoteLeft} />{" "}
          <FontAwesomeIcon icon={faQuoteRight} />
        </>
      ),
      style: "CODE",
    },
  ];

  const ListStyleControls = (props) => {
    return (
      <div>
        {LIST_TYPES.map((type) => (
          <StyleButton
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: <FontAwesomeIcon icon={faB} />, style: "BOLD" },
    { label: <FontAwesomeIcon icon={faItalic} />, style: "ITALIC" },
    { label: <FontAwesomeIcon icon={faUnderline} />, style: "UNDERLINE" },
    {
      label: <FontAwesomeIcon icon={faListUl} />,
      style: "unordered-list-item",
    },
    { label: <FontAwesomeIcon icon={faListOl} />, style: "ordered-list-item" },
  ];
  const InlineStyleControls = (props) => {
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <>
            <StyleButton
              // key={type.label}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          </>
        ))}
      </div>
    );
  };

  const onInlineClick = (e) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(nextState);
  };

  const onBlockClick = (e) => {
    let nextState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(nextState);
  };

  return (
    <>
      <div className="main">
        <h1>Component Editor</h1>
        <p>
          Create a new component for your documents. Add new components to
          documents in the Document Creator.
        </p>
        <div className="component-actions">
          <span>
            <p>Name</p>
            <input type="text" onChange={handleSaveName} value={name} />
          </span>
          <span>
            <p>Category</p>
            <input type="text" />
          </span>
          <span>
            <p>ID</p>
            <input type="text" readOnly="readonly" value={componentId} />
          </span>
          <span>
            <p>Created By</p>
            <input
              type="text"
              readOnly="readonly"
              value={
                JSON.parse(sessionStorage.getItem("username")).registerUsername
              }
            />
          </span>
          <span>
            <p>Created On</p>
            <input type="text" readOnly="readonly" />
          </span>
          <span>
            <p>Last Updated By</p>
            <input type="text" readOnly="readonly" />
          </span>
          <span>
            <p>Updated On</p>
            <input type="text" readOnly="readonly" />
          </span>
          <span>
            <input type="submit" value="Clear" onClick={handleClear} />
          </span>
          <span>
            <input type="submit" onClick={handleSubmit} />
          </span>
          <span>
            <input type="submit" value="Delete" onClick={handleDelete} />
          </span>
        </div>
        <div onClick={focusEditor}>
          <h3>Content</h3>
          <div className="controls">
            <span className="control-set">
              <HeaderStyleControls onToggle={onBlockClick} />
            </span>
            <span className="control-set">
              <InlineStyleControls onToggle={onInlineClick} />
            </span>
            <span className="control-set">
              <ListStyleControls onToggle={onInlineClick} />
            </span>
          </div>

          <div className="text-box">
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={(editorState) => setEditorState(editorState)}
            />
          </div>
        </div>
        {errorModal ? (
          <ErrorModal
            show={errorModal}
            onClose={handleClose}
            message="You must enter a name and a text."
          />
        ) : null}
        {existingNameModal ? (
          <ErrorModal
            show={errorModal}
            onClose={handleExistingName}
            message="A name already exists."
          />
        ) : null}
        {loadingModal ? (
          <>
            <LoadingModal />
          </>
        ) : null}
        {successModal ? <SuccessModal message="Component created!" /> : null}
        {backendErrorModal ? <BackendErrorModal /> : null}
        {confirmModal ? (
          <>
            <ConfirmModal
              show={confirmModal}
              onClose={handleConfirmModalClose}
              cancel={handleCancel}
              confirmButton="Delete"
              message={
                <>
                  <p>
                    This action will delete <strong>{name}</strong> and cannot
                    be reversed.
                  </p>
                  <p>
                    Deleting a text will also delete it from any documents using
                    it.
                  </p>
                </>
              }
            />
          </>
        ) : null}
        {confirmUpdateModal ? (
          <>
            <ConfirmModal
              show={confirmModal}
              onClose={handleConfirmUpdateModalClose}
              cancel={handleCancel}
              confirmButton="Update"
              message={
                <>
                  <p>
                    A text named <strong>{name}</strong> already exists. You can
                    update this text with your changes.
                  </p>
                  <p>
                    Any updates you make will affect all documents with this
                    text.
                  </p>
                </>
              }
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default TextEditor;
