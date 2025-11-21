export type MenuItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  bgColor?: string;
  subItems?: SubMenuItem[];
};

export type SubMenuItem = {
  title: string;
  path: string;
};
