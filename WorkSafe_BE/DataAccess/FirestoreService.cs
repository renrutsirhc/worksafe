﻿using Google.Cloud.Firestore;
using WorkSafe_BE.Models;

namespace WorkSafe_BE.DataAccess
{
    public class FirestoreService : IDatabaseService
    {
        public FirestoreService()
        {
            string credential_path = @"./DataAccess/worksafe-f99a3-dfd3441ac6fd.json";
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credential_path);
            _db = FirestoreDb.Create(_projectId);
        }

        private FirestoreDb _db;
        private string _projectId = "worksafe-f99a3";


        /// <summary>
        /// Adds a User to Firestore
        /// </summary>
        /// <param name="project">A UsertModel containing the Project to add</param>
        /// <returns>The Id of the user as a string</returns>
        public async Task<String> AddUser(UserModel user)
        {
            DocumentReference docRef = _db.Collection("Users").Document(user.Id);
            Dictionary<string, object> userDictionary = new Dictionary<string, object>
            {             
                { "Name", user.Name },
                { "NickName", user.NickName },
                { "Email", user.Email },
                { "Picture", user.Picture },
                { "TimeStamp", Timestamp.FromDateTime(user.TimeStamp) },
            };
            await docRef.SetAsync(userDictionary);
            return docRef.Id;
        }

        /// <summary>
        /// Gets a User by Id
        /// </summary>
        /// <param name="id">The id of the user as a string</param>
        /// <returns>A UserModel containing the user or null of user with given id is not in the db</returns>
        public async Task<UserModel?> GetUser(string id)
        {           
            DocumentReference docRef = _db.Collection("Users").Document(id);
            DocumentSnapshot document = await docRef.GetSnapshotAsync();
            if (document.Exists == true)
            {               
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                var user = new UserModel(id, documentDictionary);
                return user;
            }
            else
            {
                return null;
            }

        }


        /// <summary>
        /// Gets a list of all pusers from firebase
        /// </summary>
        /// <returns>A list of UserModels</returns>
        public async Task<List<UserModel>> GetUsers()
        {
            var output = new List<UserModel>();
            CollectionReference usersRef = _db.Collection("Users");
            QuerySnapshot snapshot = await usersRef.GetSnapshotAsync();
            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                var user = new UserModel(document.Id, documentDictionary);
                output.Add(user);
            }
            return output;
        }



        /// <summary>
        /// Adds a Project to Firestore
        /// </summary>
        /// <param name="project">A ProjectModel containing the Project to add</param>
        /// <returns>The autogenerated Id of the project as a string</returns>
        public async Task<String> AddProject(ProjectModel project)
        {
            DocumentReference docRef = _db.Collection("Projects").Document();
            Dictionary<string, object> projectDictionary = new Dictionary<string, object>
            {
                { "Title", project.Title },
                { "Description", project.Description },
                { "TimeStamp", Timestamp.FromDateTime(project.TimeStamp) },
                { "OwnerId", project.Owner.Id }
            };
            await docRef.SetAsync(projectDictionary);
            //need to also add collection of Collaborators possibly later
            return docRef.Id;
        }

        /// <summary>
        /// Gets a Project by Id
        /// </summary>
        /// <param name="id">The id of the project as a string</param>
        /// <returns>A ProjectModel containing the project</returns>
        public async Task<ProjectModel> GetProject(string id)
        {
            DocumentReference docRef = _db.Collection("Projects").Document(id);
            DocumentSnapshot document = await docRef.GetSnapshotAsync();
            if (document.Exists == true)
            {
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                var owner = await GetUser((string)documentDictionary["OwnerId"]);

                //replace empty list of collaborators with actual list at some point
                var collaborators = new List<UserModel>();
                var project = new ProjectModel(document.Id, documentDictionary, owner, collaborators);
                return project;
            }
            else
            {
                return null;
            }

        }

        /// <summary>
        /// Gets a list of all projects from firebase
        /// </summary>s
        /// <returns>A list of ProjectModels</returns>
        public async Task<List<ProjectModel>> GetProjects()
        {
            var output = new List<ProjectModel>();
            CollectionReference projectsRef = _db.Collection("Projects");
            QuerySnapshot snapshot = await projectsRef.GetSnapshotAsync();
            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                var owner = await GetUser((string)documentDictionary["OwnerId"]);
                var project = new ProjectModel(document.Id, documentDictionary, owner, new List<UserModel>());
                output.Add(project);
            }

            return output;
        }


        /// <summary>
        /// Adds an Entry to Firestore
        /// </summary>
        /// <param name="project">A ProjectModel containing the Project to add</param>
        /// <returns>The autogenerated Id of the project as a string</returns>
        public async Task<String> AddEntry(EntryModel entry)
        {
            DocumentReference userDocRef = _db.Collection("Users").Document(entry.Author.Id).Collection("Entries").Document();
            DocumentReference projDocRef = _db.Collection("Projects").Document(entry.Project.Id).Collection("Entries").Document(userDocRef.Id);
            Dictionary<string, object> projectDictionary = new Dictionary<string, object>
            {
                { "Description", entry.Description },
                { "TimeStamp", Timestamp.FromDateTime(entry.TimeStamp) },
                { "AuthorId", entry.Author.Id },
                { "ProjectId", entry.Project.Id },
                { "Files", entry.Files },
                { "Impact", entry.Impact },
                { "Learning", entry.Learning},
                { "MindSet", entry.MindSet },
                { "NextSteps", entry.NextSteps },
                { "Tags", entry.Tags },
            };
            await userDocRef.SetAsync(projectDictionary);
            await projDocRef.SetAsync(projectDictionary);
            return userDocRef.Id;
        }

        /// <summary>
        /// Gets a Project by Id
        /// </summary>
        /// <param name="id">The id of the project as a string</param>
        /// <returns>A ProjectModel containing the project</returns>
        public async Task<EntryModel> GetEntry(string id, string parentId, TopCollection topCollection)
        {
            DocumentReference docRef = _db.Collection(topCollection.ToString()).Document(parentId).Collection("Entries").Document(id);
            DocumentSnapshot document = await docRef.GetSnapshotAsync();
            Dictionary<string, object> documentDictionary = document.ToDictionary();
            var author = await GetUser((string)documentDictionary["AuthorId"]);
            var project = await GetProject((string)documentDictionary["ProjectId"]);
            var entry = new EntryModel(id, documentDictionary, author, project);
            return entry;
        }

        public async Task<List<EntryModel>> GetEntries(string id, TopCollection topCollection)
        {
            var output = new List<EntryModel>();
            CollectionReference entriesRef = _db.Collection(topCollection.ToString()).Document(id).Collection("Entries");
            QuerySnapshot snapshot = await entriesRef.GetSnapshotAsync();
            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                var author = await GetUser((string)documentDictionary["AuthorId"]);
                var project = await GetProject((string)documentDictionary["ProjectId"]);
                var entry = new EntryModel(document.Id, documentDictionary, author, project);
                output.Add(entry);
            }

            return output;
        }

    }
}
