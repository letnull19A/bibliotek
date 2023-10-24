using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.API.DTO.Readers;
using Service.API.Models;

[ApiController]
[Route("readers")]
public class ReaderController : ControllerBase 
{
    private readonly PgContext _context;
    private ILogger _logger;

    public ReaderController(PgContext context, ILogger logger) 
        => (_context, _logger) = (context, logger);

    [HttpGet()]
    public async Task<IActionResult> Get()
    {
        var result = _context.Readers.ToList();
        return Ok(result);
    }

    [HttpGet("/:{id}")]
    public async Task<IActionResult> Get(Guid id) 
    {
        var result = _context.Readers.Where(reader => reader.Id == id).First();
        return Ok(result);
    }

    [HttpPost()]
    public async Task<IActionResult> Post(AddReader addReaderForm) 
    {
        _context.Readers.Add(new ReadersModel() {
            Name = addReaderForm.Name,
            Surname = addReaderForm.Surname,
            FatherName = addReaderForm.FatherName,
            Phone = addReaderForm.Phone,
            Address = addReaderForm.Address
        });

        _logger.LogDebug("Added new reader");

        return Ok();
    }
}