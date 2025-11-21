import { Button } from "../ui/button";
import { IoMdMenu } from "react-icons/io";

type MenuButtonProps = {
  onClick: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  iconSize?: number;
};

const MenuButton = ({
  onClick,
  size = "default",
  iconSize = 24
}: MenuButtonProps) => {
  return (
    <Button
      variant="ghost"
      size={size}
      className="flex items-center justify-center rounded-md p-4 hover:bg-gray-100 dark:hover:bg-gray-800 w-12 h-12"
      onClick={onClick}
    >
      <IoMdMenu style={{ width: iconSize, height: iconSize }} />
    </Button>
  );
};

export default MenuButton;
