import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "@/components/CustomInputField/CustomInput";
import SelectField from "@/components/CustomSelect/CustomSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Info } from "lucide-react";
import Searchbar from "@/components/Searchbar/Searchbar";

const formSchema = z.object({
  text: z.string().min(2, "Must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  number: z.number().min(1, "Must be at least 1"),
  currency: z.string(),
  search: z.string(),
  withPrefix: z.string(),
  withSuffix: z.string(),
  withBoth: z.string(),
  withError: z.string().min(5, "Must be at least 5 characters"),
  fruit: z.string().min(1, "Please select a fruit"),
  foodGroup: z.string().min(1, "Please select a food group"),
  multipleGroups: z.string().min(1, "Please select an option"),
  withValidation: z.string().min(1, "This selection is required"),
});

export default function InputFieldTestPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      email: "",
      password: "",
      number: 0,
      currency: "",
      search: "",
      withPrefix: "",
      withSuffix: "",
      withBoth: "",
      withError: "",
      fruit: "",
      foodGroup: "",
      multipleGroups: "",
      withValidation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "pear", label: "Pear" },
    { value: "grape", label: "Grape" },
  ];

  const foodGroupOptions = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "grains", label: "Grains" },
    { value: "proteins", label: "Proteins" },
    { value: "dairy", label: "Dairy" },
  ];

  const groupedOptions = [
    {
      label: "Fruits",
      options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
      ],
    },
    {
      label: "Vegetables",
      options: [
        { value: "carrot", label: "Carrot" },
        { value: "broccoli", label: "Broccoli" },
        { value: "spinach", label: "Spinach" },
      ],
    },
    {
      label: "Meats",
      options: [
        { value: "chicken", label: "Chicken" },
        { value: "beef", label: "Beef" },
        { value: "pork", label: "Pork" },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Component Test Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Form-Integrated Components</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Input Fields</h3>

                <InputField
                  name="text"
                  label="Text Input"
                  description="Enter some text"
                  placeholder="Type something..."
                  form={form}
                />

                <InputField
                  name="email"
                  label="Email Input"
                  type="email"
                  placeholder="your@email.com"
                  form={form}
                />

                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  form={form}
                />

                <InputField
                  name="number"
                  label="Number Input"
                  type="number"
                  placeholder="Enter a number"
                  form={form}
                />

                <InputField
                  name="currency"
                  label="Currency Input"
                  type="text"
                  prefix="$"
                  placeholder="0.00"
                  form={form}
                />

                <InputField
                  name="withSuffix"
                  label="Weight Input"
                  type="text"
                  suffix="kg"
                  placeholder="Enter weight"
                  form={form}
                />

                <InputField
                  name="withBoth"
                  label="Range Input"
                  type="text"
                  prefix="From"
                  suffix="miles"
                  placeholder="Enter distance"
                  form={form}
                />

                <InputField
                  name="withError"
                  label="Error Demonstration"
                  description="Type less than 5 characters to see error"
                  placeholder="Type something short"
                  form={form}
                />
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Select Fields</h3>

                <SelectField
                  name="fruit"
                  label="Favorite Fruit"
                  placeholder="Select a fruit"
                  options={fruitOptions}
                  rhfForm={form}
                />

                <SelectField
                  name="multipleGroups"
                  label="Food Category"
                  placeholder="Select a food category"
                  groups={groupedOptions}
                  rhfForm={form}
                />

                <SelectField
                  name="withValidation"
                  label="Required Selection"
                  placeholder="Select an option (required)"
                  options={[
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" },
                  ]}
                  rhfForm={form}
                />

                <Button type="submit" className="mt-4">
                  Submit Form
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Standalone Components</h2>

          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Input Fields</h3>

            <Searchbar
              name="search"
              onChange={(value) => console.log("Search:", value)}
            />

            <InputField
              name="disabled"
              label="Disabled Input"
              placeholder="Can't touch this"
              disabled
              standalone
            />

            <InputField
              name="readonly"
              label="Readonly Input"
              defaultValue="Pre-filled value"
              readOnly
              standalone
            />

            <InputField
              name="styled"
              label="Custom Styled Input"
              placeholder="This one looks different"
              className="border-2 border-purple-500 focus:ring-purple-500"
              containerClassName="bg-purple-50 p-4 rounded-lg"
              labelClassName="text-purple-700"
              standalone
            />

            <InputField
              name="iconSuffix"
              label="Input with Icon Suffix"
              placeholder="Enter value"
              standalone
              suffix={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              }
            />
          </div>

          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Select Fields</h3>

            <SelectField
              name="standaloneFruit"
              label="Favorite Fruit"
              placeholder="Select a fruit"
              options={fruitOptions}
              standalone
              onChange={(value) => console.log("Selected:", value)}
            />

            <SelectField
              name="disabledSelect"
              label="Disabled Select"
              placeholder="Select disabled"
              options={fruitOptions}
              disabled
              standalone
            />

            <SelectField
              name="defaultSelect"
              label="Select with Default"
              placeholder="Select an option"
              options={fruitOptions}
              defaultValue="banana"
              standalone
            />

            <SelectField
              name="styledSelect"
              label="Custom Styled Select"
              placeholder="Select an option"
              options={foodGroupOptions}
              standalone
              containerClassName="bg-blue-50 p-4 rounded-lg"
              labelClassName="text-blue-700 font-bold"
              triggerClassName="border-blue-500 focus:ring-blue-500"
              contentClassName="bg-blue-50 border-blue-200"
            />

            <SelectField
              name="infoSelect"
              label="Select with Info"
              description="Additional information about this selection"
              placeholder="Select an option"
              options={[
                { value: "basic", label: "Basic" },
                { value: "premium", label: "Premium" },
                { value: "enterprise", label: "Enterprise" },
              ]}
              standalone
              suffix={<Info className="h-4 w-4 text-muted-foreground" />}
            />

            <SelectField
              name="groupedSelect"
              label="Grouped Options"
              placeholder="Select from groups"
              groups={groupedOptions}
              standalone
            />
          </div>
        </div>
      </div>
    </div>
  );
}
