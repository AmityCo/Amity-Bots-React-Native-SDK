import React, { createRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ChatFloatingButton from "convochatsdk";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const NAME = "TESTAPP+" + Platform.OS;
const OS = Platform.OS;
const IS_AUTO_TOGGLE_RICH_MENU = true;
const AVATAR = "";
const AVATAR_SIZE = "40px";
const HISTORY_DAYS = -1;
const IS_AUTO_TOGGLE_RICH_MENU = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  floatinBtn: {
    position: "absolute",
    bottom: 50,
    right: 10,
    width: 80,
    height: 80,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

const HomeScreen = ({ navigation }) => {
  const [name, setNAME] = useState(NAME);
  const exampleRef = createRef(null);

  const eventMessage = (event) => {
    navigation.navigate("Payment", { name: "Payment" });
    callCloseWebChat();
  };

  const sessionTimeOut = () => {
    console.log("session timeout");
  };

  const callOpenWebChat = () => {
    exampleRef.current.openWebChat();
  };

  const callCloseWebChat = () => {
    exampleRef.current.closeWebChat();
  };

  const isTokenInvalid = () => {
    console.log("invalid token");
    exampleRef.current.closeWebChat();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={styles.welcome}>
          Open up App.js to start working on your app!
        </Text>
      </View>
      <ChatFloatingButton
        ENV="DEV"
        ref={exampleRef}
        userMetadata={{
          externalUserId: externalUserId,
          name: name,
          MDM_ID: mdmID,
          POLICY: selectedPolicy,
          LANG: lang,
          OS: OS,
        }}
        agentAvatar={AVATAR}
        agentAvatarSize={AVATAR_SIZE}
        historyDays={HISTORY_DAYS}
        isAutoToggleRichMenu={IS_AUTO_TOGGLE_RICH_MENU}
        eventMessage={eventMessage}
        sessionTimeOut={sessionTimeOut}
        isTokenInvalid={isTokenInvalid}
        getToken={getToken}
        style={styles.floatinBtn}
        buttonIconUrl={
          "https://s3.amazonaws.com/upload.convolab.ai/axachat/icon/Emma-Bubble.png?fbclid=IwAR2vU_vlmjkEPoVtRe4mBLGtgjId3r1npm4RrSwT4sRgzP1f5mFKeQdz3F8"
        }
      />
    </View>
  );
};

const PaymentScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={styles.welcome}>This is {route.params.name}'s page</Text>
      </View>
    </View>
  );
};
