import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: "home",
          CreateRide: "CreateRide",
          AboutUser: "about-user",
          // TabItem: "item",
        },
      },
      BookRide: "book-ride",
      DriverInput: "driver-input",
      Login: "login",
      SignUpPage: "sign-up",
      NotFound: "*",
    },
  },
};
