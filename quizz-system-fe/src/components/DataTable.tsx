import { ReactNode, SetStateAction, useMemo } from "react";
import { Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

type DataTableCellFunc = (record: Record<string, unknown>) => ReactNode;

export type ColumnDefinition =
  | string
  | {
      name: string;
      valueMapper?: DataTableCellFunc;
    };

export interface DataTableProps {
  tableTitle: string;
  data: Record<string, unknown>[];
  columns?: ColumnDefinition[];
  additionalHeaderElement?: ReactNode;
  pageIndex: number;
  setPageIndex: React.Dispatch<SetStateAction<number>>;
  onRowActionClick?: (
    actionType: "update" | "delete",
    recordId: number
  ) => void;
}

interface DataTableCellProps {
  record: Record<string, unknown>;
  column: ColumnDefinition;
}

const DataTableCell = ({ record, column }: DataTableCellProps): ReactNode => {
  if (typeof column === 'string' && typeof record[column] === "object") {
    return null;
  }

  if (typeof column === 'object') {
    return column.valueMapper?.(record) ?? ''
  }

  return record[typeof(column) === 'string' ? column : column['name']] as string;
};

export const DataTable = ({
  data = [],
  tableTitle,
  columns,
  additionalHeaderElement,
  pageIndex,
  setPageIndex,
  onRowActionClick,
}: DataTableProps) => {
  const tableColumns = useMemo(() => {
    if (columns) {
      return columns;
    } else if (data.length === 0) {
      return [];
    }

    return Object.keys(data[0]);
  }, [data, columns]);

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
                {data.map((rowData, rowIndex) => (
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
                          justifyContent: "end"
                        }}
                        className="d-flex"
                      >
                        <Button
                          onClick={() => {
                            onRowActionClick("update", rowData["id"] as number);
                          }}
                          className="primary"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            onRowActionClick("delete", rowData["id"] as number);
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
        <div className="card-footer d-flex justify-content-end">
          <PaginationControl
            page={pageIndex}
            between={4}
            total={data.length}
            limit={10}
            changePage={(page) => {
              setPageIndex(page);
            }}
            ellipsis={2}
          />
        </div>
      </div>
    </>
  );
};
