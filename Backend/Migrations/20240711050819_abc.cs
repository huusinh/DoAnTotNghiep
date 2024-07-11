using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizzSystem.Migrations
{
    /// <inheritdoc />
    public partial class abc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_CompetitionTeams_CompetitionTeamId",
                table: "Results");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_CompetitionTeams_CompetitionTeamId",
                table: "Results",
                column: "CompetitionTeamId",
                principalTable: "CompetitionTeams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_CompetitionTeams_CompetitionTeamId",
                table: "Results");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_CompetitionTeams_CompetitionTeamId",
                table: "Results",
                column: "CompetitionTeamId",
                principalTable: "CompetitionTeams",
                principalColumn: "Id");
        }
    }
}
