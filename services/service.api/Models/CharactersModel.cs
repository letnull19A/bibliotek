using System.ComponentModel.DataAnnotations.Schema;
using Service.API.Abstract;

[Table("characters")]
public sealed class CharactersModel : EntityAbstract 
{
    [Column("characters_of_artwork")]
    public string CharacterOfArtwork { get; set; } = string.Empty;
}