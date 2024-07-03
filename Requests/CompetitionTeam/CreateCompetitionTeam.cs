namespace QuizzSystem.Requests.CompetitionTeam
{
    public class CreateCompetitionTeam
    {
        public string TeamName { get; set; } = default!;
        public int CompetitionID { get; set; }
    }
}
