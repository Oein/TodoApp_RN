import { SafeAreaView , Text, View , ScrollView , TextInput, Pressable , Dimensions, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import React , { useState , useEffect } from 'react';
import { styles } from "./styles";
import Checkbox from "react-native-bouncy-checkbox";
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  let [openedAddTodoWindow , SetopenAddToDoWindow] = useState(false);
  let [inFoldersWindow , SetInFoldersWindow] = useState(true);
  let [todoList , SetTodoList] = useState({"WorkGroups":[]});
  let [workInputText , SetWorkInputText] = useState('');
  let [workGroup , SetWorkGroup] = useState('');
  let [editTodoKey , SetEditTodoKey] = useState('');
  let [editing_is_folder, SetEditingIsFolder] = useState(false);

  function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
  }

  let save = async (th) => {
    try {
      SetWorkInputText('');
      await AsyncStorage.setItem('@todoList', JSON.stringify(th));
      await AsyncStorage.setItem('@workGroup', JSON.stringify(th));
    } catch (e){
      Alert.alert(
        "Fail To Save",
        "Fail To Save Todos , Are You going to save again?",
        [
          {
            "text":"Don't save again",
          },
          {
            "text":"Save again",
            "onPress":save,
          },
        ]
      )
    }
  };

  let load = async () => {
    try {
      const d = JSON.parse(await AsyncStorage.getItem('@todoList'));
      if(d != null){
        SetTodoList(d);
      }else{
        SetTodoList({"WorkGroups":[]});
      }
    } catch (e){
      Alert.alert(
        "Fail To Load",
        "Fail To Load Todos , Are You going to load again?",
        [
          {
            "text":"Don't load again",
          },
          {
            "text":"Load again",
            "onPress":load,
          }
        ]
      )
    }
  };

  useEffect(async () => {
    await load();
  } , [])

  return (
    <SafeAreaView style={styles.containor}>
      <View style={styles.titleView}>
        <View style={{flex: 0.5}}></View>
        <View style={styles.titleSpaceTop}>
          {
            workGroup != "" ? (
              <View style={styles.rowView}>
                <Text>   </Text>
                <Pressable 
                  onPress={() => {
                    SetWorkGroup("");
                    SetWorkInputText("");
                    SetEditTodoKey("");
                    SetEditingIsFolder(false);
                  }}
                >
                  <Fontisto name="angle-left" size={18} color="gray" />
                </Pressable>
              </View>
            ) : null
          }
        </View>
        <View style={styles.titleRow}>
          <View style={styles.titleRowSpace}></View>
          <Text style={styles.title}>{editTodoKey != "" ? (editing_is_folder ? "Edit Folder Name" : "Edit Todo Name" ) : workGroup == "" ? "Todo List" : workGroup}</Text>
          <View style={styles.titleRowAddWork}>
            <View style={styles.titleRowAddWorkSpace}></View>
            <Pressable style={styles.titleRowAddWorkAdd} onPress={() => {
              if(openedAddTodoWindow) SetEditTodoKey("");
              SetopenAddToDoWindow(!openedAddTodoWindow);
              SetEditingIsFolder(false);
            }}>
              {
                openedAddTodoWindow ? (
                  <Feather name="x" size={18} color="black" />
                ) : (
                  <Fontisto name="plus-a" size={18}  color="black" />
                )
              }
            </Pressable>
            <View style={styles.titleRowAddWorkSpace}></View>
          </View>
          <View style={styles.titleRowSpace}></View>
        </View>
        <View style={styles.titleLine}>
          <View style={styles.fl1Space}></View>
          <View style={styles.titleLineBorder}></View>
          <View style={styles.fl1Space}></View>
        </View>
      </View>

      {openedAddTodoWindow == true ? (
          <View style={styles.addTodoWindow}>
            <View style={styles.addWorkView}>
              <View style={styles.addWorkViewSpace}></View>
              <TextInput value={workInputText} maxLength={(screenWidth - 80) / 12} style={styles.input} placeholder="Put Name Here" onChangeText={SetWorkInputText}></TextInput>
              <View style={styles.addWorkViewSpace}></View>
            </View>
            <View>
              {
                editTodoKey == "" ? (
                  <View style={[styles.rowView , styles.alignCenter]}>
                    <AntDesign name="addfile" size={24} color="black" />
                    <Pressable
                      title="Make Todo"
                      onPress={async () => {
                        let newTodoList = {...todoList}
                        newTodoList[new Date().toString()] = {"id":new Date().toString(),"workGroup":workGroup,"name":workInputText,"done":false};
                        SetTodoList(newTodoList);
                        SetopenAddToDoWindow(false);
                        save(newTodoList)
                      }}
                    >
                    <Text style={{color: "#3478F6",fontSize: 20}}> Make Todo </Text>
                    </Pressable>
                    {
                      workGroup == "" ? (
                        <View style={[styles.rowView , styles.alignCenter]}>
                          <AntDesign name="addfolder" size={24} color="black" />
                          <Pressable
                            title="Make Folder"
                            onPress={() => {
                              let newTodoList = {...todoList}
                            workInputText = " " + workInputText;
                              newTodoList["WorkGroups"].push(workInputText);
                              SetTodoList(newTodoList);
                              SetopenAddToDoWindow(false);
                              SetEditTodoKey("");
                              save(newTodoList)
                            }}
                          > 
                            <Text style={{color: "#3478F6",fontSize: 20}}> Make Folder </Text>
                          </Pressable>
                        </View>
                      ) : null
                    }
                  </View>
                ) : (
                  <View style={[styles.alignCenter]}>
                    <Pressable 
                      style={[styles.rowView , styles.alignCenter]}
                      onPress={() => {
                        if(editing_is_folder){
                          let newTodoList = {...todoList};
                          if(todoList["WorkGroups"].includes(" " + workInputText)){
                            Alert.alert("This Folder name is already exist");
                          }else{
                            Object.keys(newTodoList).map(kkk => {
                              if(kkk == "WorkGroups") return;
                              if(newTodoList[kkk]["workGroup"] == todoList["WorkGroups"][editTodoKey]){
                                newTodoList[kkk]["workGroup"] = " " + workInputText;
                              }
                            });

                            newTodoList["WorkGroups"][editTodoKey] = " " + workInputText;

                            SetTodoList(newTodoList);
                            SetopenAddToDoWindow(false);
                            SetWorkGroup("");
                            SetWorkInputText("");
                            SetEditTodoKey("");
                            SetEditingIsFolder(false);
                            save(newTodoList)
                          }
                        }else{
                          let newTodoList = {...todoList};
                          newTodoList[editTodoKey]["name"] = workInputText;
                          SetTodoList(newTodoList);
                          SetopenAddToDoWindow(false);
                          SetEditTodoKey("");
                          save(newTodoList)
                        }
                      }}
                    >
                      <Feather name="edit" size={24} color="black" />
                      <Text style={{fontSize: 20 , color: "#3478F6"}}>  Edit {editing_is_folder ? "Folder" : "Todo"} Name</Text>
                    </Pressable>
                  </View>
                )
              }
            </View>  
            <View style={styles.addTodoWindowSpace}></View>
          </View>
        ) : (
          <View style={styles.listView}>
            <View style={styles.titleLineSpace}></View>
            <View style={styles.rowView , [{flex: 65}]}>
              <ScrollView style={{width: screenWidth - 50 , alignContent: "space-between"}}>
                {
                  workGroup == "" ? Object.keys(todoList["WorkGroups"]).map((key , index) => {
                    return (
                      <View key={index} style={styles.todoListItem}>
                        <Pressable 
                          style={styles.rowView}
                          onPress={() => {
                            SetWorkGroup(todoList["WorkGroups"][key]);
                          }}
                        >
                          <Fontisto name="folder" size={24} color="black" />
                          <Text>    {todoList["WorkGroups"][key]}</Text>
                        </Pressable>
                        <View style={{flex: 999}}></View>
                          <Pressable
                            onPress={() => {
                              Alert.alert(
                                "Delete Folder?",
                                "Are you sure you want to delete this folder? This action can't be undone. And all todos in this folder will be deleted.",
                                [
                                  {
                                    "text": "Cancel",
                                    "onPress": () => {

                                    }
                                  },
                                  {
                                    "text": "Delete",
                                    "onPress": () => {
                                      let newTodo = {...todoList}
                                      newTodo["WorkGroups"] = arrayRemove(newTodo["WorkGroups"] , newTodo["WorkGroups"][key]);
                                      Object.keys(newTodo).map((nk , index) => {
                                        if(nk != "WorkGroups"){
                                          if(todoList[nk]["workGroup"] == todoList["WorkGroups"][key]){
                                            delete newTodo[nk];
                                          }
                                        }
                                      })
                                      SetTodoList(newTodo)
                                      save(newTodo)
                                    }
                                  }
                                ]
                              );

                            }}
                          >
                            <Fontisto name="trash" size={22} color="black" />
                        </Pressable>
                        <View style={{width: 10}}></View>
                          <Pressable
                            onPress={() => {
                              SetWorkInputText(todoList["WorkGroups"][key])
                              SetEditTodoKey(key)
                              SetopenAddToDoWindow(true)
                              SetEditingIsFolder(true)
                            }}
                          >
                            <Feather name="edit" size={22} color="black" />
                          </Pressable>
                      </View>
                    )
                  }) : null
                }

                {
                  Object.keys(todoList).map((key, index) => {
                    if(workGroup == todoList[key]["workGroup"] && key != "WorkGroups"){
                      return (
                        <View style={[styles.todoListItem , {alignContent: "space-around",flexDirection:"row"}]} key={index}>
                          <Checkbox 
                            isChecked={todoList[key]["done"]}
                            size={24}
                            onPress={
                              (payload) => {
                                if(payload) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                                else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                let newTodoList = {...todoList}
                                newTodoList[key]["done"] = payload
                                SetTodoList(newTodoList)
                                save(newTodoList)
                              }
                            }
                          />
                          <Text style={todoList[key]["done"] ? {textDecorationLine: "line-through",color:"gray"} : {color: "black",textDecorationLine:"none"}}>{todoList[key]["name"]}</Text>
                          <View style={{flex: 999}}></View>
                          {
                            todoList[key]["done"] ? (
                              <Pressable
                                onPress={() => {
                                  let newTodo = {...todoList}
                                  delete newTodo[key]
                                  SetTodoList(newTodo)
                                  save(newTodo)
                                }}
                              >
                                <Fontisto name="trash" size={22} color="black" />
                              </Pressable>
                            ) : null
                          }
                          <View style={{width: 10}}></View>
                          <Pressable
                            onPress={() => {
                              SetEditTodoKey(key)
                              SetopenAddToDoWindow(true)
                              SetWorkInputText(todoList[key]["name"])
                            }}
                          >
                            <Feather name="edit" size={22} color="black" />
                          </Pressable>
                        </View>
                      )
                    }else{
                      return null
                    }
                  })
                }
              </ScrollView>
            </View>
            <View style={styles.titleLineSpace}></View>
          </View>
        )
      }
    </SafeAreaView>
  );
}
