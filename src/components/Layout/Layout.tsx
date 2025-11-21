import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { AppSidebar } from "../CustomSidebar/CustomSidebar";
import NavBar from "../NavBar/NavBar";
import { adminMenuItems } from "@/constants/SidebarMenuItems";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "sonner";
import { CustomBreadcrumb } from "../CustomBreadcrumb/CustomBreadcrumb";
import { useLocation, Outlet } from "react-router-dom";
import { breadcrumbConfig } from "@/constants/breadcrumbs";
import { BreadcrumbItem } from "@/types/breadcrumb";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split("/").filter((path) => path);
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPathParts: string[] = [];

    const currentConfig =
      breadcrumbConfig[location.pathname] ||
      Object.keys(breadcrumbConfig).find(
        (key) => key.includes(":") && matchDynamicPath(key, location.pathname)
      );

    const shouldIncludeHome = !currentConfig?.ignoreHome;

    if (shouldIncludeHome && breadcrumbConfig["/"]) {
      breadcrumbs.push({
        label: breadcrumbConfig["/"].label,
        href: "/",
        dropdownItems: breadcrumbConfig["/"].dropdownItems,
      });
    }

    for (const segment of paths) {
      currentPathParts.push(segment);
      const currentPath = "/" + currentPathParts.join("/");

      if (breadcrumbConfig[currentPath]) {
        const config = breadcrumbConfig[currentPath];
        if (config.ignore) continue;

        breadcrumbs.push({
          label: config.label,
          href: config.parentPath ? undefined : currentPath,
          dropdownItems: config.dropdownItems,
          isCurrent: currentPath === location.pathname,
        });
        continue;
      }

      const dynamicPathMatch = Object.keys(breadcrumbConfig).find((key) => {
        if (key.includes(":")) {
          return matchDynamicPath(key, currentPath);
        }
        return false;
      });

      if (dynamicPathMatch) {
        const config = breadcrumbConfig[dynamicPathMatch];
        breadcrumbs.push({
          label: config.label,
          href: config.parentPath ? undefined : currentPath,
          isCurrent: currentPath === location.pathname,
        });
        continue;
      }

      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent: currentPath === location.pathname,
      });
    }

    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].isCurrent = true;
      breadcrumbs[breadcrumbs.length - 1].href = undefined;
    }

    return breadcrumbs;
  };

  const matchDynamicPath = (pattern: string, path: string): boolean => {
    const patternParts = pattern.split("/").filter((p) => p);
    const pathParts = path.split("/").filter((p) => p);

    if (patternParts.length !== pathParts.length) return false;

    return patternParts.every((part, i) => {
      return part.startsWith(":") || part === pathParts[i];
    });
  };
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className={`h-full ${isCollapsed ? "w-20" : "w-72"} border-r`}>
            <AppSidebar
              menuItems={adminMenuItems}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>

          <div className="flex flex-col flex-1 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="h-16 p-4 flex-shrink-0">
              <NavBar />
            </div>

            <div className="flex flex-col flex-1 overflow-hidden m-6 rounded-xl shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
              <div className="mb-3 px-4 pt-4 h-10 sticky top-0 z-10 rounded-t-lg flex items-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <CustomBreadcrumb items={generateBreadcrumbs()} />
              </div>

              <ScrollArea className="flex-1">
                <div className=" m-4 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)'}}>
                  <Outlet />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </SidebarProvider>
    </>
  );
};

export default Layout;
