using Microsoft.AspNetCore.Mvc;
using WorkSafe_BE.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkSafe_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {

        FirestoreService _dbService;
        public ProjectsController(FirestoreService dbService)
        {
            _dbService = dbService;
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        [Produces("application/json")]
        //[Authorize]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProjectsController>
        [HttpPost]
        [Produces("application/json")]
        //[Authorize]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public void Delete(int id)
        {
        }
    }
}
