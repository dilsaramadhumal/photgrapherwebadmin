import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Button } from "../ui/button";

type FilterButtonProps = {
  onClick: () => void;
  buttonText?: string;
};

const FilterButton = ({ onClick, buttonText = "Filter" }: FilterButtonProps) => {
  return (
    <Button
      variant="outline"
        className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded flex items-center border border-gray-300"
      onClick={onClick}
    >
      <HiAdjustmentsHorizontal className="text-gray-800" />
      {buttonText}
    </Button>
  );
};

export default FilterButton;
