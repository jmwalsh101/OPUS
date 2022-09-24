import "./htmlstyle.css";

function Child2(props) {
  console.log(props.data);
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: props.data }} />
    </div>
  );
}

export default Child2;
