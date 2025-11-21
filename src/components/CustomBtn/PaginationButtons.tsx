import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { Tooltip } from "../CustomTooltip/CustomTooltip";

type PaginationButtonsProps = {
  table: any;
};

export const NextButton = ({ table }: PaginationButtonsProps) => {
  return (
    <Tooltip
      content={table.getCanNextPage() ? "Next Page" : "No Next Page"}
      side="top"
    >
      <Button
        variant="ghost"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
};

export const PreviousButton = ({ table }: PaginationButtonsProps) => {
  return (
    <Tooltip
      content={
        table.getCanPreviousPage() ? "Previous Page" : "No Previous Page"
      }
      side="top"
    >
      <Button
        variant="ghost"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
};

export const FirstButton = ({ table }: PaginationButtonsProps) => {
  return (
    <Tooltip
      content={table.getCanPreviousPage() ? "First Page" : "No First Page"}
      side="top"
    >
      <Button
        variant="ghost"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        className="h-8 w-8 p-0"
      >
        <ChevronFirst className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
};

export const LastButton = ({ table }: PaginationButtonsProps) => {
  return (
    <Tooltip
      content={table.getCanNextPage() ? "Last Page" : "No Last Page"}
      side="top"
    >
      <Button
        variant="ghost"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        className="h-8 w-8 p-0"
      >
        <ChevronLast className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
};
