using System.ComponentModel.DataAnnotations.Schema;

namespace Service.API.Abstract;

public abstract class AssociationAbstract : EntityAbstract
{
    [Column("creator_id")]
    public Guid CreatorId { get; set; }

    [Column("issue_id")]
    public Guid IssueId { get; set; }
}