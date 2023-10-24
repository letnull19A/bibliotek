using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Service.API.Abstract;

namespace Service.API.Models;

[Table("translators")]
public sealed class TranslatorsModel : AssociationAbstract
{
    [Column("language_id")]
    [NotNull]
    public Guid LanguageId { get; set; }
}