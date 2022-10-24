import { useState, useEffect } from "react";

function ComponenetSidebar() {
  const [backendData, setBackendData] = useState([]);

  function handleDelete(e) {
    e.preventDefault();
    fetch("/component-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: e.target.value }),
    });
  }

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [backendData]);

  return (
    <>
      {backendData.map(function (q, index) {
        return (
          <>
            <div key={index}>
              <p>{q.name}</p>
              <button onClick={handleDelete} value={q.id}>
                Delete
              </button>
            </div>
          </>
        );
      })}
    </>
  );
}

export default ComponenetSidebar;
