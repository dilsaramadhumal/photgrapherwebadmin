import { DataTable } from "@/components/CustomTable/CustomTable";
import { employeeTableColumns } from "@/constants/TableColumns";

type Employee = {
  empName: string;
  date: string;
  admin: string;
  site: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
};

const data: Employee[] = [
    {
      empName: "Chamalka Bandara",
      date: "2025-03-18",
      admin: "Coles",
      site: "Melbourne",
      checkIn: "07:55 AM",
      checkOut: "04:05 PM",
      workHours: "8h 10m",
    },
    {
      empName: "Hashani Sandupama",
      date: "2025-03-18",
      admin: "Coles",
      site: "Perth",
      checkIn: "07:00 AM",
      checkOut: "04:05 PM",
      workHours: "9h 05m",
    },
    {
      empName: "Lachlan Taylor",
      date: "2025-03-18",
      admin: "Woolworths",
      site: "Sydney",
      checkIn: "08:15 AM",
      checkOut: "05:30 PM",
      workHours: "9h 15m",
    },
    {
      empName: "Matilda Wilson",
      date: "2025-03-19",
      admin: "Bunnings",
      site: "Brisbane",
      checkIn: "06:45 AM",
      checkOut: "03:45 PM",
      workHours: "9h 00m",
    },
    {
      empName: "Jackson Smith",
      date: "2025-03-19",
      admin: "Coles",
      site: "Adelaide",
      checkIn: "08:30 AM",
      checkOut: "05:15 PM",
      workHours: "8h 45m",
    },
    {
      empName: "Charlotte Brown",
      date: "2025-03-19",
      admin: "Woolworths",
      site: "Canberra",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      workHours: "8h 00m",
    },
    {
      empName: "Oliver Jones",
      date: "2025-03-20",
      admin: "Bunnings",
      site: "Darwin",
      checkIn: "07:00 AM",
      checkOut: "04:00 PM",
      workHours: "9h 00m",
    },
    {
      empName: "Ava Williams",
      date: "2025-03-20",
      admin: "Coles",
      site: "Hobart",
      checkIn: "08:45 AM",
      checkOut: "05:30 PM",
      workHours: "8h 45m",
    },
    {
      empName: "Noah Johnson",
      date: "2025-03-20",
      admin: "Woolworths",
      site: "Gold Coast",
      checkIn: "07:30 AM",
      checkOut: "04:45 PM",
      workHours: "9h 15m",
    },
    {
      empName: "Isla Davis",
      date: "2025-03-21",
      admin: "Bunnings",
      site: "Newcastle",
      checkIn: "08:00 AM",
      checkOut: "05:00 PM",
      workHours: "9h 00m",
    },
    {
      empName: "William Martin",
      date: "2025-03-21",
      admin: "Coles",
      site: "Sunshine Coast",
      checkIn: "06:30 AM",
      checkOut: "03:30 PM",
      workHours: "9h 00m",
    },
    {
      empName: "Grace Anderson",
      date: "2025-03-21",
      admin: "Woolworths",
      site: "Wollongong",
      checkIn: "09:15 AM",
      checkOut: "06:15 PM",
      workHours: "9h 00m",
    },
    {
      empName: "Henry White",
      date: "2025-03-22",
      admin: "Bunnings",
      site: "Geelong",
      checkIn: "07:45 AM",
      checkOut: "04:45 PM",
      workHours: "9h 00m",
    },
    {
      empName: "Zoe Thompson",
      date: "2025-03-22",
      admin: "Coles",
      site: "Townsville",
      checkIn: "08:30 AM",
      checkOut: "05:15 PM",
      workHours: "8h 45m",
    },
    {
      empName: "Jack Harris",
      date: "2025-03-22",
      admin: "Woolworths",
      site: "Cairns",
      checkIn: "07:15 AM",
      checkOut: "04:15 PM",
      workHours: "9h 00m",
    }
  ];
const TableSection = () => {
  return (
    <div className="w-full">
      <DataTable
        columns={employeeTableColumns}
        data={data}
        pageSizeOptions={[5, 10, 20]}
        defaultPageSize={5}
        showCheckboxes={false}
        showColumnVisibility={false}
      />
    </div>
  );
};

export default TableSection;
