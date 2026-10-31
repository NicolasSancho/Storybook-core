import { SidebarNavProps } from "./SidebarNav";

export const mockedSidebarNavDefault: SidebarNavProps = {
  label: "Main",
  items: [
    { label: "Products", href: "/products", icon: "Package", current: true },
    { label: "Settings", href: "/settings" },
    { label: "Help", href: "/help" },
  ],
};

export const mockedSidebarNavNoCurrent: SidebarNavProps = {
  ...mockedSidebarNavDefault,
  items: mockedSidebarNavDefault.items.map((item) => ({ ...item, current: false })),
};
