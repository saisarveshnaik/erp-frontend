import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import SectionCard from "../SectionCard";

type TrendPeriod = "last day" | "last month";
type TrendDisplay = "absolute" | "percent";

type StatCard = {
  label: string;
  value: string;
  trendRate: number;
  trendPeriod: TrendPeriod;
  trendDisplay: TrendDisplay;
};

const statCards: StatCard[] = [
  { label: "Total Employees", value: "200", trendRate: 2.5, trendPeriod: "last day", trendDisplay: "absolute" },
  { label: "Present Today", value: "182", trendRate: 1.7, trendPeriod: "last day", trendDisplay: "absolute" },
  { label: "On Leave", value: "14", trendRate: -12.5, trendPeriod: "last day", trendDisplay: "absolute" },
  { label: "Monthly Expenses", value: "$420K", trendRate: -4.2, trendPeriod: "last month", trendDisplay: "percent" },
  { label: "Monthly Revenue", value: "$780K", trendRate: 7.3, trendPeriod: "last month", trendDisplay: "percent" },
  { label: "Pending Approvals", value: "9", trendRate: -18.2, trendPeriod: "last day", trendDisplay: "absolute" },
  { label: "Low Stock", value: "23", trendRate: -9.5, trendPeriod: "last day", trendDisplay: "absolute" }
];

const parseNumericValue = (value: string) => Number(value.replace(/[^0-9.]/g, ""));

const formatRate = (rate: number) => {
  const absRate = Math.abs(rate);
  const precision = Number.isInteger(absRate) ? 0 : 1;
  return `${rate >= 0 ? "+" : "-"}${absRate.toFixed(precision)}%`;
};

const formatAbsoluteChange = (delta: number, originalValue: string) => {
  const rounded = Math.max(1, Math.round(Math.abs(delta)));
  const sign = delta >= 0 ? "+" : "-";
  const hasCurrency = originalValue.includes("$");
  const suffixMatch = originalValue.match(/[KMB]$/i);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const prefix = hasCurrency ? "$" : "";
  return `${sign}${prefix}${rounded}${suffix}`;
};

const getCardSubtext = (card: StatCard) => {
  if (card.trendDisplay === "percent") {
    return {
      tone: card.trendRate >= 0 ? "positive" : "negative",
      text: `${formatRate(card.trendRate)} from ${card.trendPeriod}`
    };
  }

  const currentValue = parseNumericValue(card.value);
  const previousValue = currentValue / (1 + card.trendRate / 100);
  const absoluteChange = currentValue - previousValue;

  return {
    tone: absoluteChange >= 0 ? "positive" : "negative",
    text: `${formatAbsoluteChange(absoluteChange, card.value)} from ${card.trendPeriod}`
  };
};

const employeesByDepartment = [
  { name: "Engineering", value: 72 },
  { name: "HR", value: 24 },
  { name: "Finance", value: 19 },
  { name: "Inventory", value: 28 },
  { name: "Operations", value: 57 }
];

const attendanceTrend = [
  { month: "Jan", value: 84 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 87 },
  { month: "Apr", value: 89 },
  { month: "May", value: 86 },
  { month: "Jun", value: 90 }
];

const revenueVsExpense = [
  { month: "Jan", revenue: 110, expense: 75 },
  { month: "Feb", revenue: 126, expense: 82 },
  { month: "Mar", revenue: 141, expense: 91 },
  { month: "Apr", revenue: 156, expense: 97 },
  { month: "May", revenue: 164, expense: 102 },
  { month: "Jun", revenue: 176, expense: 110 }
];

const expenseCategories = [
  { name: "Payroll", value: 45 },
  { name: "Software", value: 18 },
  { name: "Utilities", value: 12 },
  { name: "Travel", value: 10 },
  { name: "Others", value: 15 }
];

const recentEmployees = [
  ["Ava Harper", "Engineering", "2026-02-14", "Active"],
  ["Mason Ellis", "HR", "2026-02-12", "Active"],
  ["Noah Clarke", "Finance", "2026-02-09", "Probation"],
  ["Liam Bennett", "Inventory", "2026-02-05", "Active"]
];

const pendingLeaves = [
  ["Sophia Reed", "Sick Leave", "2026-04-11 to 2026-04-12", "2", "Pending"],
  ["Ethan Scott", "Annual Leave", "2026-04-13 to 2026-04-15", "3", "Pending"],
  ["Olivia Ward", "Personal Leave", "2026-04-16", "1", "Pending"],
  ["Daniel Young", "Annual Leave", "2026-04-18 to 2026-04-19", "2", "Pending"]
];

