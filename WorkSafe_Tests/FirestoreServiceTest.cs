using DeepEqual.Syntax;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using WorkSafe_BE.DataAccess;
using WorkSafe_BE.Models;

namespace WorkSafe_Tests
{
    [TestClass]
    public class FirestoreServiceTest
    {
        [TestMethod]
        public void TestAddGetUser()
        {
            var service = new FirestoreService();
            var user = GenerateUser();

            var userId = service.AddUser(user).Result;
            Assert.AreEqual(user.Id, userId);
            var result = service.GetUser(userId).Result;

            Assert.IsNotNull(result);
            Assert.AreEqual(user.Name, result.Name);
            Assert.AreEqual(user.Email, result.Email);
            Assert.AreEqual(user.NickName, result.NickName);
            Assert.AreEqual(user.Picture, result.Picture);
            //result.TimeStamp.TrimMilliseconds().ShouldDeepEqual(user.TimeStamp.TrimMilliseconds());
        }

        [TestMethod]
        public void TestGetUsers()
        {
            var service = new FirestoreService();
            var entries = service.GetUsers().Result;
            Assert.IsNotNull(entries);

            var user = GenerateUser();

            var result = entries.Where(x => x.Id == user.Id).FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.AreEqual(user.Name, result.Name);
            Assert.AreEqual(user.Email, result.Email);
            Assert.AreEqual(user.NickName, result.NickName);
            Assert.AreEqual(user.Picture, result.Picture);
        }


        [TestMethod]
        public void TestAddGetProject()
        {
            var service = new FirestoreService();
            var project = GenerateProject();

            var id = service.AddProject(project).Result;
            var result = service.GetProject(id).Result;

            Assert.IsNotNull(result);            
            Assert.AreEqual(project.Title, result.Title);
            Assert.AreEqual(project.Description, result.Description);
            Assert.AreEqual(project.OwnerId, result.OwnerId);
            result.TimeStamp.TrimMilliseconds().ShouldDeepEqual(project.TimeStamp.TrimMilliseconds());
        }

        [TestMethod]
        public void TestGetProjects()
        {
            var project = GenerateProject();

            var service = new FirestoreService();
            var projects = service.GetProjects().Result;
            Assert.IsNotNull(projects);
            var result = projects.Where(x => x.Id == "JV6RduagN681MQYB8umm").FirstOrDefault();
            Assert.IsNotNull(result);

            Assert.IsNotNull(result);
            Assert.AreEqual(project.Title, result.Title);
            Assert.AreEqual(project.Description, result.Description);
            Assert.AreEqual(project.OwnerId, result.OwnerId);
        }

        [TestMethod]
        public void TestAddGetEntry()
        {
            var service = new FirestoreService();

            var author = GenerateUser();
            var project = GenerateProject();
            var entry = GenerateEntry(author, project);

            var entryId = service.AddEntry(entry).Result;
            Assert.IsNotNull(entryId);

            var result = service.GetEntry(entryId, author.Id, TopCollection.Users).Result;

            Assert.AreEqual(author.Id, result.Author.Id);
            Assert.AreEqual(entry.Description,result.Description);
            entry.Files.ShouldDeepEqual(result.Files);
            Assert.AreEqual(entry.Impact, result.Impact);
            Assert.AreEqual(entry.Learning, result.Learning);
            Assert.AreEqual(entry.MindSet, result.MindSet);
            Assert.AreEqual(entry.NextSteps, result.NextSteps);
            entry.Tags.ShouldDeepEqual(result.Tags);
            entry.TimeStamp.TrimMilliseconds().ShouldDeepEqual(result.TimeStamp.TrimMilliseconds());


            var result2 = service.GetEntry(entryId, project.Id, TopCollection.Projects).Result;
            result.ShouldDeepEqual(result2);
        }

        [TestMethod]
        public void TestGetUserEntries()
        {
            var service = new FirestoreService();
            var entries = service.GetEntries("Unit Test User ID", TopCollection.Users).Result;
            Assert.IsNotNull(entries);
            var result = entries.Where(x => x.Id == "YmKyaI373sGgzyrxXPMp").FirstOrDefault();
            Assert.IsNotNull(result);

            var author = GenerateUser();
            var project = GenerateProject();
            var entry = GenerateEntry(author, project);

            Assert.AreEqual(author.Id, result.Author.Id);

            Assert.AreEqual(entry.Description, result.Description);
            entry.Files.ShouldDeepEqual(result.Files);
            Assert.AreEqual(entry.Impact, result.Impact);
            Assert.AreEqual(entry.Learning, result.Learning);
            Assert.AreEqual(entry.MindSet, result.MindSet);
            Assert.AreEqual(entry.NextSteps, result.NextSteps);
            entry.Tags.ShouldDeepEqual(result.Tags);
        }

