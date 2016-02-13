import UserDetailsSchema from 'schemas//UserDetails'

export default function userDetailsFromFormValues(values) {
  const userDetails = {
    name: values.name,
    email: values.email,
    password: values.password
  }

  if(values.githubUser) {
    userDetails.githubUser = values.githubUser
  }

  if(UserDetailsSchema(userDetails)) {
    return userDetails
  } else {
    throw new Error('Invalid User Details')
  }
}
