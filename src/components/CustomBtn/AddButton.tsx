import { IoMdAdd } from "react-icons/io";
import { Button } from "../ui/button";

type AddButtonProps = {
  onClick: () => void;
  buttonText: string;
};

const AddButton = ({ onClick, buttonText }: AddButtonProps) => {
  return (
    <Button
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={onClick}
    >
      <IoMdAdd />
      {buttonText}
    </Button>
  );
};

export default AddButton;
