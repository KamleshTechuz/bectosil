import { createTheme } from "react-data-table-component";

export const customTheme = () => {
  createTheme(
    "solarized",
    {
      background: {
        default: "#1A2226",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#222D32",
      },
    },
    "dark"
  );
};

export const awards = [
  { value: 0, name: "Select an award" },
  { value: 1, name: "Employee of the month" },
  { value: 2, name: "Star performer of the month" },
  { value: 3, name: "Emerging employee of the month" },
  { value: 4, name: "Innovator / Leader of the month" },
];

export const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export const allYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 20; i <= currentYear; i++) years.push(i);
  return years;
};

export const workinHoursHeaders = [
  { label: "Name", key: "users.name" },
  { label: "Total hours", key: "total_hours" },
  { label: "Efficiency", key: "efficiency" },
];

export const winnerReportHeaders = [
  { label: "Name", key: "users.name" },
  { label: "Month", key: "month" },
  { label: "Year", key: "year" },
  { label: "Emerging winner", key: "emerging_winner" },
  { label: "Employee winner", key: "employee_winner" },
  { label: "Innovator leader winner", key: "innovator_leader_winner" },
];

export const leavesreportHeaders = [
  { label: "Name", key: "users.name" },
  { label: "Total leaves", key: "total_leaves" },
];

export const rankingReportReaders = [
  { label: "Name", key: "users.name" },
  { label: "Total hours", key: "total_hours" },
  { label: "Total leaves", key: "total_leaves" },
  { label: "Efficiency", key: "efficiency" },
];

export const leavesReportDetailsheaders = [
  { label: "Month", key: "month" },
  { label: "Total leaves", key: "total_leaves" },
];