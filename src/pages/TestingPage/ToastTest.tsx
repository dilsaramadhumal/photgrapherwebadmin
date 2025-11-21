import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastLoading,
  showToast,
} from "@/components/CustomToast/CustomToast";
import NavBar from "@/components/NavBar/NavBar";
import AddButton from "@/components/CustomBtn/AddButton";

export default function ToastTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 w-full">
        <NavBar />
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center mb-8">
          Toast Notifications
        </h1>

        <button
          onClick={() =>
            toastSuccess("Success!", "Your action was completed successfully")
          }
          className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded"
        >
          Show Success Toast
        </button>

        <button
          onClick={() => toastError("Error!", "Something went wrong")}
          className="w-full bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded"
        >
          Show Error Toast
        </button>

        <button
          onClick={() =>
            toastWarning("Warning", "This action requires your attention")
          }
          className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 px-4 rounded"
        >
          Show Warning Toast
        </button>

        <button
          onClick={() =>
            toastInfo("Information", "Here's some info you might need")
          }
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded"
        >
          Show Info Toast
        </button>

        <button
          onClick={() => toastLoading("Processing", "Please wait...")}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
        >
          Show Loading Toast
        </button>

        <button
          onClick={() =>
            showToast({
              variant: "default",
              title: "Default Toast",
              description: "With an action button",
              action: {
                label: "Retry",
                onClick: () => toastSuccess("Retry successful!"),
              },
            })
          }
          className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded border border-gray-300"
        >
          Show Toast with Action
        </button>
      </div>
      <AddButton
        onClick={() => console.log("Add button clicked")}
        buttonText="Add Item"
        />
      {/* <Toaster position="bottom-right" />  */}
    </div>
  );
}
