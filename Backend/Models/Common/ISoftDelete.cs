namespace QuizzSystem.Models.Common
{
    public interface ISoftDelete
    {
        bool IsSoftDeleted { get; set; }
    }
}
