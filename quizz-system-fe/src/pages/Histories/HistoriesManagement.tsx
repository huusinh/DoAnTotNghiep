import { useEffect, useState } from "react";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getQuizzList,
  selectQuizzData,
  setCurrentPage,
} from "@main/features/slices/quizz.slice";
import { QuizzRecord } from "@main/types/quizz.types";

const HistoriesManagement = () => {
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
            tableTitle="Lịch sử thi đấu"
            data={quizzData.results}
            columns={[
              {
                name: "Tên cuộc thi",
                valueMapper: (record) =>
                  (record as QuizzRecord).competitionName,
              },
              {
                name: "Tên đội",
                valueMapper: (record) =>
                  (record as QuizzRecord).maxTeamCount,
              },
              {
                name: "Số câu dúng",
                valueMapper: (record) =>
                  (record as QuizzRecord).maxQuestionCount,
              },
              {
                name: "Số câu sai",
                valueMapper: (record) =>
                  (record as QuizzRecord).maxQuestionCount,
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

export default HistoriesManagement;
