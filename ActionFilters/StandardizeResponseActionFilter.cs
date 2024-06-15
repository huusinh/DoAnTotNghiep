using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using QuizzSystem.Models.Common;

namespace QuizzSystem.ActionFilters
{
    public class StandardizeResponseActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            if (!context.ModelState.IsValid)
            {
                var response = new ValidationErrorApiResponse(context.ModelState);
                context.Result = new BadRequestObjectResult(response);
            }
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);

            if (context.Result is BadRequestObjectResult badRequestObjResult
                && badRequestObjResult.Value is ValidationErrorApiResponse)
            {
                return;
            }

            if (context.Result is BadRequestResult)
            {
                var response = new ValidationErrorApiResponse(context.ModelState);
                context.Result = new BadRequestObjectResult(response);
            }
            else if (context.Result is NotFoundObjectResult || context.Result is NotFoundResult)
            {
                var response = new ResourceNotFoundApiResponse();
                context.Result = new BadRequestObjectResult(response);
            }
            else if (context.Result is OkObjectResult || context.Result is OkResult)
            {
                var value = (context.Result as OkObjectResult)?.Value;
                var response = value is ApiResponse ? value : new ApiResponse(value);
                context.Result = new OkObjectResult(response);
            }
        }
    }
}
