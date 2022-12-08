import { useEffect, useState } from "react";
import _ from "lodash";

function Example() {
  const [textComponents, setTextComponents] = useState([]);

  useEffect(() => {
    fetch("/documents-load")
      .then((response) => response.json())
      .then((data) => {
        const mainDocument = _.find(data, {
          title: "Help Center Main",
        });

        console.log("MD", mainDocument);
        fetch("/component-load")
          .then((response) => response.json())
          .then((data) => {
            let documentComponents = [];

            const componentIds = mainDocument.content;
            for (const i of componentIds) {
              const item = _.find(data, { id: i });
              documentComponents.push(item);
            }
            setTextComponents(documentComponents);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(textComponents);

  return (
    <div className="home-container">
      <div className="left"></div>
      <div className="centre">
        {textComponents.map(function (j, index) {
          console.log("j", j);
          return (
            <>
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: j.content }}
              />
            </>
          );
        })}
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Example;
