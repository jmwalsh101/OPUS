import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { componentIdContext } from "../../contexts/ComponentContext";

function Texts() {
  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [componentsFromBackend, setComponentsFromBackend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchContentResults, setSearchContentResults] = useState("");
  const [searchNameResults, setSearchNameResults] = useState("");
  const [selectedComponent, setSelectedComponent] = useState();
  const [lastUpdated, setLastUpdated] = useState([]);
  const [recentlyCreated, setRecentlyCreated] = useState([]);

  const navigate = useNavigate();
  const allComponents = _.cloneDeep(componentsFromBackend);
  const createdComponents = _.cloneDeep(componentsFromBackend);
  const [selectedView, setSelectedView] = useState(true);

  // sidebar categories

  const category1 = _.filter(componentsFromBackend, {
    category: "volvo",
  });
  const category2 = _.filter(componentsFromBackend, {
    category: "saab",
  });
  const category3 = _.filter(componentsFromBackend, {
    category: "mercedes",
  });
  const category4 = _.filter(componentsFromBackend, {
    category: "audi",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

  function handleLastUpdatedView(e) {
    e.preventDefault();
    setSelectedView(false);
  }

  function handleLastCreatedView(e) {
    e.preventDefault();
    setSelectedView(true);
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
  }, [componentsFromBackend]);

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
    console.log("target", e.target.value);
    e.preventDefault();
    const id = parseInt(e.target.value);
    const item = _.find(componentsFromBackend, { id: id });
    console.log("target", id, componentsFromBackend);

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
    //navigate("/");
  }

  /*

  const componentView = selectedView
    ? recentlyCreated.map(function (k, index) {
        return (
          <>
            <div className="component-search-card">
              <h3>{k.name}</h3>
              <p>{k.lastUpdated}</p>
              <span
                dangerouslySetInnerHTML={{
                  __html: k.content,
                }}
              />
              <button value={k.id} onClick={handleSelect}>
                View
              </button>
            </div>
          </>
        );
      })
    : lastUpdated.map(function (k, index) {
        return (
          <>
            <div className="component-search-card">
              <h3>{k.name}</h3>
              <p>{k.lastUpdated}</p>
              <span
                dangerouslySetInnerHTML={{
                  __html: k.content,
                }}
              />
              <button value={k.id} onClick={handleSelect}>
                View
              </button>
            </div>
          </>
        );
      });

      */

  var textComponents = selectedView ? (
    <div>
      {recentlyCreated.map(function (k, index) {
        if (index < 5) {
          return (
            <>
              <div className="recent-card" key={index}>
                <div className="recent-card-details">
                  <h3>{k.name}</h3>
                  <p>{k.author}</p>
                  <p>{k.created}</p>
                  <button value={k.id} onClick={handleSelect}>
                    View
                  </button>
                </div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: k.content,
                  }}
                />
              </div>
            </>
          );
        }
      })}
    </div>
  ) : (
    <div>
      {lastUpdated.map(function (k, index) {
        if (index < 5) {
          return (
            <>
              <div className="recent-card" key={index}>
                <div className="recent-card-details">
                  <h3>{k.name}</h3>
                  <p>{k.updater}</p>
                  <p>{k.lastUpdated}</p>
                  <button value={k.id} onClick={handleSelect}>
                    View
                  </button>
                </div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: k.content,
                  }}
                />
              </div>
            </>
          );
        }
      })}
    </div>
  );

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-categories">
            <h3>Quick Access</h3>
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
              Volvo
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
              Saab
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
              Mercedes
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
              Audi
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
                <button onClick={handleClear}>Clear</button>
              ) : (
                <input type="submit" onClick={handleSearch} />
              )}
            </div>
          </div>
          {searchResult ? (
            <div className="search-result-container">
              <h3>Names</h3>
              {searchNameResults.length
                ? searchNameResults.map(function (k, index) {
                    return (
                      <>
                        <div className="component-search-card">
                          <h3>{k.name}</h3>
                          <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: k.content }}
                          />
                          <button value={k.id} onClick={handleSelect}>
                            View
                          </button>
                        </div>
                      </>
                    );
                  })
                : "No results founds."}
              <h3>Content</h3>
              {searchContentResults.length
                ? searchContentResults.map(function (k, index) {
                    return (
                      <>
                        <div className="component-search-card">
                          <h3>{k.name}</h3>
                          <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: k.content }}
                          />
                          <button value={k.id} onClick={handleSelect}>
                            View
                          </button>
                        </div>
                      </>
                    );
                  })
                : "No results found."}
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
                <div>
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
        <div className="sidebar-items">
          <div className="recently-updated">
            <button onClick={handleLastCreatedView}>Recently Created</button>
            <button onClick={handleLastUpdatedView}>Recently Updated</button>
            <div className="text-components">{textComponents}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Texts;
