import { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { componentIdContext } from "../../contexts/ComponentContext";

function Texts() {
  const { setBackendComponentId } = useContext(componentIdContext);

  const [componentsFromBackend, setComponentsFromBackend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchContentResults, setSearchContentResults] = useState("");
  const [searchNameResults, setSearchNameResults] = useState("");
  const [selectedComponent, setSelectedComponent] = useState();
  const [lastUpdated, setLastUpdated] = useState([]);
  const [recentlyCreated, setRecentlyCreated] = useState([]);

  const allComponents = _.cloneDeep(componentsFromBackend);
  const createdComponents = _.cloneDeep(componentsFromBackend);
  const [selectedView, setSelectedView] = useState(true);

  const [activeTab, setActiveTab] = useState("Recently Created");

  // sidebar categories

  const category1 = _.filter(componentsFromBackend, {
    category: "Intro",
  });
  const category2 = _.filter(componentsFromBackend, {
    category: "Main",
  });
  const category3 = _.filter(componentsFromBackend, {
    category: "End",
  });
  const category4 = _.filter(componentsFromBackend, {
    category: "Supplementary",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

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

  useEffect(() => {
    const lastUpdatedPrep = _.remove(allComponents, function (n) {
      return n.lastUpdated != null;
    });
    const lastUpdatedResult = lastUpdatedPrep.sort(function (a, b) {
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });

    const lastCreated = createdComponents.sort(function (a, b) {
      return b.created.localeCompare(a.created);
    });

    setLastUpdated(lastUpdatedResult);
    setRecentlyCreated(lastCreated);
  }, [componentsFromBackend, allComponents, createdComponents]);

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setComponentsFromBackend(data);
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }, [componentsFromBackend]);

  function handleSearchTerm(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (e.target.value === null) {
      setSearchContentResults("");
      setSearchNameResults("");
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    if (searchTerm) {
      setSearchNameResults(
        componentsFromBackend.filter((comp) => comp.name.includes(searchTerm))
      );
      setSearchContentResults(
        componentsFromBackend.filter((comp) =>
          comp.content.includes(searchTerm)
        )
      );
      setSearchResult(true);
    }
  }

  function handleSelect(e) {
    e.preventDefault();
    const id = e.target.value;
    const item = _.find(componentsFromBackend, { id: id });

    setSelectedComponent(item);
    setSearchContentResults("");
    setSearchNameResults("");
    setSearchTerm("");
  }

  function handleClear(e) {
    e.preventDefault();
    setSearchTerm("");
    setSearchContentResults("");
    setSearchNameResults("");
    setSearchResult(false);
  }

  function handleEdit(e) {
    const id = e.target.value;
    setBackendComponentId(id);
    sessionStorage.setItem("activePage", "editor");
  }

  var textComponents = selectedView ? (
    <table>
      <tbody>
        {recentlyCreated.map(function (k, index) {
          if (index < 5) {
            return (
              <tr key={index}>
                <td>
                  <h4>{k.name}</h4>
                </td>
                <td>
                  <p>{k.author}</p>
                </td>
                <td>
                  <p>{k.created}</p>
                </td>
                <td>
                  <button value={k.id} onClick={handleSelect}>
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
    <table>
      <tbody>
        {lastUpdated.map(function (k, index) {
          if (index < 5) {
            return (
              <tr key={index}>
                <td>
                  <h4>{k.name}</h4>
                </td>
                <td>
                  <p>{k.updater}</p>
                </td>
                <td>
                  <p>{k.lastUpdated}</p>
                </td>
                <td>
                  <button value={k.id} onClick={handleSelect}>
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
  );

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-categories">
            <div className="sidebar-header">
              <h3>Texts</h3>
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
                              <p>{l.name}</p>
                              <p>{l.category}</p>
                              <button onClick={handleSelect} value={l.id}>
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
                              <p>{l.name}</p>
                              <p>{l.category}</p>
                              <button onClick={handleSelect} value={l.id}>
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
                              <p>{l.name}</p>
                              <p>{l.category}</p>
                              <button onClick={handleSelect} value={l.id}>
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
                              <p>{l.name}</p>
                              <p>{l.category}</p>
                              <button onClick={handleSelect} value={l.id}>
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
                placeholder="Search texts"
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
                          <h4>{k.name}</h4>

                          <button value={k.id} onClick={handleSelect}>
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
                          <h4>{k.name}</h4>
                          <button value={k.id} onClick={handleSelect}>
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
                <h2>{selectedComponent?.name}</h2>
                <Link to="/text-editor">
                  <button value={selectedComponent?.id} onClick={handleEdit}>
                    Edit
                  </button>
                </Link>
              </div>
              <>
                <div className="text-box-content">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedComponent?.content,
                    }}
                  />
                </div>
              </>
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
            <div className="text-components">{textComponents}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Texts;
