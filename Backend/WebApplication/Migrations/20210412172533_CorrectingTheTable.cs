using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class CorrectingTheTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_UsersGuidUsersId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Users_UsersGuidUsersId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_UsersGuidUsersId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_Events_UsersGuidUsersId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "UsersGuidUsersId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "UsersGuidUsersId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "News",
                newName: "UsersId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Events",
                newName: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_News_UsersId",
                table: "News",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_UsersId",
                table: "Events",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_UsersId",
                table: "Events",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "GuidUsersId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Users_UsersId",
                table: "News",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "GuidUsersId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_UsersId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Users_UsersId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_UsersId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_Events_UsersId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "News",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "Events",
                newName: "UserId");

            migrationBuilder.AddColumn<Guid>(
                name: "UsersGuidUsersId",
                table: "News",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UsersGuidUsersId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_UsersGuidUsersId",
                table: "News",
                column: "UsersGuidUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_UsersGuidUsersId",
                table: "Events",
                column: "UsersGuidUsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_UsersGuidUsersId",
                table: "Events",
                column: "UsersGuidUsersId",
                principalTable: "Users",
                principalColumn: "GuidUsersId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Users_UsersGuidUsersId",
                table: "News",
                column: "UsersGuidUsersId",
                principalTable: "Users",
                principalColumn: "GuidUsersId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
