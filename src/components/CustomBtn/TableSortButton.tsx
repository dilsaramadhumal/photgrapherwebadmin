import { FaSort } from "react-icons/fa";
import { Button } from "../ui/button";
type TableSortButtonProps = {
  columnName: string;
  column: any;
};

const TableSortButton = ({ columnName, column }: TableSortButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-0 hover:bg-transparent"
    >
        {columnName}
        <FaSort className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default TableSortButton;
