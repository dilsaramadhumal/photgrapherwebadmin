import { useState } from "react";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import { CustomPopup } from "@/components/CustomPopup/CustomPopup";
import {
  showToast,
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastLoading,
} from "@/components/CustomToast/CustomToast";
import AddButton from "@/components/CustomBtn/AddButton";
import FilterButton from "@/components/CustomBtn/FilterButton";
import MenuButton from "@/components/CustomBtn/MenuButton";
import NotificationButton from "@/components/CustomBtn/NotificationButton";
import { FiUser, FiSettings } from "react-icons/fi";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

const ComponentsTestPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activePopupContent, setActivePopupContent] = useState("default");
  const [notificationCount, setNotificationCount] = useState(5);

  const handleAvatarClick = (variant: string) => {
    showToast({
      variant: "info",
      title: "Avatar Clicked",
      description: `You clicked the ${variant} avatar`,
    });
  };

  const showRandomToast = () => {
    const variants = [
      "success",
      "error",
      "warning",
      "info",
      "loading",
      "default",
    ];
    const randomVariant = variants[
      Math.floor(Math.random() * variants.length)
    ] as "success" | "error" | "warning" | "info" | "loading" | "default";

    showToast({
      variant: randomVariant,
      title: `${
        randomVariant.charAt(0).toUpperCase() + randomVariant.slice(1)
      } Toast`,
      description: `This is a ${randomVariant} message`,
      action:
        randomVariant === "error"
          ? {
              label: "Retry",
              onClick: () =>
                showToast({ variant: "info", title: "Retrying..." }),
            }
          : undefined,
    });
  };

  const openPopupWithContent = (content: string) => {
    setActivePopupContent(content);
    setPopupOpen(true);
  };

  const increaseNotifications = () => {
    setNotificationCount((prev) => prev + 1);
  };

  const resetNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Component Library Test Page
      </h1>

      {/* Custom Avatar Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Custom Avatars
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Basic Avatar */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg mb-2">Basic</h3>
            <CustomAvatar
              src="https://github.com/shadcn.png"
              alt="User Avatar"
              fallback="CN"
              onClick={() => handleAvatarClick("basic")}
            />
          </div>

          {/* With Fallback */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg mb-2">Fallback</h3>
            <CustomAvatar
              src="/nonexistent.jpg"
              alt="User Avatar"
              fallback="FB"
              onClick={() => handleAvatarClick("fallback")}
            />
          </div>

          {/* With Badges */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg mb-2">With Badges</h3>
            <div className="flex gap-4">
              <CustomAvatar
                src="https://github.com/shadcn.png"
                fallback="CN"
                showBadge
                badgeColor="bg-green-500"
                badgePosition="top-right"
              />
              <CustomAvatar
                src="https://github.com/shadcn.png"
                fallback="CN"
                showBadge
                badgeIcon={<FiUser className="text-white" />}
                badgeColor="bg-blue-500"
                badgePosition="bottom-left"
              />
              <CustomAvatar
                src="https://github.com/shadcn.png"
                fallback="CN"
                showBadge
                badgeIcon={<FaCheck className="text-white text-xs" />}
                badgeColor="bg-purple-500"
                badgePosition="top-left"
                badgeSize="sm"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg mb-2">Sizes</h3>
            <div className="flex gap-4 items-end">
              <CustomAvatar
                src="https://github.com/shadcn.png"
                fallback="CN"
                className="h-8 w-8"
              />
              <CustomAvatar
                src="https://github.com/shadcn.png"
                fallback="CN"
                className="h-12 w-12"
              />
              <CustomAvatar
                src="https://github.com/shadcn.png"
                fallback="CN"
                className="h-16 w-16"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toast Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Toast Notifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() =>
              toastSuccess("Success!", "Your action was completed successfully")
            }
            className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded"
          >
            Show Success Toast
          </button>

          <button
            onClick={() => toastError("Error!", "Something went wrong")}
            className="bg-red-100 hover:bg-red-200 text-red-800 py-2 px-4 rounded"
          >
            Show Error Toast
          </button>

          <button
            onClick={() =>
              toastWarning("Warning", "This action cannot be undone")
            }
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-4 rounded"
          >
            Show Warning Toast
          </button>

          <button
            onClick={() =>
              toastInfo("Information", "Here's some info you might need")
            }
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded"
          >
            Show Info Toast
          </button>

          <button
            onClick={() => toastLoading("Processing", "Please wait...")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
          >
            Show Loading Toast
          </button>

          <button
            onClick={showRandomToast}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded"
          >
            Show Random Toast
          </button>
        </div>
      </section>

      {/* Popup Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Custom Popup
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => openPopupWithContent("default")}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded"
          >
            Open Default Popup
          </button>

          <button
            onClick={() => openPopupWithContent("scrollable")}
            className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded"
          >
            Open Scrollable Popup
          </button>

          <button
            onClick={() => openPopupWithContent("custom")}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded"
          >
            Open Custom Content Popup
          </button>
        </div>

        <CustomPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          title={
            activePopupContent === "default"
              ? "Default Popup"
              : activePopupContent === "scrollable"
              ? "Scrollable Content"
              : "Custom Content"
          }
          description={
            activePopupContent === "default"
              ? "This is a default popup with basic content"
              : activePopupContent === "scrollable"
              ? "This popup has scrollable content"
              : "This popup has custom content"
          }
          hasScrollbar={activePopupContent === "scrollable"}
        >
          {activePopupContent === "default" && (
            <div className="p-4">
              <p>This is the default content area of the popup.</p>
              <button
                onClick={() =>
                  toastInfo("Popup Action", "Button inside popup clicked")
                }
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Click Me
              </button>
            </div>
          )}

          {activePopupContent === "scrollable" && (
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 border rounded">
                  Scrollable Item #{i + 1}
                </div>
              ))}
            </div>
          )}

          {activePopupContent === "custom" && (
            <div className="p-4">
              <div className="flex items-center justify-center mb-4">
                <FiSettings className="text-4xl text-blue-500 mr-3" />
                <span className="text-xl font-medium">Custom Content</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Feature 1</h4>
                  <p className="text-sm">Description of feature one</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Feature 2</h4>
                  <p className="text-sm">Description of feature two</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <FaExclamationTriangle className="inline mr-2 text-yellow-600" />
                <span>Custom warning message</span>
              </div>
            </div>
          )}
        </CustomPopup>
      </section>

      {/* Button Components Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Button Components
        </h2>

        <div className="space-y-8">
          {/* Add Button */}
          <div>
            <h3 className="text-xl font-medium mb-4">Add/Filter Button</h3>
            <div className="flex flex-wrap gap-4">
              <AddButton
                onClick={() => toastInfo("Add Button", "Add button clicked")}
                buttonText="Add Item"
              />
              <AddButton
                onClick={() => toastInfo("Add Button", "Add project clicked")}
                buttonText="Add Project"
              />
              <AddButton
                onClick={() => toastInfo("Add Button", "Add user clicked")}
                buttonText="Add User"
              />
              <FilterButton
                onClick={() => toastInfo("Filter Button", "Filter clicked")}
              />
            </div>
          </div>

          {/* Menu Button */}
          <div>
            <h3 className="text-xl font-medium mb-4">Menu Button</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <MenuButton
                onClick={() =>
                  toastInfo("Menu Button", "Default menu button clicked")
                }
              />
              <MenuButton
                onClick={() =>
                  toastInfo("Menu Button", "Small menu button clicked")
                }
                size="sm"
                iconSize={18}
              />
              <MenuButton
                onClick={() =>
                  toastInfo("Menu Button", "Large menu button clicked")
                }
                size="lg"
                iconSize={28}
              />
              <MenuButton
                onClick={() =>
                  toastInfo("Menu Button", "Icon-sized menu button clicked")
                }
                size="icon"
                iconSize={20}
              />
            </div>
          </div>

          {/* Notification Button */}
          <div>
            <h3 className="text-xl font-medium mb-4">Notification Button</h3>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center">
                <p className="mb-2">Number Badge</p>
                <NotificationButton
                  onClick={() =>
                    toastInfo(
                      "Notifications",
                      `You have ${notificationCount} notifications`
                    )
                  }
                  showBadge
                  badgeContent={notificationCount}
                />
              </div>

              <div className="flex flex-col items-center">
                <p className="mb-2">Dot Badge</p>
                <NotificationButton
                  onClick={() =>
                    toastInfo("Notifications", "You have unread notifications")
                  }
                  showBadge
                  badgeVariant="dot"
                />
              </div>

              <div className="flex flex-col items-center">
                <p className="mb-2">Custom Badge</p>
                <NotificationButton
                  onClick={() =>
                    toastInfo("Notifications", "Custom badge clicked")
                  }
                  showBadge
                  badgeContent={99}
                  badgeColor="bg-purple-600 text-white"
                  badgeClassName="min-w-6 h-6 text-xs"
                  badgeOffset={{ x: "30%", y: "-30%" }}
                />
              </div>

              <div className="flex flex-col items-center">
                <p className="mb-2">Small Size</p>
                <NotificationButton
                  onClick={() =>
                    toastInfo(
                      "Notifications",
                      "Small notification button clicked"
                    )
                  }
                  size="sm"
                  iconSize={18}
                  showBadge
                  badgeContent={3}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={increaseNotifications}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded text-sm"
              >
                Increase Notifications
              </button>
              <button
                onClick={resetNotifications}
                className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded text-sm"
              >
                Reset Notifications
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentsTestPage;
