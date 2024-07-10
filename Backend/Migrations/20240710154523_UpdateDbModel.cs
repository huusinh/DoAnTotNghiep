using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizzSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDbModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "CompetitionTeams",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "CompetitionTeams");
        }
    }
}
