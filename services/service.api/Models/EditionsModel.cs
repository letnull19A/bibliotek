using Service.API.Abstract;

namespace Service.API.Models;

public sealed class EditionsModel : EntityAbstract 
{
    public Guid TitleId { get; set; }

    public Guid TypeOfEditionId { get; set; }

    public int NumberValume { get; set; }

    public string AuthorSignImagePath { get; set; }

    public int LibraryCode { get; set; }

    public bool IsRepeat { get; set; }

    public Guid EditionId { get; set; }

    public int YearOfIssue { get; set; }
}