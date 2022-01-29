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

        public ProjectModel(string id, Dictionary<string, object> documentDictionary, List<UserModel> collaborators) : this(id)
        {
            _title = (string)documentDictionary["Title"];
            _description = (string)documentDictionary["Description"];
            _timeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
            _collaborators = collaborators;
            _ownerId = (string)documentDictionary["OwnerId"];
        }

        private string _id = "";

        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _description = "";

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        private string _title = "";

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        private DateTime _timeStamp = DateTime.UtcNow;

        public DateTime TimeStamp
        {
            get { return _timeStamp; }
            set { _timeStamp = value; }
        }

        private string _ownerId="";

        public string OwnerId
        {
            get { return _ownerId; }
            set { _ownerId = value; }
        }

        private List<UserModel> _collaborators = new List<UserModel>();

        public List<UserModel> Collaborators
        {
            get { return _collaborators; }
            set { _collaborators = value; }
        }



    }
}
