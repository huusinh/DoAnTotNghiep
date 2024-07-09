import { useEffect, useRef, useState } from "react";
import { DataTable } from "@main/components/DataTable";
import { useAppDispatch } from "@main/features/hooks";
import {
  getQuizzDetail,
  getQuizzQuestions,
} from "@main/features/slices/quizz.slice";
import { CompetitionTeam, QuizzResult } from "@main/types/quizz.types";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { showMessageDialog } from "@main/features/slices/messages.slice";

const calculateMinute = (second: number): [minute: number, second: number] => {
  return [Math.floor(second / 60), second % 60];
};

const ExamManagement = () => {
  const dispatch = useAppDispatch();
  // const quizzData = useAppSelector(selectQuizzData);

  const { competitionId } = useParams();

  const [contestName, setContestName] = useState("");
  const [contestRule, setContestRule] = useState("");
  const [teams, setTeams] = useState<CompetitionTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<CompetitionTeam>();
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizzResult[]>();

  const remainingContestTime = useRef(0);

  useEffect(() => {
    if (!competitionId) {
      return;
    }

    dispatch(getQuizzDetail(Number(competitionId)))
      .then(unwrapResult)
      .then((data) => {
        setContestName(data.competitionName);
        setContestRule(data.contestRule);
        setTeams(data.competitionTeams!);

        remainingContestTime.current = data.contestTime;

        const [minute, second] = calculateMinute(remainingContestTime.current);
        setMinute(minute);
        setSecond(second);
      });
  }, [competitionId, dispatch]);

  useEffect(() => {
    let jobId: NodeJS.Timeout | null;

    if (isStarted) {
      jobId = setInterval(() => {
        remainingContestTime.current -= 1;

        const [minute, second] = calculateMinute(remainingContestTime.current);

        setMinute(minute);
        setSecond(second);

        if (minute === 0 && second === 0) {
          clearInterval(jobId!);
        }
      }, 1000);
    }

    return () => {
      if (jobId) {
        clearInterval(jobId);
      }
    };
  }, [isStarted]);

  useEffect(() => {
    if (selectedTeam && competitionId) {
      dispatch(
        getQuizzQuestions({
          competitionId: Number(competitionId),
          teamId: Number(selectedTeam.id),
        })
      )
        .then(unwrapResult)
        .then((data) => {
          setQuestions(data);
        });
    }
  }, [competitionId, selectedTeam, dispatch]);

  const onClickStartExam = () => {
    if (!selectedTeam) {
      dispatch(showMessageDialog("Bạn chưa chọn đội thi"));
    } else {
      setIsStarted(true);
    }
  };

  return (
    <>
      <h3 className="text-center">{contestName}</h3>
      <div className="row">
        <div className="col-md-8">
          <Form.Label>Luật lệ</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            disabled
            value={contestRule}
          />
        </div>
        <div className="col-md-4">
          <div
            className="d-flex justify-content-end"
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              gap: "0.5rem",
            }}
          >
            <span>{minute.toString().padStart(2, "0")}</span>
            <span>:</span>
            <span>{second.toString().padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      <div
        className="row justify-content-between"
        style={{
          margin: "0 0 .75rem",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle disabled={isStarted}>
            {selectedTeam?.teamName ?? "Chọn đội thi"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {teams.map((team) => (
              <Dropdown.Item
                key={team.id}
                onClick={() => setSelectedTeam(team)}
              >
                {team.teamName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div>
          <Button
            variant="primary"
            onClick={onClickStartExam}
            disabled={isStarted}
          >
            Bắt đầu thi
          </Button>
          <Button variant="primary" disabled={!isStarted} className="ml-2" style={{
            width: '76.5px'
          }}>
            Submit
          </Button>
        </div>
      </div>
      {isStarted && (
        <div className="row mt-2">
          <div className="col-md-12">
            <DataTable
              tableTitle=""
              data={questions ?? []}
              columns={[
                {
                  name: "Từ khoá",
                  valueMapper: (record) =>
                    (record as QuizzResult).question.keyword,
                },
                {
                  name: "Đúng",
                  valueMapper: (record) => (
                    <input type="radio" name={`q-${record.question.id}`} />
                  ),
                },
                {
                  name: "Sai",
                  valueMapper: (record) => (
                    <input type="radio" name={`q-${record.question.id}`} />
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExamManagement;
