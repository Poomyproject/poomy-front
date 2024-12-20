import React from 'react';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { handleSignInApple } from '../ApiClient'; // ApiClient에서 함수 가져오기



const AppleLogin = ({ navigation }) => {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 350,
        height: 48,
        marginTop: 15,
      }}
      onPress={() => handleSignInApple(navigation)} // Apple 로그인 함수 호출
    />
  );
};

export default AppleLogin;



// import appleAuth, {
//     AppleButton,
//   } from '@invertase/react-native-apple-authentication';
  
//   async function handleSignInApple() {
//     // performs login request
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       // Note: it appears putting FULL_NAME first is important, see issue #293
//       requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
//     });
//     // get current authentication state for user
//     // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
//     const credentialState = await appleAuth.getCredentialStateForUser(
//       appleAuthRequestResponse.user,
//     );
  
//     // use credentialState response to ensure the user is authenticated
//     if (credentialState === appleAuth.State.AUTHORIZED) {
//       // user is authenticated
//     }
//   }
  
//   function AppleLogin() {
//     return (
//       <AppleButton
//         buttonStyle={AppleButton.Style.WHITE}
//         buttonType={AppleButton.Type.SIGN_IN}
//         style={{
//           width: '100%', // You must specify a width
//           height: 45, // You must specify a height
//         }}
//         onPress={handleSignInApple}
//       />
//     );
//   }
  
//   export default AppleLogin;