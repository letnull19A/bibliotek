using System.ComponentModel.DataAnnotations.Schema;
using Service.API.Abstract;

[Table("bindings")]
public class BindingsModel : EntityAbstract 
{
    [Column("edition_id")]
    public Guid EditionId { get; set; } = Guid.NewGuid();

    [Column("price")]
    public decimal Price { get; set; }

    [Column("date_of_purchase")]
    public DateTime DateOfPurchase { get; set; }
}