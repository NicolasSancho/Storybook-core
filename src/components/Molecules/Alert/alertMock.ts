import { AlertProps } from "./Alert";

export const mockedAlertError: AlertProps = {
  variant: "error",
  title: "Sign in failed",
  children: "Check your email and password and try again.",
};

export const mockedAlertTitleOnly: AlertProps = {
  title: "The products could not be loaded",
};
