using Google.Cloud.Firestore;
using System.Diagnostics;
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

        public async Task<WriteResult> Add()
        {
            DocumentReference docRef = _db.Collection("Users").Document("alovelace");
            Dictionary<string, object> user = new Dictionary<string, object>
            {
                { "First", "Ada" },
                { "Last", "Lovelace" },
                { "Born", 1815 }
            };
            var result = await docRef.SetAsync(user);
            return result;
        }

        public async Task<List<ProjectModel>> GetProjects()
        {
            List<ProjectModel> output = new List<ProjectModel>();
            CollectionReference projectsRef = _db.Collection("Projects");
            QuerySnapshot snapshot = await projectsRef.GetSnapshotAsync();
            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                var project = new ProjectModel();
                project.Id = document.Id;
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                project.Description = (String)documentDictionary["Description"];
                project.Title = (String)documentDictionary["Title"];
                project.TimeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
                output.Add(project);
            }

            return output;
        }
    }
}
