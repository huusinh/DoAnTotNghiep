import { useEffect, useState } from "react";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getQuizzList,
  selectQuizzData,
  setCurrentPage,
} from "@main/features/slices/quizz.slice";
import { QuizzRecord } from "@main/types/quizz.types";
import { Dropdown } from "react-bootstrap";

const ExamManagement = () => {
  const dispatch = useAppDispatch();
  const quizzData = useAppSelector(selectQuizzData);




  return (
    <>
      <div className="row">
        <div className="col-md-12">
        <Dropdown.Toggle>Chọn đội thi</Dropdown.Toggle>
          <DataTable
            tableTitle=""
            data={quizzData.results}
            columns={[
              {
                name: "Từ khoá",
                valueMapper: (record) =>
                  (record as QuizzRecord).competitionName,
              },
              {
                name: "Đúng",
                valueMapper: (record) =>
                  <input type="radio" name="a"></input>,
              },
              {
                name: "Sai",
                valueMapper: (record) =>
                  <input type="radio" name="a"></input>,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ExamManagement;
