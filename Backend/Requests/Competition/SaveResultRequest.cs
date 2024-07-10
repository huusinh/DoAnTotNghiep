using System.Collections.Generic;

namespace QuizzSystem.Requests.Competition
{
    public class SaveResultRequest
    {
        public int CompetitionId { get; set; }
        public int QuestionScore { get; set; }
        public int TeamId { get; set; }
        public Dictionary<int,bool> Result { get; set; } = new Dictionary<int,bool>();
    }
}
