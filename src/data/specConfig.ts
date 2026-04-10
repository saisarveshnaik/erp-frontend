
import type { FormSection, ModuleDefinition, ScreenDefinition, ScreenType } from "../types/spec";

const screen = (
  id: string,
  title: string,
  path: string,
  type: ScreenType,
  options: Omit<ScreenDefinition, "id" | "title" | "path" | "type"> = {}
): ScreenDefinition => ({ id, title, path, type, ...options });

const field = (label: string, type: FormSection["fields"][number]["type"]) => ({ label, type });

const employeeFormSections: FormSection[] = [
  {
    title: "Basic",
    fields: [
      field("Employee ID", "text"),
      field("First Name", "text"),
      field("Last Name", "text"),
      field("Email", "email"),
      field("Phone", "phone"),
      field("Gender", "select"),
      field("DOB", "date"),
      field("Marital Status", "select"),
      field("Photo", "image")
    ]
  },
  {
    title: "Job",
    fields: [
      field("Department", "select"),
      field("Designation", "select"),
      field("Manager", "select"),
      field("Joining Date", "date"),
      field("Employment Type", "select"),
      field("Work Location", "select"),
      field("Probation End", "date"),
      field("Status", "select")
    ]
  },
  {
    title: "Salary",
    fields: [
      field("Basic Salary", "currency"),
      field("Allowances", "currency"),
      field("Bank Name", "text"),
      field("Account Number", "text"),
      field("IBAN", "text"),
      field("Payment Method", "select")
    ]
  },
  {
    title: "Identity",
    fields: [
      field("National ID", "text"),
      field("Passport", "text"),
      field("Visa Number", "text"),
      field("Visa Expiry", "date")
    ]
  },
  {
    title: "Address",
    fields: [
      field("Address1", "text"),
      field("Address2", "text"),
      field("City", "text"),
      field("State", "text"),
      field("Country", "select"),
      field("Postal Code", "text")
    ]
  },
  {
    title: "Emergency",
    fields: [field("Contact Name", "text"), field("Relationship", "text"), field("Phone", "phone")]
  }
];

