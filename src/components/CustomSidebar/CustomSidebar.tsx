import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { GoTriangleRight } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";

export type MenuItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  subItems?: SubMenuItem[];
};

export type SubMenuItem = {
  title: string;
  path: string;
};

interface AppSidebarProps {
  menuItems: MenuItem[];
  defaultExpandedItems?: Record<string, boolean>;
  isCollapsed?: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onNavigate?: (path: string) => void;
}

export function AppSidebar({
  menuItems,
  defaultExpandedItems = {},
  isCollapsed = false,
  setIsCollapsed,
  onNavigate,
}: AppSidebarProps) {
  const [expandedItems, setExpandedItems] =
    useState<Record<string, boolean>>(defaultExpandedItems);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleItemExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleNavigation = (path?: string) => {
    if (!path) return;
    if (onNavigate) onNavigate(path);
    else navigate(path);
  };

  return (
    <Sidebar
      className={`transition-all duration-300 ease-in-out shadow-sm
      ${isCollapsed ? "w-20" : "w-72"}`}
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        border: 'none',
        borderRight: 'none'
      }}
    >
      <SidebarHeader className="flex items-center justify-between px-4 py-3"
      >
        {!isCollapsed && (
          <h1 className="text-lg font-semibold tracking-tight"
            style={{ color: 'var(--accent-color, #FFC964)' }}
          >
            Admin Panel
          </h1>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-md transition"
          style={{ 
            color: 'var(--accent-color, #FFC964)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 overflow-y-auto">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.subItems) toggleItemExpand(item.title);
                      handleNavigation(item.path);
                    }}
                    className={`w-full flex items-center gap-3 rounded-lg py-5 px-3 text-sm font-medium transition-all
                    ${isActive ? "shadow-sm" : ""}`}
                    style={{
                      backgroundColor: isActive ? 'var(--accent-color, #FFC964)' : 'transparent',
                      color: isActive ? 'var(--bg-secondary)' : 'var(--text-primary)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                        e.currentTarget.style.color = 'var(--accent-color, #FFC964)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                  >
                    <div
                      className={`flex items-center justify-center ${
                        isCollapsed ? "w-full" : ""
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {!isCollapsed && expandedItems[item.title] && item.subItems && (
                  <div className="ml-6 mt-1 space-y-1 pl-3"
                  >
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            className="w-full flex items-center gap-2 rounded-md py-1.5 px-2 text-sm transition-colors"
                            style={{
                              color: isSubActive ? 'var(--accent-color, #FFC964)' : 'var(--text-secondary)',
                              fontWeight: isSubActive ? '500' : '400'
                            }}
                            onClick={() => handleNavigation(subItem.path)}
                            onMouseEnter={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.color = 'var(--accent-color, #FFC964)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }
                            }}
                          >
                            <GoTriangleRight
                              className="h-3 w-3"
                              style={{
                                color: isSubActive ? 'var(--accent-color, #FFC964)' : 'var(--text-secondary)'
                              }}
                            />
                            {subItem.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}