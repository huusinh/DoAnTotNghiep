﻿using System;
namespace QuizzSystem.Requests.Question
{
	public class CreateQuestion
	{
		public string Description { get; set; } = default!;

		public string Keyword { get;set; } = default!;
    }
}
