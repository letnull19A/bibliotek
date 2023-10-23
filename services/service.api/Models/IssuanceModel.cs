using System.ComponentModel.DataAnnotations.Schema;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("issuances")]
public sealed class IssuanceModel : EntityAbstract 
{
    [Column("reader_id")]
    public Guid ReaderId { get; set; }

    [Column("binding_id")]
    public Guid BindingId { get; set; }

    [Column("date_of_issue")]
    public DateTime DateOfIssue { get; set; }

    [Column("date_of_return")]
    public DateTime DateOfReturn { get; set; }
}