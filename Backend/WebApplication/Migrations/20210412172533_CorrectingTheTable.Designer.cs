﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication.DataAccess;

namespace WebApplication.Migrations
{
    [DbContext(typeof(AppDatabaseContext))]
    [Migration("20210412172533_CorrectingTheTable")]
    partial class CorrectingTheTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication.DataAccess.ConsultationRequests", b =>
                {
                    b.Property<Guid>("GuidConsultationRequestsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ListServicesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ReverseCommunication")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GuidConsultationRequestsId");

                    b.HasIndex("ListServicesId");

                    b.HasIndex("UsersId");

                    b.ToTable("ConsultationRequests");
                });

            modelBuilder.Entity("WebApplication.DataAccess.Events", b =>
                {
                    b.Property<Guid>("GuidEventsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DescriptionOfTheEvent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EventTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageEvents")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsConsidered")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PlannedStartDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GuidEventsId");

                    b.HasIndex("UsersId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("WebApplication.DataAccess.ListServices", b =>
                {
                    b.Property<Guid>("GuidListSevicesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ServicesId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GuidListSevicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("ListServices");
                });

            modelBuilder.Entity("WebApplication.DataAccess.News", b =>
                {
                    b.Property<Guid>("GuidNewsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DataNew")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImageNew")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsConsidered")
                        .HasColumnType("bit");

                    b.Property<string>("NewDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NewTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GuidNewsId");

                    b.HasIndex("UsersId");

                    b.ToTable("News");
                });

            modelBuilder.Entity("WebApplication.DataAccess.Services", b =>
                {
                    b.Property<Guid>("GuidServicesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GuidServicesId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("WebApplication.DataAccess.Users", b =>
                {
                    b.Property<Guid>("GuidUsersId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TypeOfEnterprise")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GuidUsersId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApplication.DataAccess.ConsultationRequests", b =>
                {
                    b.HasOne("WebApplication.DataAccess.ListServices", "ListServices")
                        .WithMany("consultationRequests")
                        .HasForeignKey("ListServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication.DataAccess.Users", "Users")
                        .WithMany("consultationRequests")
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ListServices");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApplication.DataAccess.Events", b =>
                {
                    b.HasOne("WebApplication.DataAccess.Users", "Users")
                        .WithMany("events")
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApplication.DataAccess.ListServices", b =>
                {
                    b.HasOne("WebApplication.DataAccess.Services", "Services")
                        .WithMany("ListServices")
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Services");
                });

            modelBuilder.Entity("WebApplication.DataAccess.News", b =>
                {
                    b.HasOne("WebApplication.DataAccess.Users", "Users")
                        .WithMany("news")
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApplication.DataAccess.ListServices", b =>
                {
                    b.Navigation("consultationRequests");
                });

            modelBuilder.Entity("WebApplication.DataAccess.Services", b =>
                {
                    b.Navigation("ListServices");
                });

            modelBuilder.Entity("WebApplication.DataAccess.Users", b =>
                {
                    b.Navigation("consultationRequests");

                    b.Navigation("events");

                    b.Navigation("news");
                });
#pragma warning restore 612, 618
        }
    }
}
