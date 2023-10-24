using System.ComponentModel.DataAnnotations.Schema;
using Service.API.Abstract;

using Service.API.Models;

[Table("authors")]
public sealed class AuthorsModel : AssociationAbstract 
{ }