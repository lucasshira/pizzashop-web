import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange?: (pageIndex: number) => Promise<void> | void;
}

const Pagination = ({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange && onPageChange(0)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            onClick={() => onPageChange && onPageChange(pageIndex - 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            onClick={() => onPageChange && onPageChange(pageIndex + 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex === pages - 1}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            onClick={() => onPageChange && onPageChange(pages - 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex === pages - 1}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
