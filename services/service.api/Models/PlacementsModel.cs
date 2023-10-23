using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("placements")]
public sealed class PlacementsModel : EntityAbstract
{
    [Column("place_id")]
    [NotNull]
    public Guid PlaceId { get; set; }

    [Column("binding_id")]
    [NotNull]
    public Guid BindingId { get; set; }

    [Column("date_of_placement")]
    [NotNull]
    public DateTime DateOfPlacement { get; set; }

    [Column("date_of_excluding")]
    [NotNull]
    public DateTime DateOfExcluding { get; set; }
} 