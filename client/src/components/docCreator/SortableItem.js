import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <td
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="awkward-div"
    >
      <span>{props.number}&nbsp;</span>
      <span>{props.name}</span>
    </td>
  );
}
export default SortableItem;
