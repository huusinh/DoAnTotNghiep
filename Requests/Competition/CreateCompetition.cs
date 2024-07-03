using System.Collections.Generic;

namespace QuizzSystem.Requests.Competition
{
    public class CreateCompetition
    {
        public string CompetitionName { get; set; } = default!;
        public int CreatorID { get; set; }
        public int ContestTime { get; set; }
        public string? ContestRule { get; set; }
        public int MaxTeamCount { get; set; }
        public int MaxQuestionCount { get; set; }
        public Dictionary<string, List<int>> TeamList { get; set; } = new Dictionary<string, List<int>>();

    }
}
