import React, { createRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import ChatFloatingButton from "convochatsdk";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const TITLE = "";
const name = "";
const EXTERNAL_USER_ID = "";
const AVATAR = "";
const AVATAR_SIZE = "40px";
const HISTORY_DAYS = -1;
const IS_AUTO_TOGGLE_RICH_MENU = true;
const RICH_MENU_DIVIDE_BY = 4.9;

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

const tokensiteURL = "";
const datBody = "";

const getToken = async () => {
  // POST request using fetch inside useEffect React hook
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: datBody,
    }),
  };
  return fetch(tokensiteURL, requestOptions).then((response) =>
    response.json()
  );
};

const HomeScreen = ({ navigation }) => {
  const exampleRef = createRef(null);

  const eventMessage = (event) => {
    navigation.navigate("Payment", { name: "Payment" });
    callCloseWebChat();
  };

  const callOpenWebChat = () => {
    exampleRef.current.openWebChat();
  };

  const callCloseWebChat = () => {
    exampleRef.current.closeWebChat();
  };

  const isTokenInvalid = () => {
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
        ref={exampleRef}
        title={TITLE}
        userMetadata={{ name: name, EXTERNAL_ID: EXTERNAL_USER_ID }}
        agentAvatar={AVATAR}
        agentAvatarSize={AVATAR_SIZE}
        historyDays={HISTORY_DAYS}
        isAutoToggleRichMenu={IS_AUTO_TOGGLE_RICH_MENU}
        richMenuDivideBy={RICH_MENU_DIVIDE_BY}
        eventMessage={eventMessage}
        isTokenInvalid={isTokenInvalid}
        getToken={getToken}
        headerBackgroundColor={"#000"}
        headerTextColor={"#fff"}
        style={styles.floatinBtn}
        buttonIconUrl={
          "https://s3.amazonaws.com/upload.convolab.ai/webchat-reactnative/images/Liquid-Lightbulb-Animation-V2-800x600-1.gif"
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
