using Microsoft.EntityFrameworkCore;
using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace QuizzSystem.Database.Repositories.Abstraction
{
    public abstract class BaseRepository<TEntity, TKey> : IRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
        where TKey : struct
    {
        public bool SoftDeleteEnabled { get; protected set; } = true;

        protected readonly DbSet<TEntity> DbSet;

        public BaseRepository(DbSet<TEntity> dbSet)
        {
            DbSet = dbSet;
        }

        public ValueTask<TEntity?> GetByIdAsync(TKey id, CancellationToken cancellationToken = default)
        {
            return DbSet.FindAsync(new object[] { id }, cancellationToken: cancellationToken);
        }

        public async Task<Pagination<TEntity>> GetAllAsync(int pageIndex, CancellationToken cancellationToken = default)
        {
            var list = await DbSet.ToListAsync(cancellationToken);
            var total = list.Count;
            return new Pagination<TEntity>(list, total, pageIndex);
        }

        public Task<List<TEntity>> FilterAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken = default)
        {
            return DbSet.Where(predicate).ToListAsync(cancellationToken);
        }

        public void Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public void Add(params TEntity[] entities)
        {
            DbSet.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            DbSet.Update(entity);
        }

        public void Update(params TEntity[] entities)
        {
            DbSet.UpdateRange(entities);
        }

        public void Delete(TKey id)
        {
            if (SoftDeleteEnabled)
            {
                DbSet.Where(e => (object)e.Id == (object)id)
                        .ExecuteUpdate(
                            e => e.SetProperty(x => x.IsSoftDeleted, true));
            }
            else
            {
                DbSet.Where(e => (object)e.Id == (object)id).ExecuteDelete();
            }
        }
        public int Count()
        {
            return DbSet.Count();
        }
        public int CreateID()
        {
            return Count() + 1;
        }
    }
}
