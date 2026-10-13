import React from "react";
import { ContainerProps } from "./Container";

export const mockedContainer: ContainerProps = {
  children: (
    <div className="rounded-lg border border-neutral-200 p-6 text-neutral-900">
      Page content stays inside the container.
    </div>
  ),
};

export const mockedContainerMain: ContainerProps = {
  as: "main",
  children: <p className="text-neutral-900">Main page content</p>,
};
