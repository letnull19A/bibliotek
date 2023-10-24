using System.ComponentModel.DataAnnotations.Schema;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("editions")]
public sealed class EditionsModel : EntityAbstract 
{
    [Column("title_id")]
    public Guid TitleId { get; set; }

    [Column("type_of_edition_id")]
    public Guid TypeOfEditionId { get; set; }

    [Column("edition_id")]
    public Guid EditionId { get; set; }

    [Column("number_valume")]
    public int NumberValume { get; set; }

    [Column("authors_sign_image_path")]
    public string AuthorSignImagePath { get; set; } = string.Empty;

    [Column("library_code")]
    public int LibraryCode { get; set; }

    [Column("is_repeat")]
    public bool IsRepeat { get; set; }

    [Column("year_of_issue")]
    public int YearOfIssue { get; set; }
}