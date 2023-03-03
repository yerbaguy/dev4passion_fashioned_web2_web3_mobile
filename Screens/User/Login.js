import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native';
import  { Home }  from '../Home';


const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      alert("put email and password");
     // setError("Please fill in your credentials");
    } else {
      // loginUser(user, context.dispatch);
      onPress=(()=> props.navigation.navigate('Main'))
    }
  };

  return (

    <View>
      <Text>Login</Text>

      <TextInput
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <TextInput
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

        {/* <Button title="Login" large primary onPress={() => handleSubmit()} /> */}
        {/* <Button title="Login" large primary onPress={() => props.navigation.navigate('Main')} /> */}


        <Button title='lskdj'
          onPress={()=> props.navigation.navigate("Home")}
           />
            


        {/* <Text
          onPress={()=> props.navigation.navigate('Home')}
          >
             Login   
            </Text>   */}


        {/* <Text
          onPress={()=> props.navigation.navigate('Register')}
          >
            Don't have an account, click here to Sign Up
            
            </Text>   */}

    </View>
    // <div>
    //   <Text>Login</Text>
    // </div>
  )
}

export default Login;







// const Login = () => {
//   return (
//     <View>
//       <Text>Login</Text>
//     </View>
//     // <div>
//     //   <Text>Login</Text>
//     // </div>
//   )
// }

// export default Login;