import {
  NextButton,
  PreviousButton,
  FirstButton,
  LastButton,
} from "../CustomBtn/PaginationButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type TablePaginationProps = {
  table: any;
  paginationOptions?: number[];
  data: any[];
};
const TablePagination = ({
  table,
  paginationOptions = [5, 10, 20],
  data,
}: TablePaginationProps) => {
  return (
    <div className="flex items-center justify-end py-4 space-x-4">  
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">Items per page:</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="bottom">
            {paginationOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="text-sm text-muted-foreground">
          {`${
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }-${Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            data.length
          )} of ${data.length}`}
        </div>
        <div className="flex items-center space-x-2">
          <FirstButton table={table} />
          <PreviousButton table={table} />
          <NextButton table={table} />
          <LastButton table={table} />
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
