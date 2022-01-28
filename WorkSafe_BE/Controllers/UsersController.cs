using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkSafe_BE.DataAccess;
using WorkSafe_BE.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkSafe_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        FirestoreService _dbService;
        public UsersController(FirestoreService dbService)
        {
            _dbService = dbService;
        }

        // GET: api/<UsersController>
        [HttpGet]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> Get()
        {
            var users = await _dbService.GetUsers();
            if (users != null)
            {
                return Ok(users);
            }
            else
            {
                return BadRequest();
            }
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _dbService.GetUser(id);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
            
        }

        // POST api/<UsersController>
        [HttpPost]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> Post([FromBody] UserModel user)
        {
            var userId = await _dbService.AddUser(user);
            if (userId.Equals(user.Id))
            {
                return Ok(userId);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public void Delete(int id)
        {
        }
    }
}
