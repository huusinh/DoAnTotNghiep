import {
  BaseRecord,
  PaginationResult,
  InitialPaginationResult,
} from "@main/types/integration.types";
import { ReactNode, SetStateAction, useMemo } from "react";
import { Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

type DataTableCellFunc<TData extends BaseRecord> = (record: TData) => ReactNode;

export type ColumnDefinition<TData extends BaseRecord> =
  | string
  | {
      name: string;
      valueMapper?: DataTableCellFunc<TData>;
    };

export interface DataTableProps<TData extends BaseRecord> {
  tableTitle: string;
  data: TData[] | PaginationResult<TData>;
  columns?: ColumnDefinition<TData>[];
  additionalHeaderElement?: ReactNode;
  pageIndex?: number;
  setPageIndex?: React.Dispatch<SetStateAction<number>>;
  onRowActionClick?: (
    actionType: "update" | "delete",
    recordId: number
  ) => void;
  enablePagination?: boolean;
}

interface DataTableCellProps<TData extends BaseRecord> {
  record: TData;
  column: ColumnDefinition<TData>;
}

const DataTableCell = <TData extends BaseRecord>({ record, column }: DataTableCellProps<TData>): ReactNode => {
  if (typeof column === "string" && typeof record[column] === "object") {
    return null;
  }

  if (typeof column === "object") {
    return column.valueMapper?.(record) ?? "";
  }

  return record[typeof column === "string" ? column : column["name"]] as string;
};

export const DataTable = <TData extends BaseRecord>({
  data = InitialPaginationResult,
  tableTitle,
  columns,
  additionalHeaderElement,
  pageIndex,
  setPageIndex,
  onRowActionClick,
  enablePagination,
}: DataTableProps<TData>) => {
  const actualData = useMemo(() => {
    const isArray = Array.isArray(data)

    if (!isArray && !enablePagination) {
      throw new Error('')
    }

    return isArray ? data : data.results
  }, [data, enablePagination])

  const tableColumns = useMemo(() => {
    if (columns) {
      return columns;
    } else if (actualData.length === 0) {
      return [];
    }

    return Object.keys(actualData[0]);
  }, [actualData, columns]);

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">{tableTitle}</h6>
          {additionalHeaderElement}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  {tableColumns.map((column, index) => (
                    <th key={`c${index}`}>
                      {typeof column === "string" ? column : column.name}
                    </th>
                  ))}
                  {onRowActionClick && <th></th>}
                </tr>
              </thead>
              <tbody>
                {actualData.map((rowData, rowIndex) => (
                  <tr key={`r${rowIndex}`}>
                    {tableColumns.map((column, columnIndex) => (
                      <td key={`r${rowIndex}-c${columnIndex}`}>
                        {<DataTableCell record={rowData} column={column} />}
                      </td>
                    ))}
                    {onRowActionClick && (
                      <td
                        style={{
                          gap: "0.5rem",
                          justifyContent: "end",
                        }}
                        className="d-flex"
                        key={`r${rowIndex}}`}
                      >
                        <Button
                          onClick={() => {
                            onRowActionClick("update", rowData.id);
                          }}
                          className="primary"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            onRowActionClick("delete", rowData.id);
                          }}
                          className="primary"
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {enablePagination && (
          <div className="card-footer d-flex justify-content-end">
            <PaginationControl
              page={pageIndex}
              between={4}
              total={(data as PaginationResult<BaseRecord>).totalItems}
              limit={10}
              changePage={(page) => {
                setPageIndex!(page);
              }}
              ellipsis={2}
            />
          </div>
        )}
      </div>
    </>
  );
};
