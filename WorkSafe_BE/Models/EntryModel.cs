using Google.Cloud.Firestore;

namespace WorkSafe_BE.Models
{
    public class EntryModel
    {
        public EntryModel()
        {

        }

        public EntryModel(string id)
        {
            Id = id;
        }

        public EntryModel(string id, Dictionary<string, object> documentDictionary, UserModel author) : this(id)
        {
            _description = (string)documentDictionary["Description"];
            _files = ((List<object>)documentDictionary["Files"]).Select(i => i.ToString()).ToList();
            _impact = (string)documentDictionary["Impact"];
            _learning = (string)documentDictionary["Learning"];
            _mindSet = (string)documentDictionary["MindSet"];
            _nextSteps = (string)documentDictionary["NextSteps"];
            _tags = ((List<object>)documentDictionary["Tags"]).Select(i => i.ToString()).ToList();
            _timeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
            _author = author;
        }

        public EntryModel(string id, Dictionary<string, object> documentDictionary, UserModel author, ProjectModel? project):this(id, documentDictionary, author)
        {
            _project = project;

        }

        private string _id = "";

        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private UserModel _author;

        public UserModel Author
        {
            get { return _author; }
            set { _author = value; }
        }

        private ProjectModel? _project = null;

        public ProjectModel? Project
        {
            get { return _project; }
            set { _project = value; }
        }


        private string _description = "";

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        private List<string> _files = new List<string>();

        public List<string> Files
        {
            get { return _files; }
            set { _files = value; }
        }

        private string _impact = "";

        public string Impact
        {
            get { return _impact; }
            set { _impact = value; }
        }

        private string _learning = "";

        public string Learning
        {
            get { return _learning; }
            set { _learning = value; }
        }

        private string _mindSet = "";

        public string MindSet
        {
            get { return _mindSet; }
            set { _mindSet = value; }
        }

        private string _nextSteps = "";

        public string NextSteps
        {
            get { return _nextSteps; }
            set { _nextSteps = value; }
        }

        private List<string> _tags = new List<string>();

        public List<string> Tags
        {
            get { return _tags; }
            set { _tags = value; }
        }

        private DateTime _timeStamp = DateTime.UtcNow;

        public DateTime TimeStamp
        {
            get { return _timeStamp; }
            set { _timeStamp = value; }
        }


    }
}
