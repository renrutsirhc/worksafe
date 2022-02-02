using Google.Cloud.Firestore;

namespace WorkSafe_BE.Models
{
    public class ProjectModel
    {
        public ProjectModel()
        {

        }

        public ProjectModel(string id)
        {
            _id = id;
        }

        public ProjectModel(string id, Dictionary<string, object> documentDictionary, UserModel owner, UserModel lastUpdatedBy) : this(id)
        {
            _title = (string)documentDictionary["Title"];
            _description = (string)documentDictionary["Description"];
            _projectGoal = (string)documentDictionary["ProjectGoal"];
            _timeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
            _creationTime = ((Timestamp)documentDictionary["CreationTime"]).ToDateTime();
            _pillars = (Dictionary<string, bool>)documentDictionary["Pillars"];
            _owner = owner;
            _lastUpdatedBy = lastUpdatedBy;
        }

        private string _id = "";

        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _title = "";

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        private string _description = "";

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        private string _projectGoal;

        public string ProjectGoal
        {
            get { return _projectGoal; }
            set { _projectGoal = value; }
        }

        private Dictionary<string, bool> _pillars = new Dictionary<string, bool> {
            { "Embedding", false},
            { "Resources", false },
            { "Needs", false },
            { "Leadership", false},
            { "Connection", false },
        };

        public Dictionary<string, bool> Pillars
        {
            get { return _pillars; }
            set { _pillars = value; }
        }


        //this field is for the last time the project was updated
        private DateTime _timeStamp = DateTime.UtcNow;

        public DateTime TimeStamp
        {
            get { return _timeStamp; }
            set { _timeStamp = value; }
        }

        private DateTime _creationTime = DateTime.UtcNow;

        public DateTime CreationTime
        {
            get { return _creationTime; }
            set { _creationTime = value; }
        }


        private UserModel _owner;

        public UserModel Owner
        {
            get { return _owner; }
            set { _owner = value; }
        }

        private UserModel _lastUpdatedBy;

        public UserModel LastUpdatedBy
        {
            get { return _lastUpdatedBy; }
            set { _lastUpdatedBy = value; }
        }


    }
}
