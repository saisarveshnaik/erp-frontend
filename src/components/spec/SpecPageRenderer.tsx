import { useMemo, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import clsx from "clsx";
import SectionCard from "../SectionCard";
import { moduleConfig } from "../../data/specConfig";
import type { FormField, ScreenDefinition } from "../../types/spec";

const inputTypeLabel: Record<FormField["type"], string> = {
  text: "Text",
  email: "Email",
  password: "Password",
  phone: "Phone",
  number: "Number",
  select: "Select",
  multiselect: "Multi Select",
  date: "Date",
  time: "Time",
  currency: "Currency",
  file: "File Upload",
  image: "Image Upload",
  textarea: "Textarea",
  switch: "Switch"
};

const filterClass =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-slate-500";

const buildRows = (columns: string[], count = 6) =>
  Array.from({ length: count }, (_, index) =>
    columns.map((column) => {
      if (column.toLowerCase().includes("status")) {
        return index % 2 === 0 ? "Active" : "Pending";
      }
      if (column.toLowerCase().includes("date")) {
        return `2026-04-${String(index + 1).padStart(2, "0")}`;
      }
      if (column.toLowerCase().includes("amount") || column.toLowerCase().includes("total")) {
        return `$${(index + 1) * 1250}`;
      }
      return `${column} ${index + 1}`;
    })
  );

const FormSectionList = ({ fields, readOnly = false }: { fields: FormField[]; readOnly?: boolean }) => (
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
    {fields.map((field) => (
      <label key={field.label} className="rounded-xl border border-border bg-white p-3">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{field.label}</span>
        <input
          type="text"
          placeholder={inputTypeLabel[field.type]}
          readOnly={readOnly}
          className="h-9 w-full rounded-lg border border-border bg-page px-3 text-sm text-slate-600"
        />
      </label>
    ))}
  </div>
);

type ListActionModalType = "create" | "edit" | "profile";

const ListScreen = ({ screen }: { screen: ScreenDefinition }) => {
  const isEmployeeListScreen = screen.id === "employees-list";
  const isDepartmentListScreen = screen.id === "departments-list";
  const isDesignationListScreen = screen.id === "designations-list";
  const isAttendanceListScreen = screen.id === "attendance-list";
  const isLeaveTypeListScreen = screen.id === "leave-types-list";
  const isLeaveRequestListScreen = screen.id === "leave-request-list";
  const isDocumentListScreen = screen.id === "documents-list";
  const isAssetListScreen = screen.id === "assets-list";
  const hasInlineActions =
    isEmployeeListScreen ||
    isDepartmentListScreen ||
    isDesignationListScreen ||
    isAttendanceListScreen ||
    isLeaveTypeListScreen ||
    isLeaveRequestListScreen ||
    isDocumentListScreen ||
    isAssetListScreen;
  const columns = screen.tableColumns ?? ["Name", "Status"];
  const rows = useMemo(() => buildRows(columns), [columns]);
  const [employeeModalType, setEmployeeModalType] = useState<ListActionModalType | null>(null);
  const [selectedEmployeeRow, setSelectedEmployeeRow] = useState<number | null>(null);
  const [isEmployeeProfileEditable, setIsEmployeeProfileEditable] = useState(false);
  const [departmentModalType, setDepartmentModalType] = useState<Exclude<ListActionModalType, "profile"> | null>(null);
  const [selectedDepartmentRow, setSelectedDepartmentRow] = useState<number | null>(null);
  const [designationModalType, setDesignationModalType] = useState<Exclude<ListActionModalType, "profile"> | null>(null);
  const [selectedDesignationRow, setSelectedDesignationRow] = useState<number | null>(null);
  const [attendanceModalType, setAttendanceModalType] = useState<"manual" | "calendar" | null>(null);
  const [selectedAttendanceRow, setSelectedAttendanceRow] = useState<number | null>(null);
  const [leaveTypeModalType, setLeaveTypeModalType] = useState<Exclude<ListActionModalType, "profile"> | null>(null);
  const [selectedLeaveTypeRow, setSelectedLeaveTypeRow] = useState<number | null>(null);
  const [leaveRequestModalType, setLeaveRequestModalType] = useState<"create" | "view" | null>(null);
  const [selectedLeaveRequestRow, setSelectedLeaveRequestRow] = useState<number | null>(null);
  const [documentModalType, setDocumentModalType] = useState<"upload" | "edit" | null>(null);
  const [selectedDocumentRow, setSelectedDocumentRow] = useState<number | null>(null);
  const [assetModalType, setAssetModalType] = useState<"assign" | "edit" | null>(null);
  const [selectedAssetRow, setSelectedAssetRow] = useState<number | null>(null);

  const employeeActionScreens = useMemo(() => {
    if (!isEmployeeListScreen) return null;
    const employeesSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "employees");

    return {
      create: employeesSubmodule?.screens.find((item) => item.id === "employees-create"),
      edit: employeesSubmodule?.screens.find((item) => item.id === "employees-edit"),
      profile: employeesSubmodule?.screens.find((item) => item.id === "employees-profile")
    };
  }, [isEmployeeListScreen]);

  const departmentActionScreens = useMemo(() => {
    if (!isDepartmentListScreen) return null;
    const departmentsSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "departments");

    return {
      create: departmentsSubmodule?.screens.find((item) => item.id === "departments-create"),
      edit: departmentsSubmodule?.screens.find((item) => item.id === "departments-edit")
    };
  }, [isDepartmentListScreen]);

  const designationActionScreens = useMemo(() => {
    if (!isDesignationListScreen) return null;
    const designationsSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "designations");

    return {
      create: designationsSubmodule?.screens.find((item) => item.id === "designations-create"),
      edit: designationsSubmodule?.screens.find((item) => item.id === "designations-edit")
    };
  }, [isDesignationListScreen]);

  const attendanceActionScreens = useMemo(() => {
    if (!isAttendanceListScreen) return null;
    const attendanceSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "attendance");

    return {
      manual: attendanceSubmodule?.screens.find((item) => item.id === "attendance-manual"),
      calendar: attendanceSubmodule?.screens.find((item) => item.id === "attendance-calendar")
    };
  }, [isAttendanceListScreen]);

  const leaveTypeActionScreens = useMemo(() => {
    if (!isLeaveTypeListScreen) return null;
    const leaveTypesSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "leave-types");

    return {
      create: leaveTypesSubmodule?.screens.find((item) => item.id === "leave-types-create"),
      edit: leaveTypesSubmodule?.screens.find((item) => item.id === "leave-types-edit")
    };
  }, [isLeaveTypeListScreen]);

  const leaveRequestActionScreens = useMemo(() => {
    if (!isLeaveRequestListScreen) return null;
    const leaveRequestSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "leave-request");

    return {
      create: leaveRequestSubmodule?.screens.find((item) => item.id === "leave-request-create"),
      view: leaveRequestSubmodule?.screens.find((item) => item.id === "leave-request-view")
    };
  }, [isLeaveRequestListScreen]);

  const documentActionScreens = useMemo(() => {
    if (!isDocumentListScreen) return null;
    const documentSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "documents");

    return {
      upload: documentSubmodule?.screens.find((item) => item.id === "documents-upload"),
      edit: documentSubmodule?.screens.find((item) => item.id === "documents-edit")
    };
  }, [isDocumentListScreen]);

  const assetActionScreens = useMemo(() => {
    if (!isAssetListScreen) return null;
    const assetsSubmodule = moduleConfig
      .find((module) => module.id === "hr")
      ?.submodules.find((submodule) => submodule.id === "assets");

    return {
      assign: assetsSubmodule?.screens.find((item) => item.id === "assets-assign"),
      edit: assetsSubmodule?.screens.find((item) => item.id === "assets-edit")
    };
  }, [isAssetListScreen]);

  const employeeModalScreen = employeeModalType && employeeActionScreens ? employeeActionScreens[employeeModalType] : null;
  const departmentModalScreen =
    departmentModalType && departmentActionScreens ? departmentActionScreens[departmentModalType] : null;
  const designationModalScreen =
    designationModalType && designationActionScreens ? designationActionScreens[designationModalType] : null;
  const attendanceModalScreen =
    attendanceModalType && attendanceActionScreens ? attendanceActionScreens[attendanceModalType] : null;
  const leaveTypeModalScreen = leaveTypeModalType && leaveTypeActionScreens ? leaveTypeActionScreens[leaveTypeModalType] : null;
  const leaveRequestModalScreen =
    leaveRequestModalType && leaveRequestActionScreens ? leaveRequestActionScreens[leaveRequestModalType] : null;
  const documentModalScreen = documentModalType && documentActionScreens ? documentActionScreens[documentModalType] : null;
  const assetModalScreen = assetModalType && assetActionScreens ? assetActionScreens[assetModalType] : null;

  const openEmployeeModal = (type: ListActionModalType, rowIndex?: number) => {
    setEmployeeModalType(type);
    setSelectedEmployeeRow(typeof rowIndex === "number" ? rowIndex : null);
    setIsEmployeeProfileEditable(type !== "profile");
  };

  const closeEmployeeModal = () => {
    setEmployeeModalType(null);
    setSelectedEmployeeRow(null);
    setIsEmployeeProfileEditable(false);
  };

  const openDepartmentModal = (type: Exclude<ListActionModalType, "profile">, rowIndex?: number) => {
    setDepartmentModalType(type);
    setSelectedDepartmentRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeDepartmentModal = () => {
    setDepartmentModalType(null);
    setSelectedDepartmentRow(null);
  };

  const openDesignationModal = (type: Exclude<ListActionModalType, "profile">, rowIndex?: number) => {
    setDesignationModalType(type);
    setSelectedDesignationRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeDesignationModal = () => {
    setDesignationModalType(null);
    setSelectedDesignationRow(null);
  };

  const openAttendanceModal = (type: "manual" | "calendar", rowIndex?: number) => {
    setAttendanceModalType(type);
    setSelectedAttendanceRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeAttendanceModal = () => {
    setAttendanceModalType(null);
    setSelectedAttendanceRow(null);
  };

  const openLeaveTypeModal = (type: Exclude<ListActionModalType, "profile">, rowIndex?: number) => {
    setLeaveTypeModalType(type);
    setSelectedLeaveTypeRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeLeaveTypeModal = () => {
    setLeaveTypeModalType(null);
    setSelectedLeaveTypeRow(null);
  };

  const openLeaveRequestModal = (type: "create" | "view", rowIndex?: number) => {
    setLeaveRequestModalType(type);
    setSelectedLeaveRequestRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeLeaveRequestModal = () => {
    setLeaveRequestModalType(null);
    setSelectedLeaveRequestRow(null);
  };

  const openDocumentModal = (type: "upload" | "edit", rowIndex?: number) => {
    setDocumentModalType(type);
    setSelectedDocumentRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeDocumentModal = () => {
    setDocumentModalType(null);
    setSelectedDocumentRow(null);
  };

  const openAssetModal = (type: "assign" | "edit", rowIndex?: number) => {
    setAssetModalType(type);
    setSelectedAssetRow(typeof rowIndex === "number" ? rowIndex : null);
  };

  const closeAssetModal = () => {
    setAssetModalType(null);
    setSelectedAssetRow(null);
  };

  return (
    <SectionCard title={screen.title}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {(screen.filters ?? ["Search"]).map((filter) => (
            <button key={filter} className={filterClass} type="button">
              {filter}
              {filter !== "Search" && <ChevronDown className="h-4 w-4" />}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isEmployeeListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openEmployeeModal("create")}
            >
              Create Employee
            </button>
          )}
          {isDepartmentListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openDepartmentModal("create")}
            >
              Create Department
            </button>
          )}
          {isDesignationListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openDesignationModal("create")}
            >
              Create Designation
            </button>
          )}
          {isAttendanceListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openAttendanceModal("manual")}
            >
              Manual Entry
            </button>
          )}
          {isLeaveTypeListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openLeaveTypeModal("create")}
            >
              Create Leave Type
            </button>
          )}
          {isLeaveRequestListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openLeaveRequestModal("create")}
            >
              Create Leave
            </button>
          )}
          {isDocumentListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openDocumentModal("upload")}
            >
              Upload Document
            </button>
          )}
          {isAssetListScreen && (
            <button
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              type="button"
              onClick={() => openAssetModal("assign")}
            >
              Assign Asset
            </button>
          )}

          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-9 rounded-lg border border-border bg-white pl-9 pr-3 text-sm text-slate-700 outline-none ring-brand-200 focus:ring"
              placeholder="Search"
              type="text"
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className={clsx("w-full border-collapse text-sm", hasInlineActions ? "min-w-[980px]" : "min-w-[760px]")}>
          <thead>
            <tr className="bg-brand-50/70 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
              {columns.map((column) => (
                <th key={column} className="px-3 py-2">
                  {column}
                </th>
              ))}
              {hasInlineActions && <th className="px-3 py-2 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${screen.id}-${rowIndex}`} className="border-t border-border">
                {row.map((value, valueIndex) => (
                  <td key={`${screen.id}-${rowIndex}-${valueIndex}`} className="px-3 py-2 text-slate-600">
                    {value}
                  </td>
                ))}
                {hasInlineActions && (
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-2">
                      {isEmployeeListScreen && (
                        <>
                          <button
                            className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                            type="button"
                            onClick={() => openEmployeeModal("profile", rowIndex)}
                          >
                            Employee Profile
                          </button>
                        </>
                      )}
                      {isDepartmentListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openDepartmentModal("edit", rowIndex)}
                        >
                          Edit Department
                        </button>
                      )}
                      {isDesignationListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openDesignationModal("edit", rowIndex)}
                        >
                          Edit Designation
                        </button>
                      )}
                      {isAttendanceListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openAttendanceModal("calendar", rowIndex)}
                        >
                          View Attendance
                        </button>
                      )}
                      {isLeaveTypeListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openLeaveTypeModal("edit", rowIndex)}
                        >
                          Edit Leave Type
                        </button>
                      )}
                      {isLeaveRequestListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openLeaveRequestModal("view", rowIndex)}
                        >
                          View Leave
                        </button>
                      )}
                      {isDocumentListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openDocumentModal("edit", rowIndex)}
                        >
                          Edit Document
                        </button>
                      )}
                      {isAssetListScreen && (
                        <button
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                          type="button"
                          onClick={() => openAssetModal("edit", rowIndex)}
                        >
                          Edit Asset
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-xs font-semibold text-slate-500">
        <button className={filterClass} type="button">Prev</button>
        <button className={filterClass} type="button">1</button>
        <button className={filterClass} type="button">2</button>
        <button className={filterClass} type="button">Next</button>
      </div>

      {isEmployeeListScreen && employeeModalScreen && employeeModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{employeeModalScreen.title}</h3>
                {selectedEmployeeRow !== null && employeeModalType !== "create" && (
                  <p className="text-xs font-semibold text-slate-500">Employee Row {selectedEmployeeRow + 1}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {employeeModalType === "profile" && !isEmployeeProfileEditable && (
                  <button
                    className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
                    type="button"
                    onClick={() => setIsEmployeeProfileEditable(true)}
                  >
                    Edit Employee
                  </button>
                )}
                <button className="icon-btn" onClick={closeEmployeeModal} type="button" aria-label="Close modal">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(employeeModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList
                    fields={section.fields}
                    readOnly={employeeModalType === "profile" && !isEmployeeProfileEditable}
                  />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600" type="button" onClick={closeEmployeeModal}>
                Cancel
              </button>
              {employeeModalType === "profile" && !isEmployeeProfileEditable ? (
                <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" type="button" onClick={closeEmployeeModal}>
                  Close
                </button>
              ) : (
                <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" type="button" onClick={closeEmployeeModal}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isDepartmentListScreen && departmentModalScreen && departmentModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{departmentModalScreen.title}</h3>
                {selectedDepartmentRow !== null && (
                  <p className="text-xs font-semibold text-slate-500">Department Row {selectedDepartmentRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeDepartmentModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(departmentModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600" type="button" onClick={closeDepartmentModal}>
                Cancel
              </button>
              <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" type="button" onClick={closeDepartmentModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDesignationListScreen && designationModalScreen && designationModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{designationModalScreen.title}</h3>
                {selectedDesignationRow !== null && (
                  <p className="text-xs font-semibold text-slate-500">Designation Row {selectedDesignationRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeDesignationModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(designationModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600" type="button" onClick={closeDesignationModal}>
                Cancel
              </button>
              <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" type="button" onClick={closeDesignationModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isAttendanceListScreen && attendanceModalScreen && attendanceModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{attendanceModalScreen.title}</h3>
                {selectedAttendanceRow !== null && attendanceModalType === "calendar" && (
                  <p className="text-xs font-semibold text-slate-500">Employee Row {selectedAttendanceRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeAttendanceModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            {attendanceModalType === "manual" ? (
              <>
                <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
                  {(attendanceModalScreen.formSections ?? []).map((section) => (
                    <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                      <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                      <FormSectionList fields={section.fields} />
                    </article>
                  ))}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600"
                    type="button"
                    onClick={closeAttendanceModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                    type="button"
                    onClick={closeAttendanceModal}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="rounded-lg bg-brand-50 py-2 text-center text-xs font-bold text-brand-700">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, idx) => idx + 1).map((date) => (
                    <button
                      key={date}
                      className="rounded-lg border border-border bg-white py-3 text-sm font-semibold text-slate-600"
                      type="button"
                    >
                      {date}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                    type="button"
                    onClick={closeAttendanceModal}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isLeaveTypeListScreen && leaveTypeModalScreen && leaveTypeModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{leaveTypeModalScreen.title}</h3>
                {selectedLeaveTypeRow !== null && (
                  <p className="text-xs font-semibold text-slate-500">Leave Type Row {selectedLeaveTypeRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeLeaveTypeModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(leaveTypeModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600"
                type="button"
                onClick={closeLeaveTypeModal}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                type="button"
                onClick={closeLeaveTypeModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isLeaveRequestListScreen && leaveRequestModalScreen && leaveRequestModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{leaveRequestModalScreen.title}</h3>
                {selectedLeaveRequestRow !== null && (
                  <p className="text-xs font-semibold text-slate-500">Leave Row {selectedLeaveRequestRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeLeaveRequestModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(leaveRequestModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600"
                type="button"
                onClick={closeLeaveRequestModal}
              >
                Cancel
              </button>
              {leaveRequestModalType === "view" ? (
                <button
                  className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                  type="button"
                  onClick={closeLeaveRequestModal}
                >
                  Close
                </button>
              ) : (
                <button
                  className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                  type="button"
                  onClick={closeLeaveRequestModal}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isDocumentListScreen && documentModalScreen && documentModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{documentModalScreen.title}</h3>
                {selectedDocumentRow !== null && (
                  <p className="text-xs font-semibold text-slate-500">Document Row {selectedDocumentRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeDocumentModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(documentModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600"
                type="button"
                onClick={closeDocumentModal}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                type="button"
                onClick={closeDocumentModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isAssetListScreen && assetModalScreen && assetModalType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{assetModalScreen.title}</h3>
                {selectedAssetRow !== null && (
                  <p className="text-xs font-semibold text-slate-500">Asset Row {selectedAssetRow + 1}</p>
                )}
              </div>
              <button className="icon-btn" onClick={closeAssetModal} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(assetModalScreen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600"
                type="button"
                onClick={closeAssetModal}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                type="button"
                onClick={closeAssetModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};

const FormScreen = ({ screen }: { screen: ScreenDefinition }) => {
  const [open, setOpen] = useState(true);
  const isEdit = screen.type === "edit";

  return (
    <SectionCard title={screen.title}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">{screen.description ?? "Create/Edit via Modal Dialog"}</p>
        <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" onClick={() => setOpen(true)} type="button">
          Open {isEdit ? "Edit" : "Create"} Modal
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-border bg-white p-4 shadow-soft md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">{screen.title} Form</h3>
              <button className="icon-btn" onClick={() => setOpen(false)} type="button" aria-label="Close modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "70vh" }}>
              {(screen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600" type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" type="button" onClick={() => setOpen(false)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};

const ViewScreen = ({ screen }: { screen: ScreenDefinition }) => {
  const [open, setOpen] = useState(true);

  return (
    <SectionCard title={screen.title}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">{screen.description ?? "View via Drawer"}</p>
        <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white" onClick={() => setOpen(true)} type="button">
          Open Drawer
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-900/20">
          <aside className="absolute inset-y-0 right-0 w-full max-w-md border-l border-border bg-white p-4 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">{screen.title}</h3>
              <button className="icon-btn" onClick={() => setOpen(false)} type="button" aria-label="Close drawer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "88vh" }}>
              {(screen.formSections ?? []).map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-page p-3">
                  <h4 className="mb-2 text-sm font-bold text-slate-700">{section.title}</h4>
                  <FormSectionList fields={section.fields} />
                </article>
              ))}
            </div>
          </aside>
        </div>
      )}
    </SectionCard>
  );
};

const ReportScreen = ({ screen }: { screen: ScreenDefinition }) => (
  <SectionCard title={screen.title}>
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {(screen.filters ?? []).map((filter) => (
        <button key={filter} className={filterClass} type="button">
          {filter}
          <ChevronDown className="h-4 w-4" />
        </button>
      ))}
    </div>

    <div className="rounded-xl border border-border bg-white p-3">
      <h4 className="mb-2 text-sm font-bold text-slate-700">Export Options</h4>
      <div className="flex flex-wrap gap-2">
        {(screen.exportFormats ?? []).map((format) => (
          <button key={format} className="rounded-lg border border-border bg-page px-3 py-1.5 text-xs font-semibold text-slate-600" type="button">
            Export {format}
          </button>
        ))}
      </div>
    </div>
  </SectionCard>
);

const MatrixScreen = ({ screen }: { screen: ScreenDefinition }) => {
  const columns = screen.matrixColumns ?? [];
  const rows = screen.matrixRows ?? [];

  return (
    <SectionCard title={screen.title}>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-brand-50/70 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
              <th className="px-3 py-2">Module</th>
              {columns.map((column) => (
                <th key={column} className="px-3 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row} className="border-t border-border">
                <td className="px-3 py-2 font-semibold text-slate-700">{row}</td>
                {columns.map((column, colIndex) => (
                  <td key={`${row}-${column}`} className="px-3 py-2">
                    <div className={clsx("inline-flex h-5 w-5 items-center justify-center rounded border", (rowIndex + colIndex) % 2 === 0 ? "border-brand-500 bg-brand-50 text-brand-600" : "border-border bg-white text-slate-300")}>
                      {(rowIndex + colIndex) % 2 === 0 && <Check className="h-3 w-3" />}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

const CalendarScreen = ({ screen }: { screen: ScreenDefinition }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = Array.from({ length: 35 }, (_, idx) => idx + 1);

  return (
    <SectionCard title={screen.title}>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="rounded-lg bg-brand-50 py-2 text-center text-xs font-bold text-brand-700">
            {day}
          </div>
        ))}
        {dates.map((date) => (
          <button key={date} className="rounded-lg border border-border bg-white py-3 text-sm font-semibold text-slate-600" type="button">
            {date}
          </button>
        ))}
      </div>
    </SectionCard>
  );
};

const SpecPageRenderer = ({ screen }: { screen: ScreenDefinition }) => {
  if (screen.type === "list") return <ListScreen screen={screen} />;
  if (screen.type === "create" || screen.type === "edit") return <FormScreen screen={screen} />;
  if (screen.type === "view") return <ViewScreen screen={screen} />;
  if (screen.type === "report") return <ReportScreen screen={screen} />;
  if (screen.type === "matrix") return <MatrixScreen screen={screen} />;
  if (screen.type === "calendar") return <CalendarScreen screen={screen} />;

  return (
    <SectionCard title={screen.title}>
      <p className="text-sm text-slate-600">This page follows the {screen.type} pattern defined in the ERP specification.</p>
    </SectionCard>
  );
};

export default SpecPageRenderer;
