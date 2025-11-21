import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Tooltip } from "../CustomTooltip/CustomTooltip";

type TableActionButtonProps = {
  btnType: "view" | "edit" | "delete" | "calendar";
  onClick: () => void;
  tooltipContent?: string;
};
const TableActionButton = ({
  btnType,
  onClick,
  tooltipContent = "Click",
}: TableActionButtonProps) => {
  return (
    <Tooltip content={tooltipContent} side="bottom">
      <Button
        variant="ghost"
        onClick={onClick}
        className="px-0 hover:bg-transparent"
      >
        {btnType === "view" && <MdOutlineRemoveRedEye className="h-4 w-4" />}
        {btnType === "edit" && <MdOutlineModeEdit className="h-4 w-4" />}
        {btnType === "delete" && <RiDeleteBin6Line className="h-4 w-4" />}
        {btnType === "calendar" && <FaRegCalendarDays className="h-4 w-4" />}
      </Button>
    </Tooltip>
  );
};

export default TableActionButton;
