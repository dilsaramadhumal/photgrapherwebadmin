import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "../CustomPagination/TablePagination";

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  enableSorting?: boolean;
};

export interface DataTableProps<TData, TValue> {
  columns: DataTableColumn<TData, TValue>[];
  data: TData[];
  showCheckboxes?: boolean;
  showColumnVisibility?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showColumnVisibility = false,
  pageSizeOptions = [5, 10, 20, 30, 50],
  defaultPageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {showColumnVisibility && (
        <div className="flex items-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnDef = header.column.columnDef as DataTableColumn<
                    TData,
                    TValue
                  >;
                  const canSort =
                    columnDef.enableSorting !== false &&
                    (columnDef.enableSorting ||
                      (header.column.getCanSort() &&
                        columnDef.enableSorting !== false));

                  return (
                    <TableHead key={header.id} className="px-4 py-2">
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center">
                          {canSort ? (
                            <Button
                              variant="ghost"
                              onClick={() => header.column.toggleSorting()}
                              className="-ml-3 hover:bg-transparent"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        table={table}
        paginationOptions={pageSizeOptions}
        data={data}
        />
    </div>
  );
}