using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuizzSystem.Models.Common
{
    public interface IApiResponse
    {
        bool Success { get; }
    }

    public abstract class IErrorApiResponse : IApiResponse
    {
        public bool Success => false;

        public string? Messages { get; init; }
    }

    public class ApiResponse : IApiResponse
    {
        public bool Success => true;

        public object? Result { get; }

        public ApiResponse(object? result)
        {
            Result = result;
        }
    }

    public class InternalServerErrorApiResponse : IErrorApiResponse
    {
        public InternalServerErrorApiResponse(string message)
        {
            Messages = message;
        }
    }

    public class ResourceNotFoundApiResponse : IErrorApiResponse
    {
        public ResourceNotFoundApiResponse()
        {
            Messages = $"Requested resource cannot be found";
        }
    }

    public class ValidationErrorApiResponse : IErrorApiResponse
    {
        public Dictionary<string, string[]> Errors { get; private set; } = new();

        public ValidationErrorApiResponse(ModelStateDictionary modelState)
        {
            Messages = "One or more errors occurred in model data, check \"errors\" fields below";
            AssignErrors(modelState);
        }

        private void AssignErrors(ModelStateDictionary modelState)
        {
            foreach (var entry in modelState)
            {
                var errors = entry.Value.Errors.Select(e => e.ErrorMessage).ToArray();
                Errors.Add(entry.Key, errors);
            }
        }
    }
}
