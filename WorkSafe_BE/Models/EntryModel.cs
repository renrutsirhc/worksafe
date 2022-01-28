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

        public EntryModel(string id, Dictionary<string, object> documentDictionary):this(id)
        {
            _authorId = (string)documentDictionary["AuthorId"];
            _projectId = (string)documentDictionary["ProjectId"];
            _description = (string)documentDictionary["Description"];
            _files = ((List<object>)documentDictionary["Files"]).Select(i => i.ToString()).ToList();
            _impact = (string)documentDictionary["Impact"];
            _learning = (string)documentDictionary["Learning"];
            _mindSet = (string)documentDictionary["MindSet"];
            _nextSteps = (string)documentDictionary["NextSteps"];
            _tags = ((List<object>)documentDictionary["Tags"]).Select(i => i.ToString()).ToList();
            _timeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
        }
        private string _id = "";

        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _authorId;

        public string AuthorId
        {
            get { return _authorId; }
            set { _authorId = value; }
        }

        private string _projectId = "";

        public string ProjectId
        {
            get { return _projectId; }
            set { _projectId = value; }
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
