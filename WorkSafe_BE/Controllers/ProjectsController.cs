using Microsoft.AspNetCore.Mvc;
using WorkSafe_BE.DataAccess;
using WorkSafe_BE.Models;

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
        public async Task<IActionResult> Get()
        {
            var projects = await _dbService.GetProjects();
            if (projects != null)
            {
                return Ok(projects);
            }
            else
            {
                return BadRequest();
            }
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> Get(string id)
        {
            var project = await _dbService.GetProject(id);
            if (project != null)
            {
                return Ok(project);
            }
            else
            {
                return BadRequest();
            }
        }

        // POST api/<ProjectsController>
        [HttpPost]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> Post([FromBody] ProjectModel project)
        {
            var projectId = await _dbService.AddProject(project);
            if (projectId.Equals(project.Id))
            {
                return Ok(projectId);
            }
            else
            {
                return BadRequest();
            }
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
