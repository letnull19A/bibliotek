using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Service.API.Abstract;

[Table("titles")]
public sealed class TitlesModel : EntityAbstract 
{
    [Column("title")]
    [NotNull]
    public string Title { get; set; } = string.Empty;
}