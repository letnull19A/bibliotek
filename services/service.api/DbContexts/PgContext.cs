using Microsoft.EntityFrameworkCore;
using Service.API.Models;

public sealed class PgContext : DbContext
{
    public DbSet<BindingsModel> Bindings { get; set; }
    public DbSet<LanguagesModel> Languages { get; set; }
    public DbSet<PlacementsModel> Placements { get; set; }
    public DbSet<PlacesModel> Places { get; set; }
    public DbSet<ReadersModel> Readers { get; set; }
    public DbSet<TitlesModel> Titles { get; set; }
    public DbSet<IssuanceModel> Issues { get; set; }
    public DbSet<AnnotationsModel> Annotations { get; set; }
    public DbSet<CharactersModel> Characters { get; set; }
    public DbSet<EditionsModel> Editions { get; set; }
    public DbSet<CreatorsModel> Creators { get; set; }

    public PgContext(DbContextOptions<PgContext> options) : base(options)
    {
        Database.EnsureCreated();
    }
}