import { DataTable } from "@main/components/DataTable";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getHistory,
  selectQuizzHistories,
} from "@main/features/slices/quizz.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const quizzHistories = useAppSelector(selectQuizzHistories);

  useEffect(() => {
    dispatch(getHistory(pageIndex)).then(unwrapResult);
  }, [pageIndex, dispatch]);

  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    <h3>Tổng số cuộc thi</h3>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <h3>1</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    <h3>Tổng số từ khóa</h3>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <h3>10</h3>
                  </div>
                </div>
                <div className="col-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 mb-4">
          <DataTable
            data={quizzHistories}
            columns={[
              {
                name: "Tên cuộc thi",
                valueMapper: (record) => record.competitionName,
              },
              {
                name: "Tên đội",
                valueMapper: (record) => 0,
              },
              {
                name: "Số câu đúng",
                valueMapper: (record) => record.competitionRule,
              },
              {
                name: "Số câu sai",
                valueMapper: (record) => record.competitionName,
              },
            ]}
            tableTitle="Danh sách cuộc thi"
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            enablePagination
          />
          <div
            className="card shadow mb-4"
            style={{
              visibility: "hidden",
              height: "0px !important",
            }}
          >
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Illustrations
              </h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <img
                  className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                  style={{ width: "25rem" }}
                  src="img/undraw_posting_photo.svg"
                  alt="..."
                />
              </div>
              <p>
                Add some quality, svg illustrations to your project courtesy of{" "}
                <a target="_blank" rel="nofollow" href="https://undraw.co/">
                  unDraw
                </a>
                , a constantly updated collection of beautiful svg images that
                you can use completely free and without attribution!
              </p>
              <a target="_blank" rel="nofollow" href="https://undraw.co/">
                Browse Illustrations on unDraw &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
