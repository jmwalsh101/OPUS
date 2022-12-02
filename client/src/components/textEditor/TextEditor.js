import React, { useState, useEffect, useContext } from "react";

import { Editor, EditorState, RichUtils } from "draft-js";
import { clearEditorContent } from "draftjs-utils";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "draft-js/dist/Draft.css";

import ErrorModal from "../modals/ErrorModal";
import LoadingModal from "../modals/LoadingModal";
import SuccessModal from "../modals/SuccessModal";
import BackendErrorModal from "../modals/BackendErrorModal";
import ConfirmModal from "../modals/ConfirmModal";

import _ from "lodash";

import {
  backendComponentsContext,
  componentIdContext,
  componentCategoryContext,
} from "../../contexts/ComponentContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faB } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

import { timestamp } from "../constants/TimeStamp";
import MetaInfo from "./MetaInfo";

function TextEditor() {
  const { componentsFromBackend, setComponentsFromBackend } = useContext(
    backendComponentsContext
  );

  const { optionState, setOptionState } = useContext(componentCategoryContext);
  console.log("os", optionState);

  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [name, setName] = useState("");
  const editor = React.useRef(null);
  const [componentId, setComponentId] = useState(1);
  console.log("CI", componentId);
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

  const [author, setAuthor] = useState(
    JSON.parse(sessionStorage.getItem("username")).registerUsername
  );

  const [createDate, setCreateDate] = useState(timestamp);

  const [updater, setUpdater] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [category, setCategory] = useState(null);

  function handleCategory(e) {
    e.preventDefault();
    setCategory(e.target.value);
    console.log("os target", e.target.value);
    setOptionState(e.target.value);
  }

  function handleConfirmUpdateModalClose() {
    const html = convertToHTML(editorState.getCurrentContent());
    const updateComponent = [
      {
        id: componentId,
        name: name,
        content: html,
        category: category,
        author: author,
        created: createDate,
        updater: JSON.parse(sessionStorage.getItem("username"))
          .registerUsername,
        lastUpdated: timestamp,
      },
    ];

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
          setCreateDate(timestamp);
          setAuthor(
            JSON.parse(sessionStorage.getItem("username")).registerUsername
          );
          setUpdater("");
          setLastUpdated("");
          setCategory("");
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
      body: JSON.stringify({ componentId }),
    })
      .then((response) => {
        response.json();
        setShowLoading(false);
        if (response.ok) {
          showSuccessModal(true);
          setTimeout(() => showSuccessModal(false), 1000);
          setName("");
          setEditorState(clearEditorContent(editorState));
          setAuthor();
          setCreateDate(timestamp);
          setUpdater("");
          setLastUpdated("");
          setCategory("");
          setComponentSelected(false);
          setOptionState("Volvo");
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
    // this is extra long and doubled-up because I couldn't find a way of preserving state, getting the useEffect to run for componentsFromBack in time to manage the transtion of Edit in Texts to showing that component's details in Text Editor
    if (backendComponentId) {
      let components = componentsFromBackend;

      if (!componentsFromBackend.length) {
        fetch("/component-load")
          .then((response) => response.json())
          .then((data) => {
            setComponentsFromBackend(data);
            components = data;

            const selectedComponent = _.find(components, {
              id: backendComponentId,
            });

            const selectedName = selectedComponent.name;
            const selectedAuthor = selectedComponent.author;
            const selectedContent = convertFromHTML(selectedComponent.content);
            const selectedTimestamp = selectedComponent.created;
            let selectedUpdater = selectedComponent.updater;
            let selectedLastUpdate = selectedComponent.lastUpdated;
            const selectedCategory = selectedComponent.category;

            if (selectedUpdater === undefined || selectedUpdater === null) {
              selectedUpdater = "";
            }

            if (
              selectedLastUpdate === undefined ||
              selectedLastUpdate === null
            ) {
              selectedLastUpdate = "";
            }

            setComponentSelected(true);
            console.log("1A", backendComponentId);
            setComponentId(backendComponentId);
            setName(selectedName);
            setAuthor(selectedAuthor);
            setCreateDate(selectedTimestamp);
            setEditorState(EditorState.createWithContent(selectedContent));
            setUpdater(selectedUpdater);
            setLastUpdated(selectedLastUpdate);
            setCategory(selectedCategory);
            setOptionState(selectedCategory);
          }) // fail error modal here
          .catch((error) => console.log("ERROR"));
      }

      if (components.length) {
        const selectedComponent = _.find(components, {
          id: backendComponentId,
        });
        const selectedName = selectedComponent.name;
        const selectedAuthor = selectedComponent.author;
        const selectedContent = convertFromHTML(selectedComponent.content);
        const selectedTimestamp = selectedComponent.created;
        let selectedUpdater = selectedComponent.updater;
        let selectedLastUpdate = selectedComponent.lastUpdated;
        const selectedCategory = selectedComponent.category;

        if (selectedUpdater === undefined || selectedUpdater === null) {
          selectedUpdater = "";
        }

        if (selectedLastUpdate === undefined || selectedLastUpdate === null) {
          selectedLastUpdate = "";
        }

        setComponentSelected(true);
        console.log("1B", backendComponentId);
        setComponentId(backendComponentId);
        setName(selectedName);
        setAuthor(selectedAuthor);
        setCreateDate(selectedTimestamp);
        setEditorState(EditorState.createWithContent(selectedContent));
        setUpdater(selectedUpdater);
        setLastUpdated(selectedLastUpdate);
        setCategory(selectedCategory);
        setOptionState(selectedCategory);
      }
    }
  }, [backendComponentId]);

  // This provides the correct ID for a new text. It does not use componentsFromBackend.length because due to the deletion of components that could lead to duplicates. Instead it takes the ID of the last submitted component.

  // The problem with this is if the last component gets deleted. There probably should be a separate database store for counts. Can implement later.
  useEffect(() => {
    if (componentSelected === false) {
      fetch("/textId-load")
        .then((response) => response.json())
        .then((data) => {
          console.log("id call", data[0].idCount);
          setComponentId(data[0].idCount + 1);
        })
        .catch((error) => console.log("ERROR"));
    }
  }, [name]);

  function focusEditor() {
    editor.current.focus();
  }

  function handleClear(e) {
    e.preventDefault();
    setName("");
    setEditorState(clearEditorContent(editorState));
    setComponentSelected(false);
    setAuthor(JSON.parse(sessionStorage.getItem("username")).registerUsername);
    setCreateDate(timestamp);
    setUpdater("");
    setLastUpdated("");
    setCategory("");
    setBackendComponentId();
    setOptionState("Volvo");
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
    } else if (existingName) {
      setShowLoading(false);
      setExistingNameModal(true);
    } else {
      const html = convertToHTML(editorState.getCurrentContent());
      const newComponent = [
        {
          id: componentId,
          name: name,
          content: html,
          category: category,
          author: author,
          created: createDate,
          updater: null,
          lastUpdated: null,
        },
      ];
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
            setAuthor(
              JSON.parse(sessionStorage.getItem("username")).registerUsername
            );
            setCreateDate(timestamp);
            setUpdater("");
            setLastUpdated("");
            setCategory("");
            setComponentSelected(false);
            setOptionState("Volvo");
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
            key={type.label}
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
            key={type.label}
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
              key={type.label}
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
      <div className="editor-container-overview">
        <div className="editor-container">
          <div className="component-actions">
            <div className="component-actions1">
              <span className="component-action">
                <p>Name</p>&nbsp;&nbsp;
                <input
                  id="name"
                  type="text"
                  onChange={handleSaveName}
                  value={name}
                />
              </span>
              <span className="component-action">
                <p>Category</p>&nbsp;&nbsp;
                <select
                  name="cars"
                  id="category"
                  onChange={handleCategory}
                  className="category-input"
                  value={optionState}
                >
                  <option value=""></option>
                  <option value="Volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
              <span className="component-action">
                <p>ID</p>&nbsp;&nbsp;
                <input
                  type="text"
                  readOnly="readonly"
                  value={componentId}
                  className="id-input"
                />
              </span>
            </div>
            <div className="component-actions2">
              <input
                type="submit"
                value="Clear"
                onClick={handleClear}
                className="caution"
              />
              <input
                id="delete"
                type="submit"
                value="Delete"
                onClick={handleDelete}
                className="warning"
              />
              <input id="submit" type="submit" onClick={handleSubmit} />
            </div>
          </div>
          <div className="draft-editor">
            <div onClick={focusEditor}>
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
                      Deleting a text will also delete it from any documents
                      using it.
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
                      A text named <strong>{name}</strong> already exists. You
                      can update this text with your changes.
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
        <div className="component-manager">
          <MetaInfo
            author={author}
            createDate={createDate}
            updater={updater}
            lastUpdated={lastUpdated}
          />
        </div>
      </div>
    </>
  );
}

export default TextEditor;
