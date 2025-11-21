import InputField from "../CustomInputField/CustomInput";
import { CiSearch } from "react-icons/ci";

type CustomInputFieldProps = React.ComponentProps<typeof InputField>;

type SearchbarProps = {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void; 
} & CustomInputFieldProps;

const Searchbar = ({
  placeholder = "Search...",
  className,
  onChange, 
  ...props 
}: SearchbarProps) => {
  return (
    <InputField
      label=""
      placeholder={placeholder}
      standalone
      className={className}
      prefix={<CiSearch />}
      onChange={onChange} 
      {...props} 
    />
  );
};

export default Searchbar;