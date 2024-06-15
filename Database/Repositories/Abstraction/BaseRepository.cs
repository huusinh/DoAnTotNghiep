using Microsoft.EntityFrameworkCore;
using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;
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

        public Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return DbSet.ToListAsync(cancellationToken);
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

        public void Delete(TEntity entity)
        {
            if (SoftDeleteEnabled)
            {
                DbSet.Remove(entity);
            }
            else
            {
                entity.IsDeleted = true;
                Update(entity);
            }
        }

        public void Delete(params TEntity[] entities)
        {
            if (SoftDeleteEnabled)
            {
                DbSet.RemoveRange(entities);
            }
            else
            {
                foreach (var entity in entities)
                {
                    entity.IsDeleted = true;
                }

                Update(entities);
            }
        }
    }
}
