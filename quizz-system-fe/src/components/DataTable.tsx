import {
  BaseRecord,
  PaginationResult,
  InitialPaginationResult,
} from "@main/types/integration.types";
import { ReactNode, SetStateAction, useMemo } from "react";
import { Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

type DataTableCellFunc = (record: BaseRecord) => ReactNode;

export type ColumnDefinition =
  | string
  | {
      name: string;
      valueMapper?: DataTableCellFunc;
    };

export interface DataTableProps {
  tableTitle: string;
  data: BaseRecord[] | PaginationResult<BaseRecord>;
  columns?: ColumnDefinition[];
  additionalHeaderElement?: ReactNode;
  pageIndex?: number;
  setPageIndex?: React.Dispatch<SetStateAction<number>>;
  onRowActionClick?: (
    actionType: "update" | "delete",
    recordId: number
  ) => void;
  enablePagination?: boolean;
}

interface DataTableCellProps {
  record: BaseRecord;
  column: ColumnDefinition;
}

const DataTableCell = ({ record, column }: DataTableCellProps): ReactNode => {
  if (typeof column === "string" && typeof record[column] === "object") {
    return null;
  }

  if (typeof column === "object") {
    return column.valueMapper?.(record) ?? "";
  }

  return record[typeof column === "string" ? column : column["name"]] as string;
};

export const DataTable = ({
  data = InitialPaginationResult,
  tableTitle,
  columns,
  additionalHeaderElement,
  pageIndex,
  setPageIndex,
  onRowActionClick,
  enablePagination,
}: DataTableProps) => {
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
