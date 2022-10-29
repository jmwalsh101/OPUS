import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      className="doc-component"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.number}&nbsp;
      {props.name}
    </div>
  );
}
export default SortableItem;
