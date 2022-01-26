namespace WorkSafe_BE.Models
{
    public class ProjectModel
    {
        public ProjectModel()
        {

        }

        private string _id;

        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private List<UserModel> _collaborators;

        public List<UserModel> Collaborators
        {
            get { return _collaborators; }
            set { _collaborators = value; }
        }

        private List<EntryModel> _entries;

        public List<EntryModel> Entries
        {
            get { return _entries; }
            set { _entries = value; }
        }

        private string _description;

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        private string _title;

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        private DateTime _timeStamp;

        public DateTime TimeStamp
        {
            get { return _timeStamp; }
            set { _timeStamp = value; }
        }

        private UserModel _owner;

        public UserModel Owner
        {
            get { return _owner; }
            set { _owner = value; }
        }



    }
}
