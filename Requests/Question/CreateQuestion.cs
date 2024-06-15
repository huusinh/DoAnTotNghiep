using System;
namespace QuizzSystem.Requests.Question
{
	public class CreateQuestion
	{
		public int QuizzId { get; set; }

		public string Description { get; set; } = default!;
	}
}
