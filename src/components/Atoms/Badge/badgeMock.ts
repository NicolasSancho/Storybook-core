import { BadgeProps } from "./Badge";

export const mockedBadgeNeutral: BadgeProps = { children: "Draft" };

export const mockedBadgeSuccess: BadgeProps = { variant: "success", children: "Active" };

export const mockedBadgeStatus: BadgeProps = {
  variant: "success",
  dot: true,
  children: "Open now",
};
