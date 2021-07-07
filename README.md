# Amity-Bots-React-Native-SDK

## Package Used

- React Native Webview [Official](https://github.com/react-native-webview/react-native-webview)
- react-native-safe-area-context [Official](https://github.com/th3rdwave/react-native-safe-area-context)
- React Ref [Official](https://reactjs.org/docs/refs-and-the-dom.html)

## Install package

```
npm install ./convochatsdk-2.1.4.tgz
```

## Import package

```
import ChatFloatingButton from 'convochatsdk';

```

### How to use ChatFloatingButton component

```
   const exampleRef = createRef(null);

   const getToken = async () => {

    const requestOptions = {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       data: dataBody,
     }),
    };
    return fetch(tokensiteURL, requestOptions).then((response) =>
     response.json()
    );
   };

   const eventMessage = (event) => {
     navigation.navigate("Payment", { name: "Payment" });
     callCloseWebChat();
    };

   const callOpenWebChat = () => {
     exampleRef.current.openWebChat();
    };

   const sessionTimeOut = () => {
     exampleRef.current.closeWebChat();
    };
    
   const isTokenInvalid = () => {
     exampleRef.current.closeWebChat();
    };

   const isTokenInvalid = () => {
     exampleRef.current.closeWebChat();
    };

    <ChatFloatingButton
        eventMessage={eventMessage}
        sessionTimeOut={sessionTimeOut}
        isTokenInvalid={isTokenInvalid}
        getToken={getToken}
        userMetadata={{
          name: NAME,
          MDM_ID: MDM_ID,
          POLICY: POLICY,
          LANG: LANG,
          OS: OS,
        }}
        buttonIconUrl={buttonIconUrl}
        ref={exampleRef}
        agentAvatar={AVATAR}
        agentAvatarSize={AVATAR_SIZE}
        historyDays={HISTORY_DAYS}
        isAutoToggleRichMenu={IS_AUTO_TOGGLE_RICH_MENU}
        style={STYLES}
      />

```

| KEY                   | DESCRIPTION                                                                                                                   | EXAMPLE                                                                                                         | isRequired? |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| eventMessage          | Function to receive events from webchat                                                                                       | const eventMessage = event => {};                                                                               | Required    |
| sessionTimeOut          | Function to receive events from sessionTimeOut                                                                              | const sessionTimeOut = () => {};                                                                                | Required    |
| isTokenInvalid        | Function to receive events from Invalid Token                                                                          | const isTokenInvalid = () => {};                                                                                | Required    |
| getToken              | Function to get token from customer backend server                                                                            | const getToken = async () => { return fetch(tokensiteURL, requestOptions).then((response) =>response.json());}; | Required    |
| userMetaData          | JSON contain metadata of user required field Name other field are optional                                                    | {{name: "name", MDM_ID: "mdm_id", POLICY: ["a","b"], LANG: "TH", OS: "iOS"}}                                              | Required    |
| buttonIconUrl         | URL of buble ICON                                                                                                             | png, gif                                                                                                        | Required    |
| ref                   | Refs are a useful feature that act as a means to reference a DOM element or a class component from within a parent component. |                                                                                                                 | Optional    |                                                                                        | Optional    |
| agentAvatar           | Profile picture of the chatbot to be shown in chat window when the chatbot response to the user                               |                                                                                                                 | Optional    |
| agentAvatarSize       | Size of agent's avatar picture                                                                                                |                                                                                                                 | Optional    |
| historyDays           | Automatically clear history older than a certain number of days and re-send greeting message. Set to 0 to disable.            | 0                                                                                                               | Optional    |
| isAutoToggleRichMenu  | auto open rich menu                                                                                                           |                                                                                                                 | Optional    |
| style                 | Style of buble button                                                                                                         | floatingBtn: { position: 'absolute', bottom: 50, right: 10, width: 80, height: 80 }                             | Optional    |

### GET TOKEN for verification

The getToken will be used when you click a bubble icon of the chatbot to request a new webchat.

In the case of token invalid. You will get an event from the SDK. Then, you have to call the open webchat method of SDK for creating a new web chat session. The SDK will clear an existing token, call that function to get a new token, and requesting a new web chat for you.

In the case of the token has expired. the SDK will handle it the same as requesting a new chat by clicking a bubble icon of the chatbot

1. Flow get request authentication

<img src="https://github.com/AmityCo/Amity-Bots-React-Native-SDK/blob/master/readme/Images/flow_secure_chat.png?raw=true" alt="get request authentication" width="800" height="400" />
       
2. Store your private key in your backend server and share us your public key.
3. Encrypt Payload with private key for get token.
```
   Encrypt Payload with PKCS1Padding private 
   
   Example
   {
        "appId": "appId",
        "externalUserId": "EXTERNAL_USER_ID_1"
   }
    
```

4. Send API request to get token with encrypted payload (from step 3)

```
   POST {hostname}/site/token
   body = {
    "data": "encrypted payload (from step 3)"
   }

```

5. Send response to react natvie SDK

```
   Response
   {
    "statusCode": 200,
    "token":"ABCD.....XYZ",
    "exp":1623582913
   }

```

React Ref

- React Ref [Official](https://reactjs.org/docs/refs-and-the-dom.html)

You can call Open chat without press bubble by using React Ref

```
   exampleRef.current.openWebChat();
```

You can call Close chat function by using React Ref

```
   exampleRef.current.closeWebChat();
```

Remark:

- If a client opens the chat and being in idle until the token has expired, The SDK will force close the chat automatically.
- The bubble icon of the chatbot runs on an overlay. So, you need to call the SDK on the page you want in your app.
