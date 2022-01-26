using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using WorkSafe_BE.DataAccess;

namespace WorkSafe_Tests
{
    [TestClass]
    public class FirestoreServiceTest
    {
        [TestMethod]
        public void TestAdd()
        {
            FirestoreService service = new FirestoreService();
            var result = service.Add().Result;
            Console.WriteLine(result.UpdateTime);
            Assert.IsTrue(true);
        }

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
    }
}