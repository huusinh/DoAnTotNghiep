using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Models;
using QuizzSystem.Requests.Auth;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QuizzSystem.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly IConfiguration _configuration;

        private readonly SymmetricSecurityKey jwtSigningKey;

        public AuthenticationController(UserManager<AppUser> userManger, IConfiguration configuration)
        {
            _userManager = userManger;
            _configuration = configuration;
            jwtSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"]!));
        }

        [Route("sign-in")]
        [HttpPost]
        public async Task<IActionResult> SignIn(SignInRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Username);

            if (user == null)
            {
                return BadRequest("Username and/or password is incorrect!");
            }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordCorrect)
            {
                return BadRequest("Username and/or password is incorrect!");
            }

            var accessToken = GenerateAccessToken(user);

            return Ok(new SignInResponse
            {
                AccessToken = accessToken
            });
        }

        private string GenerateAccessToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName!),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: claims,
                signingCredentials: new SigningCredentials(jwtSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
