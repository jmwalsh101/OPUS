import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{props.number}&nbsp;</span>
      <span>{props.name}</span>
    </div>
  );
}
export default SortableItem;
