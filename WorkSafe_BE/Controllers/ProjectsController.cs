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
        [HttpGet("{projectid}")]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> Get(string projectid)
        {
            var project = await _dbService.GetProject(projectid);
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
        [HttpPut("{projectid}")]
        [Produces("application/json")]
        //[Authorize]
        public void Put(int projectid, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectsController>/5
        [HttpDelete("{projectid}")]
        [Produces("application/json")]
        //[Authorize]
        public void Delete(int projectid)
        {
        }

        // GET api/<UsersController>/{projectid}/entries
        [HttpGet("{projectid}/entries")]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> GetEntries(string projectid)
        {
            var entries = await _dbService.GetEntries(projectid, TopCollection.Projects);
            if (entries != null)
            {
                return Ok(entries);
            }
            else
            {
                return BadRequest();
            }
        }

        // GET api/<UsersController>/{projectid}/entries/{entryid}
        [HttpGet("{projectid}/entries/{entryid}")]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> GetEntries(string projectid, string entryid)
        {
            var entry = await _dbService.GetEntry(entryid, projectid, TopCollection.Projects);
            if (entry != null)
            {
                return Ok(entry);
            }
            else
            {
                return BadRequest();
            }
        }

        // POST api/<UsersController>/{projectid}/entries
        [HttpPost("{projectid}/entries")]
        [Produces("application/json")]
        //[Authorize]
        public async Task<IActionResult> PostEntry([FromBody] EntryModel entry)
        {
            var entryId = await _dbService.AddEntry(entry);
            if (entryId.Equals(entry.Id))
            {
                return Ok(entryId);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<UsersController>/{projectid}/entries/{entryid}
        [HttpPut("{projectid}/entries/{entryid}")]
        [Produces("application/json")]
        //[Authorize]
        public void PutEntry(int projectid, [FromBody] string value)
        {

        }

        // DELETE api/<UsersController>/{projectid}/entries/{entryid}
        [HttpDelete("{projectid}/entries/{entryid}")]
        [Produces("application/json")]
        //[Authorize]
        public void DeleteEntry(int projectid)
        {
        }

    }
}
