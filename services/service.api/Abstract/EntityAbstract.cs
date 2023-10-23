using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Service.API.Abstract;

public abstract class EntityAbstract {

    [Key]
    [Column("Id")]
    public Guid Id { get; private set; } = Guid.NewGuid();
}