        [TestMethod]
        public void TestGetProjectEntries()
        {
            var service = new FirestoreService();
            var entries = service.GetEntries("xJcONkXPANC1452gfEho", TopCollection.Projects).Result;
            Assert.IsNotNull(entries);
            var result = entries.Where(x => x.Id == "YmKyaI373sGgzyrxXPMp").FirstOrDefault();
            Assert.IsNotNull(result);

            var author = GenerateUser();
            var project = GenerateProject();
            var entry = GenerateEntry(author, project);

            Assert.AreEqual(author.Id, result.Author.Id);

            Assert.AreEqual(entry.Description, result.Description);
            entry.Files.ShouldDeepEqual(result.Files);
            Assert.AreEqual(entry.Impact, result.Impact);
            Assert.AreEqual(entry.Learning, result.Learning);
            Assert.AreEqual(entry.MindSet, result.MindSet);
            Assert.AreEqual(entry.NextSteps, result.NextSteps);
            entry.Tags.ShouldDeepEqual(result.Tags);
        }


        [TestMethod]
        public void TestGetTags()
        {
            var service = new FirestoreService();
            var tags = service.GetTags().Result;
            Assert.IsNotNull(tags);
            var tag = tags.Where(x => x == "tag1");
            Assert.IsNotNull(tag);
        }

        [TestMethod]
        public void TestAddTags()
        {
            var service = new FirestoreService();
            var tagsToAdd = new List<string> { "unitTag1", "unitTag2", "unitTag3" };
            var tagsAdded = service.AddTags(tagsToAdd).Result;
            Assert.IsNotNull(tagsAdded);
            tagsAdded.ShouldDeepEqual(tagsToAdd);
        }

        [TestMethod]
        public void TestUpdateTag()
        {
            var service = new FirestoreService();
            var result = service.AddTags(new List<string> { "updateTag" }).Result;
            var tagsBeforeUpdate = service.GetTags().Result;
            var updatedTag = service.UpdateTag("updateTag","tagUpdated").Result;
            var tagsAfterUpdate = service.GetTags().Result;

            Assert.IsTrue(tagsBeforeUpdate.Contains("updateTag"));
            Assert.IsFalse(tagsAfterUpdate.Contains("updateTag"));
            Assert.AreEqual("tagUpdated", updatedTag);
            Assert.IsTrue(tagsAfterUpdate.Contains("tagUpdated"));
        }

        [TestMethod]
        public void TestDeleteTag()
        {
            var service = new FirestoreService();
            var result = service.AddTags(new List<string> { "deleteTag" }).Result;
            var tagsBeforeDelete = service.GetTags().Result;
            var deletedTag = service.DeleteTag("deleteTag").Result;
            Console.WriteLine(deletedTag);
            var tagsAfterDelete = service.GetTags().Result;

            Assert.IsTrue(tagsBeforeDelete.Contains("deleteTag"));
            Assert.IsFalse(tagsAfterDelete.Contains("deleteTag"));
            Assert.AreEqual("deleteTag", deletedTag);
        }





        private UserModel GenerateUser()
        {
            var user = new UserModel("Unit Test User ID");
            user.Name = "Unit Test UserName";
            user.Email = "Unit Test Email";
            user.NickName = "Unit Test NickName";
            user.Picture = "Unit Test Picture Url";
            user.TimeStamp = DateTime.UtcNow;
            return user;
        }

        private ProjectModel GenerateProject()
        {
            var project = new ProjectModel();
            project.Id = "xJcONkXPANC1452gfEho";
            project.Title = "Unit Test Project Title";
            project.Description = "Unit Test Project Description";
            project.TimeStamp = DateTime.UtcNow;
            project.OwnerId = "Unit Test User ID";

            return project;
        }

        private EntryModel GenerateEntry(UserModel author, ProjectModel project)
        {
            var entry = new EntryModel();
            entry.Author = author;
            entry.Project = project;
            entry.Title = "Unit Test Entry Title";
            entry.Description = "Unit Test Entry Description";
            entry.Files = new List<string>{ "file1.jpg", "file2.jpg", "file3.jpg" };
            entry.Impact = "Unit Test Entry Impact";
            entry.Learning = "Unit Test Entry Learning";
            entry.MindSet = "Unit Test Entry MindSet";
            entry.NextSteps = "Unit Test Entry Next Steps";
            entry.Tags = new List<string> { "tag1", "tag2", "tag3" };
            entry.TimeStamp = DateTime.UtcNow;
            return entry;
        }
    }
}