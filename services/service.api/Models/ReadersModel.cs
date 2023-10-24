using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("readers")]
public sealed class ReadersModel : EntityAbstract 
{
    [NotNull]
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    
    [NotNull]
    [Column("surname")]
    public string Surname { get; set; } = string.Empty;
    
    [NotNull]
    [Column("father_name")]
    public string FatherName { get; set; } = string.Empty;

    [NotNull]
    [Column("address")]
    public string Address { get; set; } = string.Empty;

    [NotNull]
    [Column("phone")]
    public string Phone { get; set; } = string.Empty;

    public IssuanceModel? Issuance { get; set; }
}