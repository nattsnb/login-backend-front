import {BoxDiv, StyledDiv} from "./App.styled.tsx";

function App() {
  console.log("working")

  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <StyledDiv>
      <BoxDiv>
        <h2>create user</h2>
        <form onSubmit={handleSubmitRegister(onSubmit)}>
          <div>
            <label>Nickname:</label>
            <input {...register("nickname", { required: true })} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" {...register("email", { required: true })} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" {...register("password", { required: true })} />
          </div>
          <button type="submit">Create user</button>
        </form>
      </BoxDiv>
      <BoxDiv>
        <h2>login user</h2>
      </BoxDiv>
      <BoxDiv>
        <h2>post a post</h2>
      </BoxDiv>
    </StyledDiv>
  )
}

export default App
