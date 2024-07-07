using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace QuizzSystem.Database.Repositories.Abstraction
{
    public interface IRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
        where TKey : struct
    {
        public ValueTask<TEntity?> GetByIdAsync(TKey id, CancellationToken cancellationToken = default);

        public Task<Pagination<TEntity>> GetPagedDataAsync(int pageIndex, CancellationToken cancellationToken = default);

        public Task<List<TEntity>> FilterAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken = default);

        public void Add(TEntity entity);

        public void Add(params TEntity[] entities);

        public void Update(TEntity entity);

        public void Update(params TEntity[] entities);

        public void Delete(TKey id);
        public int Count();
        public int CreateID();
    }
}
