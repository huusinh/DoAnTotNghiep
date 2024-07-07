namespace QuizzSystem.Models.Common
{
    public class BaseEntity<TId> : ISoftDelete where TId : struct
    {
        public TId Id { get; set; }

        public bool IsSoftDeleted { get; set; }
    }
}
