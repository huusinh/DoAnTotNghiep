namespace QuizzSystem.Requests.Auth
{
    public class SignInRequest
    {
        public string Username { get; set; } = default!;
        
        public string Password { get; set; } = default!;
    }
}