const recentTransactions = [
  ["INV-2301", "Blue Orion Ltd", "$11,420", "2026-04-07", "Paid"],
  ["INV-2302", "Northbyte Inc", "$7,800", "2026-04-07", "Pending"],
  ["INV-2303", "Atlas Retail", "$14,250", "2026-04-06", "Paid"],
  ["INV-2304", "Greenline Co", "$6,990", "2026-04-06", "Pending"]
];

const pieColors = ["#6f4db8", "#8f6cde", "#b197ef", "#ccb9f5", "#ded4fb"];

type MiniTableProps = {
  title: string;
  columns: string[];
  rows: string[][];
};

const MiniTable = ({ title, columns, rows }: MiniTableProps) => (
  <SectionCard title={title}>
    <div className="space-y-2 md:hidden">
      {rows.map((row, idx) => (
        <article key={`${title}-mobile-${idx}`} className="rounded-lg border border-border bg-white p-3">
          <p className="text-sm font-semibold text-slate-800">{row[0]}</p>
          <div className="mt-2 space-y-1 text-xs text-slate-600">
            {columns.slice(1).map((column, colIdx) => (
              <p key={`${title}-mobile-${idx}-${column}`}>
                <span className="font-semibold text-slate-500">{column}: </span>
                {row[colIdx + 1]}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>

    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="bg-brand-50/70 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
            {columns.map((column) => (
              <th key={column} className="px-3 py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={`${title}-${idx}`} className="border-t border-border">
              {row.map((value, cellIdx) => (
                <td key={`${title}-${idx}-${cellIdx}`} className="px-3 py-2 text-slate-600">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SectionCard>
);

const DashboardPage = () => (
  <div className="space-y-4">
    <section className="rounded-2xl border border-brand-100 bg-brand-50/40 px-5 py-4">
      <h2 className="text-3xl font-semibold text-slate-800">Hello,John Doe.</h2>
    </section>

    <SectionCard title="KPI Cards">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const trend = getCardSubtext(card);
          return (
            <article key={card.label} className="rounded-xl border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">{card.value}</p>
              <p className={`mt-2 text-xs font-semibold ${trend.tone === "positive" ? "text-success" : "text-danger"}`}>
                {trend.text}
              </p>
            </article>
          );
        })}
      </div>
    </SectionCard>

    <SectionCard title="Charts">
      <div className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-white p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Employees by Department</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={employeesByDepartment} dataKey="value" nameKey="name" innerRadius={42} outerRadius={78}>
                  {employeesByDepartment.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-white p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Attendance Trend</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend}>
                <CartesianGrid stroke="#ece8f5" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6f4db8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-white p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Revenue vs Expense</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueVsExpense}>
                <CartesianGrid stroke="#ece8f5" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6f4db8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#b197ef" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-white p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Expense Categories</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseCategories} dataKey="value" nameKey="name" innerRadius={36} outerRadius={78}>
                  {expenseCategories.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </SectionCard>

    <div className="grid gap-4 xl:grid-cols-3">
      <MiniTable
        title="Recent Employees"
        columns={["Name", "Department", "Joining Date", "Status"]}
        rows={recentEmployees}
      />
      <MiniTable
        title="Pending Leaves"
        columns={["Employee", "Leave Type", "Dates", "Days", "Status"]}
        rows={pendingLeaves}
      />
      <MiniTable
        title="Recent Transactions"
        columns={["Invoice ID", "Customer", "Amount", "Date", "Status"]}
        rows={recentTransactions}
      />
    </div>

    <div className="grid gap-4 xl:grid-cols-2">
      <SectionCard title="Activity Feed">
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="rounded-lg border border-border bg-white px-3 py-2">New employee record created in HR module.</li>
          <li className="rounded-lg border border-border bg-white px-3 py-2">Invoice INV-2302 moved to pending payment.</li>
          <li className="rounded-lg border border-border bg-white px-3 py-2">Leave approval requested for Sophia Reed.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Alert Panel">
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="rounded-lg border border-danger/30 bg-red-50 px-3 py-2">Low stock detected on 23 products.</li>
          <li className="rounded-lg border border-border bg-white px-3 py-2">9 pending approvals awaiting manager action.</li>
          <li className="rounded-lg border border-border bg-white px-3 py-2">2 expiring employee documents this week.</li>
        </ul>
      </SectionCard>
    </div>
  </div>
);

export default DashboardPage;
