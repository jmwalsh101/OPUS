function MetaInfo(props) {
  return (
    <>
      <div className="meta-info">
        <h3>Text Details</h3>
        <div className="meta-created">
          <span>
            <p>Author</p>
            <input type="text" readOnly="readonly" value={props.author} />
          </span>
          <span>
            <p>Created On</p>
            <input type="text" readOnly="readonly" value={props.createDate} />
          </span>
        </div>
        <div className="meta-updated">
          <span>
            <p>Updated By</p>
            <input type="text" readOnly="readonly" value={props.updater} />
          </span>
          <span>
            <p>Updated On</p>
            <input type="text" readOnly="readonly" value={props.lastUpdated} />
          </span>
        </div>
      </div>
    </>
  );
}

export default MetaInfo;
