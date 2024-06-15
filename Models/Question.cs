using System;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Models
{
	public class Question : BaseEntity<int>
	{
		public string Description { get; set; } = default!;

		public int QuizzId { get; set; }
	}
}

