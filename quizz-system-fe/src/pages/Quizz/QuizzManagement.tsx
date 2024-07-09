import { useEffect, useState } from "react";
import { AddQuizzPrompt } from "@main/components/prompts/AddQuizzPrompt";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  deleteQuizz,
  getQuizzList,
  selectQuizzData,
  setCurrentPage,
} from "@main/features/slices/quizz.slice";
import { QuizzRecord } from "@main/types/quizz.types";
import { Link } from "react-router-dom";
import { showMessageDialog } from "@main/features/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { UpdateQuizzPrompt } from "@main/components/prompts/UpdateQuizzPrompt";

const QuizzManagement = () => {
  const dispatch = useAppDispatch();
  const quizzData = useAppSelector(selectQuizzData);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [edittingQuizzId, setEdittingQuizzId] = useState<number>();

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

  const closeUpdateQuizzModal = () => {
    setEdittingQuizzId(undefined);
  };

  const onRowActionClick = (type: "update" | "delete", quizzId: number) => {
    if (type === "update") {
      setEdittingQuizzId(quizzId);
    } else {
      dispatch(
        showMessageDialog({
          message: "Bạn có muốn xóa cuộc thi này không?",
          primaryButtonText: "Có",
          secondaryButtonText: "Không",
          onPrimaryButtonClick: () => {
            dispatch(deleteQuizz(quizzId))
              .then(unwrapResult)
              .then(() => {
                dispatch(showMessageDialog("Đã xóa cuộc thi thành công"));
                dispatch(getQuizzList());
              });
          },
        })
      );
    }
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
                valueMapper: (record) => (record as QuizzRecord).contestRule,
              },
              {
                name: "Số đội tối đa",
                valueMapper: (record) => (record as QuizzRecord).maxTeamCount,
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
            onRowActionClick={onRowActionClick}
            enablePagination
          />
        </div>
      </div>
      <AddQuizzPrompt display={modalDisplay} closeModal={closeModal} />
      <UpdateQuizzPrompt
        display={edittingQuizzId !== undefined}
        closeModal={closeUpdateQuizzModal}
        edittingQuizzId={edittingQuizzId}
      />
    </>
  );
};

export default QuizzManagement;
