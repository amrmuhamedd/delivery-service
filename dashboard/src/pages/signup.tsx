import SignupForm from '../components/signupForm/signupForm'

function SignUp() {
  return (
    <div className='auth-page'>
    <SignupForm handleFinish={(values :any) => console.log(values)}/>
</div>
  )
}

export default SignUp