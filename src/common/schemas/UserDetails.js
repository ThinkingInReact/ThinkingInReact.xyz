import schema from 'js-schema'

const UserDetails = {
  name: String,
  email: String,
  '?githubUser': String,
  password: String
}

export default schema(UserDetails);
