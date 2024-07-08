import { useEffect, useState } from "react";
import { AddQuizzPrompt } from "@main/components/prompts/AddQuizzPrompt";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getQuizzList,
  selectQuizzData,
  setCurrentPage,
} from "@main/features/slices/quizz.slice";
import { QuizzRecord } from "@main/types/quizz.types";
import { Link } from "react-router-dom";

const QuizzManagement = () => {
  const dispatch = useAppDispatch();
  const quizzData = useAppSelector(selectQuizzData);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(pageIndex));
    dispatch(getQuizzList());
  }, [pageIndex, dispatch]);

  const openModal = () => {
    setModalDisplay(true);
  };

  const closeModal = () => {
    setModalDisplay(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            tableTitle="Danh sách cuộc thi"
            data={quizzData.results}
            columns={[
              {
                name: "Tên cuộc thi",
                valueMapper: (record) =>
                  (record as QuizzRecord).competitionName,
              },
              {
                name: "Luật thi",
                valueMapper: (record) =>
                  (record as QuizzRecord).contestRule,
              },
              {
                name: "Số đội tối đa",
                valueMapper: (record) =>
                  (record as QuizzRecord).maxTeamCount,
              },
              {
                name: "Số câu hỏi tối đa",
                valueMapper: (record) =>
                  (record as QuizzRecord).maxQuestionCount,
              },
              {
                name: "",
                valueMapper: (record) => (
                  <Link className="btn btn-primary" to={`/exam/${record.id}`}>
                    Thi
                  </Link>
                ),
              },
            ]}
            additionalHeaderElement={
              <button className="btn btn-primary" onClick={openModal}>
                Thêm cuộc thi
              </button>
            }
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            enablePagination
          />
        </div>
      </div>
      <AddQuizzPrompt display={modalDisplay} closeModal={closeModal} />
    </>
  );
};

export default QuizzManagement;
