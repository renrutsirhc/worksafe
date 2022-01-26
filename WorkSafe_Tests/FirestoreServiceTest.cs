using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using WorkSafe_BE.DataAccess;
using WorkSafe_BE.Models;

namespace WorkSafe_Tests
{
    [TestClass]
    public class FirestoreServiceTest
    {

        [TestMethod]
        public void TestGetProjects()
        {
            var service = new FirestoreService();
            var projects = service.GetProjects().Result;
            Assert.IsNotNull(projects);
            var project = projects.FirstOrDefault();
            Assert.IsNotNull(project);
            Assert.AreEqual("1XZcq5kZCyDLP5HzlYDA", project.Id);
            Assert.AreEqual("Sample Project 1", project.Title);
            Assert.AreEqual("The description of sample project 1.", project.Description);

            var test = new DateTime(2022, 1, 26, 10, 47, 0, DateTimeKind.Utc);
            Console.WriteLine("Daylight saving: " + test.IsDaylightSavingTime());
            Assert.AreEqual(test, project.TimeStamp);
        }

        [TestMethod]
        public void TestAddGetProject()
        {
            var service = new FirestoreService();
            var project = new ProjectModel();
            project.Title = "Unit Test Project Title";
            project.Description = "Unit Test Project Description";
            project.TimeStamp = DateTime.UtcNow;
            project.Owner = new UserModel("Unit Test User Name", "unittest@test.com");
            var id = service.AddProject(project).Result;
            var result = service.GetProject(id).Result;
            Assert.IsNotNull(result);
            Assert.AreEqual(project.Title, result.Title);
            Assert.AreEqual(project.Description, result.Description);
            Assert.AreEqual(project.TimeStamp, result.TimeStamp);
            Assert.AreEqual(project.Owner, result.Owner);
        }
    }
}