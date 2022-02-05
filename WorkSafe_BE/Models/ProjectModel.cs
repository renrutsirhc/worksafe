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

        public ProjectModel(string id, string title)
        {
            _id = id;
            _title = title;
        }

        public ProjectModel(string id, Dictionary<string, object> documentDictionary, UserModel owner, UserModel lastUpdatedBy) : this(id)
        {
            _title = (string)documentDictionary["Title"];
            _description = (string)documentDictionary["Description"];
            _projectGoal = (string)documentDictionary["ProjectGoal"];
            _timeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
            _creationTime = ((Timestamp)documentDictionary["CreationTime"]).ToDateTime();
            _pillarConnection = (bool)documentDictionary["PillarConnection"];
            _pillarEmbedding = (bool)documentDictionary["PillarEmbedding"];
            _pillarLeadership = (bool)documentDictionary["PillarLeadership"];
            _pillarNeeds = (bool)documentDictionary["PillarNeeds"];
            _pillarResources = (bool)documentDictionary["PillarResources"];
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

        private string _projectGoal = "";

        public string ProjectGoal
        {
            get { return _projectGoal; }
            set { _projectGoal = value; }
        }


        private bool _pillarEmbedding = false;

        public bool PillarEmbedding
        {
            get { return _pillarEmbedding; }
            set { _pillarEmbedding = value; }
        }

        private bool _pillarResources = false;

        public bool PillarResources
        {
            get { return _pillarResources; }
            set { _pillarResources = value; }
        }

        private bool _pillarNeeds = false;

        public bool PillarNeeds
        {
            get { return _pillarNeeds; }
            set { _pillarNeeds = value; }
        }

        private bool _pillarLeadership = false;

        public bool PillarLeadership
        {
            get { return _pillarLeadership; }
            set { _pillarLeadership = value; }
        }

        private bool _pillarConnection = false;

        public bool PillarConnection
        {
            get { return _pillarConnection; }
            set { _pillarConnection = value; }
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


        private UserModel? _owner = null;

        public UserModel? Owner
        {
            get { return _owner; }
            set { _owner = value; }
        }

        private UserModel? _lastUpdatedBy = null;

        public UserModel? LastUpdatedBy
        {
            get { return _lastUpdatedBy; }
            set { _lastUpdatedBy = value; }
        }


    }
}
