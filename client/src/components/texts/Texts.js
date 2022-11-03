import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { componentIdContext } from "../../contexts/ComponentContext";

function Texts() {
  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [componentsFromBackend, setComponentsFromBackend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [selectedComponent, setSelectedComponent] = useState();

  const navigate = useNavigate();

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
      setSearchResults("");
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    if (searchTerm) {
      setSearchResults(
        componentsFromBackend.filter((comp) =>
          comp.content.includes(searchTerm)
        )
      );
    }
  }

  function handleSelect(e) {
    e.preventDefault();
    const id = parseInt(e.target.value);
    const item = _.find(componentsFromBackend, { id: id });

    setSelectedComponent(item);
    setSearchResults("");
  }

  function handleClear(e) {
    e.preventDefault();

    setSearchResults("");
  }

  function handleEdit(e) {
    const id = e.target.value;
    setBackendComponentId(id);
    //navigate("/");
  }

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
          <input type="text" onChange={handleSearchTerm} value={searchTerm} />
          {searchResults ? (
            <button onClick={handleClear}>Clear</button>
          ) : (
            <input type="submit" onClick={handleSearch} />
          )}

          <div className="search-result-container">
            {searchResults
              ? searchResults.map(function (k, index) {
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
              : null}
          </div>
          <div className="text-box-container">
            <div className="texts-text-box">
              <button value={selectedComponent?.id} onClick={handleEdit}>
                Edit
              </button>
              <>
                <div>
                  <h2>{selectedComponent?.name}</h2>
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
      </div>
    </>
  );
}

export default Texts;
