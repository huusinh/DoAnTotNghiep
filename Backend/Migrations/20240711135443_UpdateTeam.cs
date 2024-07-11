using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizzSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CorrectAnswerCount",
                table: "CompetitionTeams",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrectAnswerCount",
                table: "CompetitionTeams");
        }
    }
}
