import { GridProps } from "./Grid";
import React from "react";

export const mockedGrid: GridProps = {
  children: (
    <>
      <div className="bg-primary p-4">Item 1</div>
      <div className="bg-secondary p-4">Item 2</div>
      <div className="bg-primary p-4">Item 3</div>
    </>
  ),
  columns: 3,
  gap: "medium",
};

export const twoColumnGrid: GridProps = {
  children: (
    <>
      <div className="bg-primary p-4">Item 1</div>
      <div className="bg-secondary p-4">Item 2</div>
    </>
  ),
  columns: 2,
  gap: "small",
};

export const fourColumnGrid: GridProps = {
  children: (
    <>
      <div className="bg-primary p-4">Item 1</div>
      <div className="bg-secondary p-4">Item 2</div>
      <div className="bg-primary p-4">Item 3</div>
      <div className="bg-secondary p-4">Item 4</div>
    </>
  ),
  columns: 4,
  gap: "large",
};
