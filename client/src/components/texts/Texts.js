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
        if (index < 10) {
          return (
            <>
              <div className="component-search-card" key={index}>
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
        }
      })}
    </div>
  ) : (
    <div>
      {lastUpdated.map(function (k, index) {
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
      })}
    </div>
  );

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-items">
            {componentsFromBackend.map(function (l, index) {
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
            })}
          </div>
        </div>
        <div className="main-display">
          <div className="search-box">
            <input
              type="text"
              onChange={handleSearchTerm}
              value={searchTerm}
              className="search-input"
            />
            {searchResult ? (
              <button onClick={handleClear}>Clear</button>
            ) : (
              <input type="submit" onClick={handleSearch} />
            )}
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
            {textComponents}
            <div>
              {/*
              {selectedView
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
                  })}
                */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Texts;
