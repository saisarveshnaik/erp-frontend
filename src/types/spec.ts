export type FieldType =
  | "text"
  | "email"
  | "password"
  | "phone"
  | "number"
  | "select"
  | "multiselect"
  | "date"
  | "time"
  | "currency"
  | "file"
  | "image"
  | "textarea"
  | "switch";

export type ScreenType = "dashboard" | "list" | "create" | "edit" | "view" | "report" | "matrix" | "calendar";

export type FormField = {
  label: string;
  type: FieldType;
};

export type FormSection = {
  title: string;
  fields: FormField[];
};

export type ScreenDefinition = {
  id: string;
  title: string;
  path: string;
  type: ScreenType;
  description?: string;
  tableName?: string;
  tableColumns?: string[];
  filters?: string[];
  formSections?: FormSection[];
  exportFormats?: string[];
  matrixColumns?: string[];
  matrixRows?: string[];
};

export type SubmoduleDefinition = {
  id: string;
  title: string;
  screens: ScreenDefinition[];
};

export type ModuleDefinition = {
  id: string;
  title: string;
  submodules: SubmoduleDefinition[];
};