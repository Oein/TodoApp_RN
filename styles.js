import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containor: {
    flex: 1,
    backgroundColor: 'white',
  },
  todoListItem: {
    flexDirection: 'row',
    marginBottom: 5,
    flex: 1,
  },
  addTodoWindowSpace: {
    flex: 20,
  },
  addWorkViewSpace: {
    flex: 3.5,
  },
  addTodoWindow: {
    flex: 3,
    flexDirection: 'column',
  },
  titleView: {
    flex: 1,
  },
  addWorkView: {
    flex: 3,
    flexDirection: 'row',
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
  },
  titleRowAddWorkAdd: {
    flex: 3,
  },
  title: {
    flex: 21,
    fontSize: 30,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  titleRowSpace: {
    flex: 1.2,
  },
  titleRowAddWorkSpace: {
    flex: 1,
  },
  titleRowAddWork: {
    flex: 2,
    flexDirection: 'column',
  },
  titleSpace: {
    flex: 1.5,
  },
  titleSpaceTop: {
    flex: 1,
  },
  titleLine: {
    flex: 0.1,
    flexDirection: "row",
  },
  titleLineSpace: {
    flex: 5,
  },
  fl1Space: {
    flex: 1,
  },
  titleLineBorder: {
    flex: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  listView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  rowView: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    flex: 100,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingLeft: 10,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    minHeight: 33,
  },
});