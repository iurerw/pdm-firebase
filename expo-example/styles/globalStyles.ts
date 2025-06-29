import { StyleSheet } from "react-native";

const theme = {
  primaryColor: "darkblue",
  defaultRadius: 4,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  input: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderColor: "darkblue",
    borderRadius: theme.defaultRadius,
    width: "100%",
    marginTop: 12,
  },
  button: {
    height: 32,
    padding: 4,
    backgroundColor: "darkblue",
    borderRadius: theme.defaultRadius,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer:{
    
  },
  inputContainer: {
    width: 300
  },
  iconsContainer: {
    flexDirection:"row",
    gap: 20
  }
});



export default globalStyles;
