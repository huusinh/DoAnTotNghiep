import { useEffect, useState } from "react";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getQuizzList,
  selectQuizzData,
  setCurrentPage,
} from "@main/features/slices/quizz.slice";
import { QuizzRecord } from "@main/types/quizz.types";

const ExamManagement = () => {
  const dispatch = useAppDispatch();
  const quizzData = useAppSelector(selectQuizzData);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(pageIndex));
    dispatch(getQuizzList());
  }, [pageIndex, dispatch]);



  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            tableTitle="Danh sách cuộc thi"
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
                  (record as QuizzRecord).competitionSetting.contestRule,
              },
              {
                name: "Sai",
                valueMapper: (record) =>
                  (record as QuizzRecord).competitionSetting.maxQuestionCount,
              },
            ]}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
    </>
  );
};

export default ExamManagement;
