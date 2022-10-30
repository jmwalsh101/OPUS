function MetaInfo(props) {
  return (
    <>
      <span>
        <p>Created By</p>
        <input type="text" readOnly="readonly" value={props.author} />
      </span>
      <span>
        <p>Created On</p>
        <input type="text" readOnly="readonly" value={props.createDate} />
      </span>
      <span>
        <p>Last Updated By</p>
        <input type="text" readOnly="readonly" value={props.updater} />
      </span>
      <span>
        <p>Updated On</p>
        <input type="text" readOnly="readonly" value={props.lastUpdated} />
      </span>
    </>
  );
}

export default MetaInfo;
