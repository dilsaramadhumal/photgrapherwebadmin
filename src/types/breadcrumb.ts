export interface BreadcrumbDropdownItem {
  label: string;
  href: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
  dropdownItems?: BreadcrumbDropdownItem[];
}

export interface BreadcrumbConfig {
  [path: string]: {
    label: string;
    dropdownItems?: BreadcrumbDropdownItem[];
    ignore?: boolean;
    parentPath?: string;
    ignoreHome?: boolean;
  };
}
