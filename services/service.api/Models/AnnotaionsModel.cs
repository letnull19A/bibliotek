using System.ComponentModel.DataAnnotations.Schema;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("annotations")]
public sealed class AnnotationsModel : EntityAbstract 
{
    [Column("edition_id")]
    public Guid EditionId { get; set; }
}