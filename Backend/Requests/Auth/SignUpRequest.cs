﻿namespace QuizzSystem.Requests.Auth
{
    public class SignUpRequest
    {
        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string Username { get; set; } = default!;

        public string Password { get; set; } = default!;
    }
}
