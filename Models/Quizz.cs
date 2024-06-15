using System;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Models
{
	public class Quizz : BaseEntity<int>
	{
		public string QuizzName { get; set; }
		public Question Question { get; set; }
	}
}

