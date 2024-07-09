using System.Collections.Generic;

namespace QuizzSystem.Requests.Competition
{
    public class SaveResultRequest
    {
        public int QuestionScore { get; set; }
        public int CompetitionTeamID { get; set; }
        public Dictionary<int,bool> ResultDic { get; set; } = new Dictionary<int,bool>();
    }
}
