import { useState, useEffect } from "react";

function ComponenetSidebar() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <>
      {backendData.map(function (q, index) {
        return (
          <>
            <div key={index}>
              <p>{q.name}</p>
            </div>
          </>
        );
      })}
    </>
  );
}

export default ComponenetSidebar;
