using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Models;
using QuizzSystem.Models.Common;
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
            var user = await _userManager.FindByNameAsync(request.Username);

            var errorApiResponse = new ValidationErrorApiResponse("Username and/or password is incorrect!");

            if (user == null)
            {
                return BadRequest(errorApiResponse);
            }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordCorrect)
            {
                return BadRequest(errorApiResponse);
            }

            var accessToken = GenerateAccessToken(user);

            return Ok(new SignInResponse
            {
                AccessToken = accessToken
            });
        }

        [Route("sign-up")]
        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpRequest request)
        {
            var signUpResult = await _userManager.CreateAsync(new AppUser
            {
                UserName = request.Username,
                FullName = $"{request.FirstName} {request.LastName}",
            }, request.Password);

            if (!signUpResult.Succeeded)
            {
                var response = new ValidationErrorApiResponse(signUpResult.Errors);
                return BadRequest(response);
            }

            return Ok();
        }

        private string GenerateAccessToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName)
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
