using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkSafe_BE.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkSafe_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        FirestoreService _dbService;
        public ColorsController(FirestoreService dbService)
        {
            _dbService = dbService;
        }


        // GET api/<ColorsController>
        [HttpGet]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var colors = await _dbService.GetColors();
            if (colors != null)
            {
                return Ok(colors);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
