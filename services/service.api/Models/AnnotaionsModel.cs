using Service.API.Abstract;

namespace Service.API.Models;

public sealed class AnnotationsModel : EntityAbstract 
{
    public Guid EditionId { get; set; }
}