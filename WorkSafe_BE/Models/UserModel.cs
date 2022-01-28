using Google.Cloud.Firestore;

namespace WorkSafe_BE.Models
{
    public class UserModel
    {
        public UserModel()
        {

        }

        public UserModel(string id)
        {
            _id = id;
        }

        public UserModel(string id, string name, string email):this(id)
        {
            _name = name;
            _email = email;
        }

        public UserModel(string id, Dictionary<string, object> documentDictionary):this(id)
        {
            _name = (string)documentDictionary["Name"];
            _nickName = (string)documentDictionary["NickName"];
            _email = (string)documentDictionary["Email"];
            _picture = (string)documentDictionary["Picture"];
            _timeStamp = ((Timestamp)documentDictionary["TimeStamp"]).ToDateTime();
        }

        private string _id;

        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }


        private string _name = "";

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        private string _nickName = "";

        public string NickName
        {
            get { return _nickName; }
            set { _nickName = value; }
        }


        private string _email = "";

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        private string _picture = "";

        public string Picture
        {
            get { return _picture; }
            set { _picture = value; }
        }

        private DateTime _timeStamp = DateTime.UtcNow;

        public DateTime TimeStamp
        {
            get { return _timeStamp; }
            set { _timeStamp = value; }
        }





    }
}
