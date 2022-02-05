using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkSafe_BE.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkSafe_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        FirestoreService _dbService;
        public TagsController(FirestoreService dbService)
        {
            _dbService = dbService;
        }

        // GET: api/<TagsController>
        [HttpGet]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var tags = await _dbService.GetTags();
            return Ok(tags);
        }


        // POST api/<TagsController>
        [HttpPost]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] List<string> tags)
        {
            var addedTags = await _dbService.AddTags(tags);
            if (addedTags.Count > 0)
            {
                return Ok(addedTags);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<TagsController>/tag
        [HttpPut("{oldTag}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Put(string oldTag, [FromBody] string newTag)
        {
            var updatedTag = await _dbService.UpdateTag(oldTag, newTag);
            if (updatedTag != null)
            {
                return Ok(updatedTag);
            }
            else
            {
                return BadRequest();
            }

        }

        // DELETE api/<TagsController>/5
        [HttpDelete("{tag}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<IActionResult> Delete(string tag)
        {
            var deletedTag = await _dbService.DeleteTag(tag);
            if (deletedTag != null)
            {
                return Ok(deletedTag);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
