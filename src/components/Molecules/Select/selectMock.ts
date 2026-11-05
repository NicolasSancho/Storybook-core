import { SelectProps } from "./Select";

export const mockedSelect: SelectProps = {
  label: "Status",
  name: "status",
  options: [
    { value: "", label: "All statuses" },
    { value: "ACTIVE", label: "Active" },
    { value: "DRAFT", label: "Draft" },
    { value: "ARCHIVED", label: "Archived" },
  ],
};
