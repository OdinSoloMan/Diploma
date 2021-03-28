using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class InitMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    GuidEventsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionOfTheEvent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlannedStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlannedEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageEvents = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.GuidEventsId);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    GuidNewsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NewTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataNew = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageNew = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.GuidNewsId);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    GuidServicesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.GuidServicesId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SecondName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiddleMame = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telephone = table.Column<int>(type: "int", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeOfEnterprise = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.GuidId);
                });

            migrationBuilder.CreateTable(
                name: "ListServices",
                columns: table => new
                {
                    GuidListSevicesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuidServicesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ServicesGuidServicesId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListServices", x => x.GuidListSevicesId);
                    table.ForeignKey(
                        name: "FK_ListServices_Services_ServicesGuidServicesId",
                        column: x => x.ServicesGuidServicesId,
                        principalTable: "Services",
                        principalColumn: "GuidServicesId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListServices_ServicesGuidServicesId",
                table: "ListServices",
                column: "ServicesGuidServicesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "ListServices");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Services");
        }
    }
}
