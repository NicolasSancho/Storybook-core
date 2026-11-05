import { PaginationProps } from "./Pagination";

export const mockedPaginationFirst: PaginationProps = {
  page: 1,
  totalItems: 84,
  pageSize: 20,
  nextHref: "?page=2",
};

export const mockedPaginationMiddle: PaginationProps = {
  ...mockedPaginationFirst,
  page: 3,
  previousHref: "?page=2",
  nextHref: "?page=4",
};

export const mockedPaginationLast: PaginationProps = {
  ...mockedPaginationFirst,
  page: 5,
  previousHref: "?page=4",
  nextHref: undefined,
};

export const mockedPaginationSinglePage: PaginationProps = {
  page: 1,
  totalItems: 3,
  pageSize: 20,
};