export const moduleConfig: ModuleDefinition[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    submodules: [
      {
        id: "overview",
        title: "Overview",
        screens: [screen("dashboard-home", "Dashboard", "/dashboard", "dashboard")]
      }
    ]
  },
  {
    id: "hr",
    title: "HR",
    submodules: [
      {
        id: "employees",
        title: "Employees",
        screens: [
          screen("employees-list", "Employee List", "/hr/employees/list", "list", {
            tableName: "EmployeeTable",
            tableColumns: [
              "Employee ID",
              "Name",
              "Email",
              "Phone",
              "Department",
              "Designation",
              "Joining Date",
              "Employment Type",
              "Status"
            ],
            filters: ["Search", "Department", "Designation", "Status", "Joining Date"]
          }),
          screen("employees-create", "Create Employee", "/hr/employees/create", "create", {
            formSections: employeeFormSections,
            description: "Create/Edit via Modal Dialog"
          }),
          screen("employees-edit", "Edit Employee", "/hr/employees/edit", "edit", {
            formSections: employeeFormSections,
            description: "Create/Edit via Modal Dialog"
          }),
          screen("employees-profile", "Employee Profile", "/hr/employees/profile", "view", {
            formSections: employeeFormSections,
            description: "View via Drawer"
          })
        ]
      },
      {
        id: "departments",
        title: "Departments",
        screens: [
          screen("departments-list", "Department List", "/hr/departments/list", "list", {
            tableColumns: ["Department Name", "Head", "Employee Count", "Status"],
            filters: ["Search", "Status"]
          }),
          screen("departments-create", "Create Department", "/hr/departments/create", "create", {
            formSections: [
              {
                title: "Department Form",
                fields: [
                  field("Department Name", "text"),
                  field("Department Head", "select"),
                  field("Description", "textarea"),
                  field("Status", "select")
                ]
              }
            ]
          }),
          screen("departments-edit", "Edit Department", "/hr/departments/edit", "edit", {
            formSections: [
              {
                title: "Department Form",
                fields: [
                  field("Department Name", "text"),
                  field("Department Head", "select"),
                  field("Description", "textarea"),
                  field("Status", "select")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "designations",
        title: "Designations",
        screens: [
          screen("designations-list", "Designation List", "/hr/designations/list", "list", {
            tableColumns: ["Name", "Department", "Employee Count", "Status"],
            filters: ["Search", "Department", "Status"]
          }),
          screen("designations-create", "Create Designation", "/hr/designations/create", "create", {
            formSections: [
              {
                title: "Designation Form",
                fields: [
                  field("Name", "text"),
                  field("Department", "select"),
                  field("Description", "textarea"),
                  field("Status", "select")
                ]
              }
            ]
          }),
          screen("designations-edit", "Edit Designation", "/hr/designations/edit", "edit", {
            formSections: [
              {
                title: "Designation Form",
                fields: [
                  field("Name", "text"),
                  field("Department", "select"),
                  field("Description", "textarea"),
                  field("Status", "select")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "attendance",
        title: "Attendance",
        screens: [
          screen("attendance-list", "Attendance List", "/hr/attendance/list", "list", {
            tableColumns: ["Employee", "Date", "Check In", "Check Out", "Work Hours", "Overtime", "Status"],
            filters: ["Search", "Date Range", "Status"]
          }),
          screen("attendance-manual", "Manual Entry", "/hr/attendance/manual-entry", "create", {
            formSections: [
              {
                title: "Attendance Form",
                fields: [
                  field("Employee", "select"),
                  field("Date", "date"),
                  field("Check In", "time"),
                  field("Check Out", "time"),
                  field("Status", "select"),
                  field("Notes", "textarea")
                ]
              }
            ]
          }),
          screen("attendance-calendar", "Attendance Calendar", "/hr/attendance/calendar", "calendar", {
            description: "Attendance calendar view"
          })
        ]
      },
      {
        id: "leave-types",
        title: "Leave Types",
        screens: [
          screen("leave-types-list", "Leave Type List", "/hr/leave-types/list", "list", {
            tableColumns: ["Name", "Days Allowed", "Carry Forward", "Status"],
            filters: ["Search", "Status"]
          }),
          screen("leave-types-create", "Create Leave Type", "/hr/leave-types/create", "create", {
            formSections: [
              {
                title: "Leave Type Form",
                fields: [
                  field("Leave Name", "text"),
                  field("Days Allowed", "number"),
                  field("Carry Forward", "switch"),
                  field("Requires Approval", "switch"),
                  field("Status", "select")
                ]
              }
            ]
          }),
          screen("leave-types-edit", "Edit Leave Type", "/hr/leave-types/edit", "edit", {
            formSections: [
              {
                title: "Leave Type Form",
                fields: [
                  field("Leave Name", "text"),
                  field("Days Allowed", "number"),
                  field("Carry Forward", "switch"),
                  field("Requires Approval", "switch"),
                  field("Status", "select")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "leave-request",
        title: "Leave Requests",
        screens: [
          screen("leave-request-list", "Leave List", "/hr/leave-requests/list", "list", {
            tableColumns: ["Employee", "Leave Type", "Start Date", "End Date", "Days", "Status"],
            filters: ["Search", "Leave Type", "Status", "Date Range"]
          }),
          screen("leave-request-create", "Create Leave", "/hr/leave-requests/create", "create", {
            formSections: [
              {
                title: "Leave Request Form",
                fields: [
                  field("Employee", "select"),
                  field("Leave Type", "select"),
                  field("Start Date", "date"),
                  field("End Date", "date"),
                  field("Reason", "textarea"),
                  field("Attachment", "file")
                ]
              }
            ]
          }),
          screen("leave-request-view", "View Leave", "/hr/leave-requests/view", "view", {
            formSections: [
              {
                title: "Leave Details",
                fields: [
                  field("Employee", "text"),
                  field("Leave Type", "text"),
                  field("Start Date", "date"),
                  field("End Date", "date"),
                  field("Days", "number"),
                  field("Status", "text")
                ]
              }
            ],
            description: "View via Drawer"
          })
        ]
      },
      {
        id: "documents",
        title: "Documents",
        screens: [
          screen("documents-list", "Document List", "/hr/documents/list", "list", {
            tableColumns: ["Employee", "Document Name", "Type", "Upload Date", "Expiry"],
            filters: ["Search", "Type", "Expiry"]
          }),
          screen("documents-upload", "Upload Document", "/hr/documents/upload", "create", {
            formSections: [
              {
                title: "Document Form",
                fields: [
                  field("Employee", "select"),
                  field("Document Name", "text"),
                  field("Document Type", "select"),
                  field("File", "file"),
                  field("Expiry Date", "date")
                ]
              }
            ]
          }),
          screen("documents-edit", "Edit Document", "/hr/documents/edit", "edit", {
            formSections: [
              {
                title: "Document Form",
                fields: [
                  field("Employee", "select"),
                  field("Document Name", "text"),
                  field("Document Type", "select"),
                  field("File", "file"),
                  field("Expiry Date", "date")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "assets",
        title: "Assets",
        screens: [
          screen("assets-list", "Asset List", "/hr/assets/list", "list", {
            tableColumns: ["Asset Name", "Asset Code", "Employee", "Issue Date", "Return Date", "Status"],
            filters: ["Search", "Status", "Date Range"]
          }),
          screen("assets-assign", "Assign Asset", "/hr/assets/assign", "create", {
            formSections: [
              {
                title: "Asset Form",
                fields: [
                  field("Asset Name", "text"),
                  field("Asset Code", "text"),
                  field("Employee", "select"),
                  field("Issue Date", "date"),
                  field("Return Date", "date"),
                  field("Condition", "textarea")
                ]
              }
            ]
          }),
          screen("assets-edit", "Edit Asset", "/hr/assets/edit", "edit", {
            formSections: [
              {
                title: "Asset Form",
                fields: [
                  field("Asset Name", "text"),
                  field("Asset Code", "text"),
                  field("Employee", "select"),
                  field("Issue Date", "date"),
                  field("Return Date", "date"),
                  field("Condition", "textarea")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "shifts",
        title: "Shifts",
        screens: [
          screen("shifts-list", "Shift List", "/hr/shifts/list", "list", {
            tableColumns: ["Shift Name", "Start Time", "End Time", "Status"],
            filters: ["Search", "Status"]
          })
        ]
      },
      {
        id: "holidays",
        title: "Holidays",
        screens: [
          screen("holidays-list", "Holiday List", "/hr/holidays/list", "list", {
            tableColumns: ["Holiday Name", "Date", "Department", "Status"],
            filters: ["Search", "Department", "Date Range"]
          })
        ]
      },
      {
        id: "payroll",
        title: "Payroll",
        screens: [
          screen("payroll-list", "Payroll List", "/hr/payroll/list", "list", {
            tableColumns: ["Employee", "Period", "Gross Pay", "Net Pay", "Status"],
            filters: ["Search", "Period", "Status"]
          })
        ]
      }
    ]
  },
  {
    id: "finance",
    title: "Finance",
    submodules: [
      {
        id: "invoices",
        title: "Invoices",
        screens: [
          screen("invoices-list", "Invoice List", "/finance/invoices/list", "list", {
            tableColumns: ["Invoice Number", "Customer", "Amount", "Tax", "Total", "Date", "Status"],
            filters: ["Search", "Status", "Date Range"]
          }),
          screen("invoices-create", "Create Invoice", "/finance/invoices/create", "create", {
            formSections: [
              {
                title: "Invoice Form",
                fields: [
                  field("Customer", "select"),
                  field("Invoice Date", "date"),
                  field("Due Date", "date"),
                  field("Items", "textarea"),
                  field("Subtotal", "currency"),
                  field("Tax", "currency"),
                  field("Total", "currency"),
                  field("Status", "select")
                ]
              },
              {
                title: "Invoice Item Fields",
                fields: [
                  field("Product", "select"),
                  field("Quantity", "number"),
                  field("Price", "currency"),
                  field("Tax", "number"),
                  field("Total", "currency")
                ]
              }
            ]
          }),
          screen("invoices-edit", "Edit Invoice", "/finance/invoices/edit", "edit", {
            formSections: [
              {
                title: "Invoice Form",
                fields: [
                  field("Customer", "select"),
                  field("Invoice Date", "date"),
                  field("Due Date", "date"),
                  field("Items", "textarea"),
                  field("Subtotal", "currency"),
                  field("Tax", "currency"),
                  field("Total", "currency"),
                  field("Status", "select")
                ]
              }
            ]
          }),
          screen("invoices-view", "View Invoice", "/finance/invoices/view", "view", {
            formSections: [
              {
                title: "Invoice Details",
                fields: [
                  field("Invoice Number", "text"),
                  field("Customer", "text"),
                  field("Amount", "currency"),
                  field("Date", "date"),
                  field("Status", "text")
                ]
              }
            ],
            description: "View via Drawer"
          })
        ]
      },
      {
        id: "expenses",
        title: "Expenses",
        screens: [
          screen("expenses-list", "Expense List", "/finance/expenses/list", "list", {
            tableColumns: ["Expense ID", "Category", "Amount", "Employee", "Date", "Status"],
            filters: ["Search", "Category", "Date Range", "Status"]
          }),
          screen("expenses-create", "Create Expense", "/finance/expenses/create", "create", {
            formSections: [
              {
                title: "Expense Form",
                fields: [
                  field("Category", "select"),
                  field("Amount", "currency"),
                  field("Date", "date"),
                  field("Employee", "select"),
                  field("Receipt", "file"),
                  field("Notes", "textarea")
                ]
              }
            ]
          }),
          screen("expenses-edit", "Edit Expense", "/finance/expenses/edit", "edit", {
            formSections: [
              {
                title: "Expense Form",
                fields: [
                  field("Category", "select"),
                  field("Amount", "currency"),
                  field("Date", "date"),
                  field("Employee", "select"),
                  field("Receipt", "file"),
                  field("Notes", "textarea")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "payments",
        title: "Payments",
        screens: [
          screen("payments-list", "Payments List", "/finance/payments/list", "list", {
            tableColumns: ["Payment ID", "Invoice", "Amount", "Date", "Method", "Status"],
            filters: ["Search", "Method", "Date Range", "Status"]
          }),
          screen("payments-record", "Record Payment", "/finance/payments/record", "create", {
            formSections: [
              {
                title: "Payment Form",
                fields: [
                  field("Invoice", "select"),
                  field("Amount", "currency"),
                  field("Date", "date"),
                  field("Method", "select"),
                  field("Reference", "text")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "accounts",
        title: "Accounts",
        screens: [
          screen("accounts-list", "Accounts List", "/finance/accounts/list", "list", {
            tableColumns: ["Account Name", "Account Number", "Type", "Balance", "Status"],
            filters: ["Search", "Type", "Status"]
          })
        ]
      },
      {
        id: "transactions",
        title: "Transactions",
        screens: [
          screen("transactions-list", "Transactions List", "/finance/transactions/list", "list", {
            tableColumns: ["Transaction ID", "Account", "Type", "Amount", "Date", "Status"],
            filters: ["Search", "Type", "Date Range", "Status"]
          })
        ]
      },
      {
        id: "vendors",
        title: "Vendors",
        screens: [
          screen("vendors-list", "Vendors List", "/finance/vendors/list", "list", {
            tableColumns: ["Vendor Name", "Phone", "Email", "Address", "Status"],
            filters: ["Search", "Status"]
          })
        ]
      },
      {
        id: "customers",
        title: "Customers",
        screens: [
          screen("customers-list", "Customers List", "/finance/customers/list", "list", {
            tableColumns: ["Customer Name", "Phone", "Email", "Address", "Status"],
            filters: ["Search", "Status"]
          })
        ]
      }
    ]
  },
  {
    id: "inventory",
    title: "Inventory",
    submodules: [
      {
        id: "products",
        title: "Products",
        screens: [
          screen("products-list", "Product List", "/inventory/products/list", "list", {
            tableColumns: ["Product Name", "SKU", "Category", "Price", "Stock", "Status"],
            filters: ["Search", "Category", "Status"]
          }),
          screen("products-create", "Create Product", "/inventory/products/create", "create", {
            formSections: [
              {
                title: "Product Form",
                fields: [
                  field("Product Name", "text"),
                  field("SKU", "text"),
                  field("Category", "select"),
                  field("Cost Price", "currency"),
                  field("Selling Price", "currency"),
                  field("Stock", "number"),
                  field("Unit", "select"),
                  field("Description", "textarea")
                ]
              }
            ]
          }),
          screen("products-edit", "Edit Product", "/inventory/products/edit", "edit", {
            formSections: [
              {
                title: "Product Form",
                fields: [
                  field("Product Name", "text"),
                  field("SKU", "text"),
                  field("Category", "select"),
                  field("Cost Price", "currency"),
                  field("Selling Price", "currency"),
                  field("Stock", "number"),
                  field("Unit", "select"),
                  field("Description", "textarea")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "suppliers",
        title: "Suppliers",
        screens: [
          screen("suppliers-list", "Supplier List", "/inventory/suppliers/list", "list", {
            tableColumns: ["Supplier Name", "Phone", "Email", "Address", "Status"],
            filters: ["Search", "Status"]
          }),
          screen("suppliers-create", "Create Supplier", "/inventory/suppliers/create", "create", {
            formSections: [
              {
                title: "Supplier Form",
                fields: [field("Name", "text"), field("Phone", "phone"), field("Email", "email"), field("Address", "textarea")]
              }
            ]
          }),
          screen("suppliers-edit", "Edit Supplier", "/inventory/suppliers/edit", "edit", {
            formSections: [
              {
                title: "Supplier Form",
                fields: [field("Name", "text"), field("Phone", "phone"), field("Email", "email"), field("Address", "textarea")]
              }
            ]
          })
        ]
      },
      {
        id: "categories",
        title: "Categories",
        screens: [
          screen("categories-list", "Category List", "/inventory/categories/list", "list", {
            tableColumns: ["Category Name", "Parent Category", "Product Count", "Status"],
            filters: ["Search", "Status"]
          })
        ]
      },
      {
        id: "purchase-orders",
        title: "Purchase Orders",
        screens: [
          screen("po-list", "Purchase Order List", "/inventory/purchase-orders/list", "list", {
            tableColumns: ["PO Number", "Supplier", "Date", "Total", "Status"],
            filters: ["Search", "Date Range", "Status"]
          })
        ]
      },
      {
        id: "stock",
        title: "Stock",
        screens: [
          screen("stock-list", "Stock List", "/inventory/stock/list", "list", {
            tableColumns: ["Product", "Warehouse", "In Stock", "Reserved", "Available"],
            filters: ["Search", "Warehouse"]
          })
        ]
      },
      {
        id: "warehouses",
        title: "Warehouses",
        screens: [
          screen("warehouses-list", "Warehouse List", "/inventory/warehouses/list", "list", {
            tableColumns: ["Warehouse", "Location", "Manager", "Capacity", "Status"],
            filters: ["Search", "Status"]
          })
        ]
      }
    ]
  },
  {
    id: "reports",
    title: "Reports",
    submodules: [
      {
        id: "reports-hub",
        title: "Report Center",
        screens: [
          screen("hr-reports", "HR Reports", "/reports/hr", "report", {
            filters: ["Date Range", "Department", "Category", "Employee"],
            exportFormats: ["PDF", "Excel", "CSV"]
          }),
          screen("finance-reports", "Finance Reports", "/reports/finance", "report", {
            filters: ["Date Range", "Department", "Category", "Employee"],
            exportFormats: ["PDF", "Excel", "CSV"]
          }),
          screen("inventory-reports", "Inventory Reports", "/reports/inventory", "report", {
            filters: ["Date Range", "Department", "Category", "Employee"],
            exportFormats: ["PDF", "Excel", "CSV"]
          })
        ]
      }
    ]
  },
  {
    id: "users",
    title: "Users",
    submodules: [
      {
        id: "users-model",
        title: "Users",
        screens: [
          screen("users-list", "Users List", "/users/list", "list", {
            tableColumns: ["Name", "Email", "Role", "Department", "Status"],
            filters: ["Search", "Role", "Department", "Status"]
          }),
          screen("users-create", "Create User", "/users/create", "create", {
            formSections: [
              {
                title: "User Form",
                fields: [
                  field("Name", "text"),
                  field("Email", "email"),
                  field("Phone", "phone"),
                  field("Role", "select"),
                  field("Department", "select"),
                  field("Password", "password"),
                  field("Status", "switch")
                ]
              }
            ]
          }),
          screen("users-edit", "Edit User", "/users/edit", "edit", {
            formSections: [
              {
                title: "User Form",
                fields: [
                  field("Name", "text"),
                  field("Email", "email"),
                  field("Phone", "phone"),
                  field("Role", "select"),
                  field("Department", "select"),
                  field("Password", "password"),
                  field("Status", "switch")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "roles-model",
        title: "Roles",
        screens: [
          screen("roles-list", "Roles List", "/users/roles/list", "list", {
            tableColumns: ["Role Name", "Users Count", "Status"],
            filters: ["Search", "Status"]
          }),
          screen("roles-create", "Create Role", "/users/roles/create", "create", {
            formSections: [
              {
                title: "Role Form",
                fields: [field("Role Name", "text"), field("Description", "textarea"), field("Status", "switch")]
              }
            ]
          }),
          screen("roles-edit", "Edit Role", "/users/roles/edit", "edit", {
            formSections: [
              {
                title: "Role Form",
                fields: [field("Role Name", "text"), field("Description", "textarea"), field("Status", "switch")]
              }
            ]
          })
        ]
      },
      {
        id: "permissions-model",
        title: "Permissions",
        screens: [
          screen("permissions-matrix", "Permissions Matrix", "/users/permissions/matrix", "matrix", {
            matrixColumns: ["View", "Create", "Edit", "Delete", "Export", "Approve"],
            matrixRows: ["Dashboard", "HR", "Finance", "Inventory", "Reports", "Users", "Settings"]
          })
        ]
      }
    ]
  },
  {
    id: "settings",
    title: "Settings",
    submodules: [
      {
        id: "company",
        title: "Company",
        screens: [
          screen("settings-company", "Company Settings", "/settings/company", "edit", {
            formSections: [
              {
                title: "Company Form",
                fields: [
                  field("Company Name", "text"),
                  field("Phone", "phone"),
                  field("Email", "email"),
                  field("Address", "textarea"),
                  field("Logo", "image"),
                  field("Currency", "select"),
                  field("Timezone", "select")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "currency",
        title: "Currency",
        screens: [
          screen("settings-currency", "Currency Settings", "/settings/currency", "edit", {
            formSections: [
              {
                title: "Currency Config",
                fields: [field("Base Currency", "select"), field("Symbol", "text"), field("Decimal Precision", "number")]
              }
            ]
          })
        ]
      },
      {
        id: "email-config",
        title: "Email Config",
        screens: [
          screen("settings-email", "Email Configuration", "/settings/email-config", "edit", {
            formSections: [
              {
                title: "Email Config",
                fields: [
                  field("SMTP Host", "text"),
                  field("SMTP Port", "number"),
                  field("Username", "text"),
                  field("Password", "password"),
                  field("TLS", "switch")
                ]
              }
            ]
          })
        ]
      },
      {
        id: "tax-config",
        title: "Tax Config",
        screens: [
          screen("settings-tax", "Tax Configuration", "/settings/tax-config", "edit", {
            formSections: [
              {
                title: "Tax Config",
                fields: [field("Tax Name", "text"), field("Tax Percentage", "number"), field("Status", "switch")]
              }
            ]
          })
        ]
      },
      {
        id: "system-preferences",
        title: "System Preferences",
        screens: [
          screen("settings-system", "System Preferences", "/settings/system-preferences", "edit", {
            formSections: [
              {
                title: "System Preferences",
                fields: [field("Date Format", "select"), field("Time Format", "select"), field("Language", "select"), field("Status", "switch")]
              }
            ]
          })
        ]
      }
    ]
  }
];

export const allScreens = moduleConfig.flatMap((module) => module.submodules.flatMap((submodule) => submodule.screens));

export const defaultRoute = "/dashboard";

export const screenTitleByPath = new Map(allScreens.map((item) => [item.path, item.title]));

export const getScreenByPath = (path: string) => allScreens.find((item) => item.path === path);
