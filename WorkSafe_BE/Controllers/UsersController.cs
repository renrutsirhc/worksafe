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
        [Authorize]
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

        // GET api/<UsersController>/{userid}
        [HttpGet("{userid}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Get(string userid)
        {
            var user = await _dbService.GetUser(userid);
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
        [Authorize]
        public async Task<IActionResult> Post([FromBody] UserModel user)
        {
            var userId = await _dbService.AddUser(user);
            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("Id", userId);
            if (userId.Equals(user.Id))
            {
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<UsersController>/{userid}
        [HttpPut("{userid}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Put(string userid, [FromBody] UserModel user)
        {
            user.Id = userid;
            var userId = await _dbService.UpdateUser(user);
            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("Id", userId);
            if (userId.Equals(user.Id))
            {
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<UsersController>/{userid}
        [HttpDelete("{userid}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Delete(string userid)
        {
            var userId = await _dbService.DeleteUser(userid);
            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("Id", userId);
            if (userId.Equals(userid))
            {
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        // GET api/<UsersController>/{userid}/entries
        [HttpGet("{userid}/entries")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> GetEntries(string userid, [FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null, [FromQuery] int? startEntryNum = null, [FromQuery] int? numEntries = null, [FromQuery] string[]? tags = null, [FromQuery] string? orderBy = null)
        {
            var entries = await _dbService.GetEntries(userid, TopCollection.Users, startDate, endDate, startEntryNum, numEntries, tags, orderBy);
            if (entries != null)
            {
                return Ok(entries);
            }
            else
            {
                return BadRequest();
            }
        }

        // GET api/<UsersController>/{userid}/entries/{entryid}
        [HttpGet("{userid}/entries/{entryid}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> GetEntries(string userid, string entryid)
        {
            var entry = await _dbService.GetEntry(entryid,userid,TopCollection.Users);
            if (entry != null)
            {
                return Ok(entry);
            }
            else
            {
                return BadRequest();
            }
        }

        // POST api/<UsersController>/{userid}/entries
        [HttpPost("{userid}/entries")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> PostEntry(string userid, [FromBody] EntryModel entry)
        {
            entry.Author.Id = userid;
            var entryId = await _dbService.AddEntry(entry);
            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("Id", entryId);
            if (!entryId.Equals("Error"))
            {
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<UsersController>/{userid}/entries/{entryid}
        [HttpPut("{userid}/entries/{entryid}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> PutEntry(string userid, string entryid, [FromBody] EntryModel entry)
        {
            entry.Id = entryid;
            entry.TimeStamp = DateTime.UtcNow;
            entry.Author.Id = userid;
            var entryId = await _dbService.UpdateEntry(entry);
            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("Id", entryId);
            if (!entryId.Equals("Error"))
            {
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<UsersController>/{userid}/entries/{entryid}
        [HttpDelete("{userid}/entries/{entryid}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> DeleteEntry(string userid, string entryid)
        {
            var entryId = await _dbService.DeleteEntry(userid, entryid);
            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("Id", entryId);
            if (entryId.Equals(entryid))
            {
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
