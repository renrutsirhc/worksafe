namespace WorkSafe_BE.Models
{
    public class UserModel
    {
        public UserModel(string name, string email)
        {
            _name = name;
            _email = email;
        }
        private string _name;

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        private string _email;

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }


    }
}
