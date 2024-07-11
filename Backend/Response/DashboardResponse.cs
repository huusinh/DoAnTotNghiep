using Pagination.EntityFrameworkCore.Extensions;

namespace QuizzSystem.Response
{
    public class DashboardResponse
    {
        public int KeywordsCount { get; set; }

        public int CompetitionsCount { get; set; }

        public Pagination<HistoryRecord>? Histories { get; set; }
    }

    public class HistoryRecord
    {
        public int Id { get; set; }

        public string CompetitionName { get; set; } = default!;

        public string TeamName { get; set; } = default!;

        public int CorrectAnswerCount { get; set; }

        public int FailedAnswerCount { get; set; }
    }
}
