using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class AddNewTableConsultationRequestsAndChangeRelationshipsBetweenTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlannedEndDate",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "SecondName",
                table: "Users",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "MiddleMame",
                table: "Users",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "GuidId",
                table: "Users",
                newName: "GuidUsersId");

            migrationBuilder.AlterColumn<string>(
                name: "Telephone",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Position",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsConsidered",
                table: "News",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "News",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "usersGuidUsersId",
                table: "News",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsConsidered",
                table: "Events",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "usersGuidUsersId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ConsultationRequests",
                columns: table => new
                {
                    GuidConsultationRequestsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GuidUsersId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReverseCommunication = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdListServiesId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ListServicesGuidListSevicesId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UsersGuidUsersId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsultationRequests", x => x.GuidConsultationRequestsId);
                    table.ForeignKey(
                        name: "FK_ConsultationRequests_ListServices_ListServicesGuidListSevicesId",
                        column: x => x.ListServicesGuidListSevicesId,
                        principalTable: "ListServices",
                        principalColumn: "GuidListSevicesId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConsultationRequests_Users_UsersGuidUsersId",
                        column: x => x.UsersGuidUsersId,
                        principalTable: "Users",
                        principalColumn: "GuidUsersId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_News_usersGuidUsersId",
                table: "News",
                column: "usersGuidUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_usersGuidUsersId",
                table: "Events",
                column: "usersGuidUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationRequests_ListServicesGuidListSevicesId",
                table: "ConsultationRequests",
                column: "ListServicesGuidListSevicesId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsultationRequests_UsersGuidUsersId",
                table: "ConsultationRequests",
                column: "UsersGuidUsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_usersGuidUsersId",
                table: "Events",
                column: "usersGuidUsersId",
                principalTable: "Users",
                principalColumn: "GuidUsersId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Users_usersGuidUsersId",
                table: "News",
                column: "usersGuidUsersId",
                principalTable: "Users",
                principalColumn: "GuidUsersId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_usersGuidUsersId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Users_usersGuidUsersId",
                table: "News");

            migrationBuilder.DropTable(
                name: "ConsultationRequests");

            migrationBuilder.DropIndex(
                name: "IX_News_usersGuidUsersId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_Events_usersGuidUsersId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "IsConsidered",
                table: "News");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "usersGuidUsersId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "IsConsidered",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "usersGuidUsersId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Users",
                newName: "SecondName");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Users",
                newName: "MiddleMame");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "GuidUsersId",
                table: "Users",
                newName: "GuidId");

            migrationBuilder.AlterColumn<int>(
                name: "Telephone",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Position",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "PlannedEndDate",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
