using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("places")]
public sealed class PlacesModel : EntityAbstract
{
    [NotNull]
    [Column("number_room")]
    public int NumberRoom { get; set; }

    [NotNull]
    [Column("number_shelving")]
    public int NumberShelving { get; set; }

    [NotNull]
    [Column("number_shelf")]
    public int NumberShelf { get; set; }
}