import { useState, useEffect } from "react";
import _ from "lodash";

import ErrorModal from "../modals/ErrorModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Documents() {
  const [documentsFromBackend, setDocumentsFromBackend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchContentResults, setSearchContentResults] = useState([]);
  const [searchNameResults, setSearchNameResults] = useState("");
  const [backendData, setBackendData] = useState([]);
  const [usedComponents, setUsedComponents] = useState([]);

  const [docTitle, setDocTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updater, setUpdater] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeTab, setActiveTab] = useState("Recently Created");
  const [errorModal, setErrorModal] = useState(false);
  const handleClose = () => setErrorModal(false);

  // search

  function handleSearch(e) {
    e.preventDefault();

    if (searchTerm) {
      setSearchNameResults(
        documentsFromBackend.filter((doc) => doc.title.includes(searchTerm))
      );
      const docResults = [];
      for (const document of documentsFromBackend) {
        const componentIds = document.content;

        fetch("/component-load")
          .then((response) => response.json())
          .then((data) => {
            const fetchedComponents = data;

            for (const i of componentIds) {
              const item = _.find(fetchedComponents, { id: i });
              if (item.content.includes(searchTerm)) {
                docResults.push(document.title);
              }
            }
            setSearchContentResults(_.uniq(docResults));
            setSearchResult(true);
          })
          .catch((error) => {
            return (
              <ErrorModal
                show={errorModal}
                onClose={handleClose}
                message="Error Retrieving Results"
              />
            );
          });
      }
    }
  }

  // Select
  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  //new select function required for Search
  function handleSearchSelect(e) {
    e.preventDefault();

    const item = _.find(documentsFromBackend, { title: e.target.value });

    const title = item.title;
    const docAuthor = item.author;
    const docCreated = item.createDate;
    let docUpdater = item.updater;
    let docLastUpdated = item.lastUpdated;
    const componentIds = item.content;

    if (docUpdater === undefined || docUpdater === null) {
      docUpdater = "";
    }

    if (docLastUpdated === undefined || docLastUpdated === null) {
      docLastUpdated = "";
    }

    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        const fetchedComponents = data;
        let component = [];

        for (const i of componentIds) {
          const item = _.find(fetchedComponents, { id: i });
          component.push(item);
        }
        if (component[0] !== undefined) {
          setUsedComponents(component);
        } else {
          setUsedComponents([]);
        }
        setDocTitle(title);
        setAuthor(docAuthor);
        setCreateDate(docCreated);
        setUpdater(docUpdater);
        setLastUpdated(docLastUpdated);
        setSearchContentResults([]);
        setSearchNameResults([]);
        setSearchResult(false);
        setSearchTerm("");
      })
      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  function handleSelect(e) {
    setLastUpdated();
    setUpdater();
    e.preventDefault();
    let item = Object.values({ ...e.target });
    let selectedItem = item[1];

    const title = selectedItem.title;
    const docAuthor = selectedItem.author;
    const docCreated = selectedItem.createDate;
    let docUpdater = selectedItem.updater;
    let docLastUpdated = selectedItem.lastUpdated;
    const componentIds = selectedItem.content;

    if (docUpdater === undefined || docUpdater === null) {
      docUpdater = "";
    }

    if (docLastUpdated === undefined || docLastUpdated === null) {
      docLastUpdated = "";
    }

    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        const fetchedComponents = data;
        let component = [];

        for (const i of componentIds) {
          const item = _.find(fetchedComponents, { id: i });
          component.push(item);
        }
        if (component[0] !== undefined) {
          setUsedComponents(component);
        } else {
          setUsedComponents([]);
        }
        setDocTitle(title);
        setAuthor(docAuthor);
        setCreateDate(docCreated);
        setUpdater(docUpdater);
        setLastUpdated(docLastUpdated);
      })
      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  // Search

  function handleClear(e) {
    e.preventDefault();
    setSearchTerm("");
    setSearchContentResults("");
    setSearchNameResults("");
    setSearchResult(false);
  }

  function handleSearchTerm(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (e.target.value === null) {
      setSearchContentResults("");
      setSearchNameResults("");
    }
  }

  useEffect(() => {
    fetch("/documents-load")
      .then((response) => response.json())
      .then((data) => {
        setDocumentsFromBackend(data);
      })
      .catch((error) => {
        // setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }, []);

  // For View Tabs
  const allDocuments = _.cloneDeep(documentsFromBackend);
  const createdDocuments = _.cloneDeep(documentsFromBackend);
  const [recentlyCreated, setRecentlyCreated] = useState([]);
  const [selectedView, setSelectedView] = useState(true);

  useEffect(() => {
    const lastUpdatedPrep = _.remove(allDocuments, function (n) {
      return n.lastUpdated != null;
    });
    const lastUpdatedResult = lastUpdatedPrep.sort(function (a, b) {
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });

    const lastCreated = createdDocuments.sort(function (a, b) {
      return b.created.localeCompare(a.created);
    });

    setLastUpdated(lastUpdatedResult);
    setRecentlyCreated(lastCreated);
  }, [allDocuments, createdDocuments, documentsFromBackend]);

  var documentsView = selectedView ? (
    <table>
      <tbody>
        {recentlyCreated.map(function (k, index) {
          if (index < 5) {
            return (
              <tr key={index}>
                <td>
                  <h4>{k.title}</h4>
                </td>
                <td>
                  <p>{k.author}</p>
                </td>
                <td>
                  <p>{k.created}</p>
                </td>
                <td>
                  <button
                    title={k.title}
                    author={k.author}
                    content={k.content}
                    createDate={k.created}
                    updater={k.updater}
                    lastUpdated={k.updated}
                    onClick={handleSelect}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          } else {
            return null;
          }
        })}
      </tbody>
    </table>
  ) : (
    <div>
      {lastUpdated.map(function (k, index) {
        if (index < 5) {
          return (
            <tr key={index}>
              <td>
                <h4>{k.title}</h4>
              </td>
              <td>
                <p>{k.updater}</p>
              </td>
              <td>
                <p>{k.lastUpdated}</p>
              </td>
              <td>
                <button
                  title={k.title}
                  author={k.author}
                  content={k.content}
                  createDate={k.created}
                  updater={k.updater}
                  lastUpdated={k.updated}
                  onClick={handleSelect}
                >
                  View
                </button>
              </td>
            </tr>
          );
        } else {
          return null;
        }
      })}
    </div>
  );

  function handleLastUpdatedView(e) {
    e.preventDefault();
    setSelectedView(false);
    setActiveTab("Recently Updated");
  }

  function handleLastCreatedView(e) {
    e.preventDefault();
    setSelectedView(true);
    setActiveTab("Recently Created");
  }

  const category1 = _.filter(documentsFromBackend, {
    category: "Intro",
  });
  const category2 = _.filter(documentsFromBackend, {
    category: "Main",
  });
  const category3 = _.filter(documentsFromBackend, {
    category: "End",
  });
  const category4 = _.filter(documentsFromBackend, {
    category: "Supplementary",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-categories">
            <div className="sidebar-header">
              <h3>Documents</h3>
            </div>

            {category1.length ? (
              <>
                <div
                  className="sidebar-category"
                  onClick={(e) => {
                    if (showCategory1 === false) {
                      setShowCategory1(true);
                    } else {
                      setShowCategory1(false);
                    }
                    e.currentTarget.classList.toggle("sidebar-category");
                    e.currentTarget.classList.toggle("sidebar-category-active");
                  }}
                >
                  Intro
                </div>
                <div className="sidebar-items">
                  {showCategory1
                    ? category1.map(function (l, index) {
                        return (
                          <>
                            <div key={index} className="sidebar-item">
                              <p>{l.title}</p>
                              <p>{l.category}</p>
                              <button
                                onClick={handleSelect}
                                title={l.title}
                                author={l.author}
                                content={l.content}
                                createDate={l.created}
                                updater={l.updater}
                                lastUpdated={l.updated}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRightToBracket}
                                  style={{ pointerEvents: "none" }}
                                />
                              </button>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>
              </>
            ) : null}

            {category2.length ? (
              <>
                <div
                  className="sidebar-category"
                  onClick={(e) => {
                    if (showCategory2 === false) {
                      setShowCategory2(true);
                    } else {
                      setShowCategory2(false);
                    }
                    e.currentTarget.classList.toggle("sidebar-category");
                    e.currentTarget.classList.toggle("sidebar-category-active");
                  }}
                >
                  Main
                </div>
                <div className="sidebar-items">
                  {showCategory2
                    ? category2.map(function (l, index) {
                        return (
                          <>
                            <div key={index} className="sidebar-item">
                              <p>{l.title}</p>
                              <p>{l.category}</p>
                              <button
                                onClick={handleSelect}
                                title={l.title}
                                author={l.author}
                                content={l.content}
                                createDate={l.created}
                                updater={l.updater}
                                lastUpdated={l.updated}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRightToBracket}
                                  style={{ pointerEvents: "none" }}
                                />
                              </button>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>
              </>
            ) : null}

            {category3.length ? (
              <>
                <div
                  className="sidebar-category"
                  onClick={(e) => {
                    if (showCategory3 === false) {
                      setShowCategory3(true);
                    } else {
                      setShowCategory3(false);
                    }
                    e.currentTarget.classList.toggle("sidebar-category");
                    e.currentTarget.classList.toggle("sidebar-category-active");
                  }}
                >
                  End
                </div>
                <div className="sidebar-items">
                  {showCategory3
                    ? category3.map(function (l, index) {
                        return (
                          <>
                            <div key={index} className="sidebar-item">
                              <p>{l.title}</p>
                              <p>{l.category}</p>
                              <button
                                onClick={handleSelect}
                                title={l.title}
                                author={l.author}
                                content={l.content}
                                createDate={l.created}
                                updater={l.updater}
                                lastUpdated={l.updated}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRightToBracket}
                                  style={{ pointerEvents: "none" }}
                                />
                              </button>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>
              </>
            ) : null}

            {category4.length ? (
              <>
                <div
                  className="sidebar-category"
                  onClick={(e) => {
                    if (showCategory4 === false) {
                      setShowCategory4(true);
                    } else {
                      setShowCategory4(false);
                    }
                    e.currentTarget.classList.toggle("sidebar-category");
                    e.currentTarget.classList.toggle("sidebar-category-active");
                  }}
                >
                  Supplementary
                </div>
                <div className="sidebar-items">
                  {showCategory4
                    ? category4.map(function (l, index) {
                        return (
                          <>
                            <div key={index} className="sidebar-item">
                              <p>{l.title}</p>
                              <p>{l.category}</p>
                              <button
                                onClick={handleSelect}
                                title={l.title}
                                author={l.author}
                                content={l.content}
                                createDate={l.created}
                                updater={l.updater}
                                lastUpdated={l.updated}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRightToBracket}
                                  style={{ pointerEvents: "none" }}
                                />
                              </button>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="main-display">
          <div className="search-box">
            <div className="search-box-contents">
              <input
                type="text"
                onChange={handleSearchTerm}
                value={searchTerm}
                className="search-input"
                placeholder="Search documents"
              />
              {searchResult ? (
                <button onClick={handleClear} className="caution">
                  Clear
                </button>
              ) : (
                <input type="submit" onClick={handleSearch} />
              )}
            </div>
          </div>
          {searchResult ? (
            <div className="search-result-container">
              <h3>Names</h3>
              <div className="component-search-card">
                {searchNameResults.length
                  ? searchNameResults.map(function (k, index) {
                      return (
                        <>
                          <h3 key={index}>{k.title}</h3>
                          <button value={k.title} onClick={handleSearchSelect}>
                            View
                          </button>
                        </>
                      );
                    })
                  : "No results founds."}
              </div>

              <h3>Content</h3>
              <div className="component-search-card">
                {searchContentResults.length
                  ? searchContentResults.map(function (k, index) {
                      return (
                        <>
                          <h4>{k}</h4>
                          <button value={k} onClick={handleSearchSelect}>
                            View
                          </button>
                        </>
                      );
                    })
                  : "No results found."}
              </div>
            </div>
          ) : null}
          <div className="text-box-container">
            <div className="texts-text-box">
              <div className="text-box-header">
                <h2>{docTitle}</h2>
              </div>
              <div className="text-box-content">
                {usedComponents.map(function (j, index) {
                  return (
                    <>
                      <div id={j.id}>
                        <h1>{j.title}</h1>
                        <span
                          key={index}
                          dangerouslySetInnerHTML={{ __html: j.content }}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="updated-created">
          <div className="recently-updated">
            <div className="texts-tabs">
              <button
                className={` ${
                  activeTab === "Recently Created" ? "active-tab" : "tab"
                }`}
                onClick={handleLastCreatedView}
              >
                Recently Created
              </button>
              &nbsp;&nbsp;
              <button
                className={` ${
                  activeTab === "Recently Updated" ? "active-tab" : "tab"
                }`}
                onClick={handleLastUpdatedView}
              >
                Recently Updated
              </button>
            </div>
            <div className="text-components">{documentsView}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Documents;
