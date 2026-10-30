import { PopoverProps } from "./Popover";

export const mockedPopoverMenu: PopoverProps = {
  trigger: "Ana Ruiz",
  placement: "bottom-end",
  children: "Panel content",
};

export const mockedPopoverStart: PopoverProps = {
  ...mockedPopoverMenu,
  trigger: "Filters",
  placement: "bottom-start",
};

export const mockedPopoverDrawer: PopoverProps = {
  ...mockedPopoverMenu,
  trigger: "Menu",
  placement: "drawer",
};
