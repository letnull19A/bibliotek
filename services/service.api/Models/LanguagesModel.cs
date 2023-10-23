using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Service.API.Abstract;

[Table("languages")]
public sealed class LanguagesModel : EntityAbstract 
{
    [Column("language")]
    [MaxLength(32)]
    [NotNull]
    public string Language { get; set; } = string.Empty;

    [Column("abbreviation")]
    [MaxLength(2)]
    [NotNull]
    public string Abbreviation { get; set; } = string.Empty;

}