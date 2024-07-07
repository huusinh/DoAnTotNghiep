import { useCallback, useEffect, useState } from "react";
import { AddKeywordPrompt } from "@main/components/prompts/AddKeywordPrompt";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  deleteKeyword,
  getKeywords,
  selectKeywordsData,
  setCurrentPage,
} from "@main/features/slices/keywords.slice";
import { UpdateKeywordPrompt } from "@main/components/prompts/UpdateKeywordPrompt";
import { showMessageDialog } from "@main/features/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";

const KeywordManagement = () => {
  const dispatch = useAppDispatch();
  const keywords = useAppSelector(selectKeywordsData);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [edittingKeywordId, setEdittingKeywordId] = useState<number>();

  const fetchData = useCallback(() => {
    dispatch(getKeywords());
    dispatch(setCurrentPage(pageIndex));
  }, [pageIndex, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAddKeywordModal = () => {
    setModalDisplay(true);
  };

  const closeAddKeywordModal = () => {
    setModalDisplay(false);
  };

  const closeUpdateKeywordModal = () => {
    setEdittingKeywordId(undefined);
  };

  const onRowActionClick = (
    actionType: "update" | "delete",
    keywordId: number
  ) => {
    if (actionType === "update") {
      setEdittingKeywordId(keywordId);
    } else if (actionType === "delete") {
      dispatch(
        showMessageDialog({
          message: "Bạn có muốn xóa từ khóa này không?",
          onPrimaryButtonClick: () => {
            dispatch(deleteKeyword(keywordId))
              .then(unwrapResult)
              .then(() => {
                dispatch(showMessageDialog("Đã xóa từ khóa thành công"));
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
            tableTitle="Danh sách từ khóa"
            data={keywords}
            additionalHeaderElement={
              <button className="btn btn-primary" onClick={openAddKeywordModal}>
                Thêm từ khóa
              </button>
            }
            columns={["keyword", "description"]}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            onRowActionClick={onRowActionClick}
            enablePagination
          />
        </div>
      </div>
      <AddKeywordPrompt
        display={modalDisplay}
        closeModal={closeAddKeywordModal}
      />
      <UpdateKeywordPrompt
        display={edittingKeywordId !== undefined}
        closeModal={closeUpdateKeywordModal}
        edittingKeywordId={edittingKeywordId}
      />
    </>
  );
};

export default KeywordManagement;
