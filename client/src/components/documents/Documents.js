import { useState, useEffect } from "react";
import _ from "lodash";

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

  // search

  function handleSearch(e) {
    e.preventDefault();
    console.log(searchTerm);

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
              const id = parseInt(i);
              const item = _.find(fetchedComponents, { id: id });
              if (item.content.includes(searchTerm)) {
                docResults.push(document.title);
              }
            }
            console.log("docs", JSON.stringify(docResults));
            console.log("final Result", _.uniq(docResults));
            setSearchContentResults(_.uniq(docResults));
            setSearchResult(true);
          })
          // fail error modal here
          .catch((error) => console.log("ERROR"));
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
  }, [backendData]);

  function handleSelect(e) {
    setLastUpdated();
    setUpdater();
    e.preventDefault();
    console.log("target", Object.values({ ...e.target }));
    let item = Object.values({ ...e.target });
    let selectedItem = item[1];
    console.log("target", selectedItem.lastUpdated);
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
          const id = parseInt(i);
          const item = _.find(fetchedComponents, { id: id });
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
        console.log("ld", docUpdater);
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
  }, [documentsFromBackend]);

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
  }, [documentsFromBackend]);

  var documentsView = selectedView ? (
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
                </div>
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
                  <button value={k.id}>View</button>
                </div>
              </div>
            </>
          );
        }
      })}
    </div>
  );

  function handleLastUpdatedView(e) {
    e.preventDefault();
    setSelectedView(false);
  }

  function handleLastCreatedView(e) {
    e.preventDefault();
    setSelectedView(true);
  }

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-categories">
            <h3>Quick Access</h3>
            {documentsFromBackend.map(function (q, index) {
              return (
                <>
                  <div key={index} className="sidebar-item">
                    <p>{q.title}</p>
                    <span>
                      <button
                        onClick={handleSelect}
                        title={q.title}
                        author={q.author}
                        content={q.content}
                        createDate={q.created}
                        updater={q.updater}
                        lastUpdated={q.updated}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRightToBracket}
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                    </span>
                  </div>
                  <div></div>
                </>
              );
            })}
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
                        <div className="component-search-card" key={index}>
                          <h3>{k.title}</h3>
                          <button value={k.id}>View</button>
                        </div>
                      </>
                    );
                  })
                : "No results founds."}
              <h3>Content</h3>
              {searchContentResults.length
                ? searchContentResults.map(function (k, index) {
                    console.log(k);
                    return (
                      <>
                        <div className="component-search-card">
                          <h3>{k}</h3>
                          <button value={k}>View</button>
                        </div>
                      </>
                    );
                  })
                : "No results found."}
            </div>
          ) : null}
          <div className="text-box-container">
            <div className="texts-text-box">
              <div className="text-box-header"></div>
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
        <div className="sidebar-items">
          <div className="recently-updated">
            <button onClick={handleLastCreatedView}>Recently Created</button>
            <button onClick={handleLastUpdatedView}>Recently Updated</button>
            <div className="text-components">{documentsView}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Documents;
