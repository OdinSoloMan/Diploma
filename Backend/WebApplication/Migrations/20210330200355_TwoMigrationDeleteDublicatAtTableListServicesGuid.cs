using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class TwoMigrationDeleteDublicatAtTableListServicesGuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListServices_Services_ServicesGuidServicesId",
                table: "ListServices");

            migrationBuilder.DropIndex(
                name: "IX_ListServices_ServicesGuidServicesId",
                table: "ListServices");

            migrationBuilder.DropColumn(
                name: "ServicesGuidServicesId",
                table: "ListServices");

            migrationBuilder.RenameColumn(
                name: "GuidServicesId",
                table: "ListServices",
                newName: "ServicesId");

            migrationBuilder.CreateIndex(
                name: "IX_ListServices_ServicesId",
                table: "ListServices",
                column: "ServicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_ListServices_Services_ServicesId",
                table: "ListServices",
                column: "ServicesId",
                principalTable: "Services",
                principalColumn: "GuidServicesId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListServices_Services_ServicesId",
                table: "ListServices");

            migrationBuilder.DropIndex(
                name: "IX_ListServices_ServicesId",
                table: "ListServices");

            migrationBuilder.RenameColumn(
                name: "ServicesId",
                table: "ListServices",
                newName: "GuidServicesId");

            migrationBuilder.AddColumn<Guid>(
                name: "ServicesGuidServicesId",
                table: "ListServices",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ListServices_ServicesGuidServicesId",
                table: "ListServices",
                column: "ServicesGuidServicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_ListServices_Services_ServicesGuidServicesId",
                table: "ListServices",
                column: "ServicesGuidServicesId",
                principalTable: "Services",
                principalColumn: "GuidServicesId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
