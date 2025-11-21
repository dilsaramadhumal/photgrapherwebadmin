import { EmployeeColumns } from "@/types/employee";
import { ColumnDef } from "@tanstack/react-table";
import Stack from "@/components/Stack/CustomStack";
import TableActionButton from "@/components/CustomBtn/TableActionButton";

export const employeeTableColumns: ColumnDef<EmployeeColumns>[] = [
    {
      accessorKey: "empName",
      header: "Emp Name",
      cell: ({ row }) => <div>{row.getValue("empName")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "admin",
      header: "Admin",
      cell: ({ row }) => <div>{row.getValue("admin")}</div>,
      enableSorting: false, 
    },
    {
      accessorKey: "site",
      header: "Site",
      cell: ({ row }) => <div>{row.getValue("site")}</div>,
      enableSorting: false, 
    },
    {
      accessorKey: "checkIn",
      header: "Check - In",
      cell: ({ row }) => <div>{row.getValue("checkIn")}</div>,
    },
    {
      accessorKey: "checkOut",
      header: "Check - Out",
      cell: ({ row }) => <div>{row.getValue("checkOut")}</div>,
    },
    {
      accessorKey: "workHours",
      header: "Work Hours",
      cell: ({ row }) => <div>{row.getValue("workHours")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <Stack direction="horizontal" spacing={2} justify="start">
          <TableActionButton
            onClick={() => console.log("View clicked")}
            btnType="view"
            tooltipContent="View Employee"
          />
          <TableActionButton
            onClick={() => console.log("Edit clicked")}
            btnType="edit"
            tooltipContent="Edit Employee"
          />
          <TableActionButton
            onClick={() => console.log("Delete clicked")}
            btnType="delete"
            tooltipContent="Remove Employee"
          />
        </Stack>
      ),
    },
  ];
