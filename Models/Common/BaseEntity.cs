namespace QuizzSystem.Models.Common
{
    public class BaseEntity<TId> where TId : struct
    {
        public TId Id { get; set; }

        public bool IsDeleted { get; set; }
    }
}
