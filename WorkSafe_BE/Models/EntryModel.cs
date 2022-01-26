namespace WorkSafe_BE.Models
{
    public class EntryModel
    {
        private UserModel _author;

        public UserModel Author
        {
            get { return _author; }
            set { _author = value; }
        }

        private string _description;

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        private List<string> _files;

        public List<string> Files
        {
            get { return _files; }
            set { _files = value; }
        }

        private string _impact;

        public string Impact
        {
            get { return _impact; }
            set { _impact = value; }
        }

        private string _learning;

        public string Learning
        {
            get { return _learning; }
            set { _learning = value; }
        }

        private string _mindset;

        public string MindSet
        {
            get { return _mindset; }
            set { _mindset = value; }
        }

        private string _nextSteps;

        public string NextSteps
        {
            get { return _nextSteps; }
            set { _nextSteps = value; }
        }

        private List<string> _tags;

        public List<string> Tags
        {
            get { return _tags; }
            set { _tags = value; }
        }

        private DateTime _timeStamp;

        public DateTime TimeStamp
        {
            get { return _timeStamp; }
            set { _timeStamp = value; }
        }


    }
}
