import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function Index() {
  const db = SQLite.openDatabaseSync('database');
  const [isLoading, setIsLoading] = useState(false);
  const [currentName, setCurrentName] = useState("");

  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS names (id INTERGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);`)
  function getRows(){
    const num = getLastnum();
    const allRows = db.getAllSync('SELECT * FROM names');
    for(let i=0; i<num;i++){
      console.log(allRows[i]);
    }
  }
  function getLastnum(){
    const val = db.getAllSync('SELECT * FROM names ORDER BY id DESC LIMIT 1');
    return val[0].id;
  }
  function addRow(){
    let num = getLastnum();
    const str = db.getAllSync('INSERT INTO names (id, name) VALUES(?, ?);',num+1, currentName)
  }
  function delRow(){
    const str = db.getAllAsync('DELETE FROM names WHERE name = ?',currentName)
  }
  if (isLoading){
    return(
      <View style={style.container}>
        <Text style={style.text}>Loading names...</Text>
      </View>
    )
  }
  return (
    <View
      style={style.container}
    >
      <TextInput style={style.sText} value={currentName} placeholder="name..." onChangeText={setCurrentName}/>
      <TouchableOpacity title="getNames" onPress={getRows}>
        <Text>getNomes</Text>
        </TouchableOpacity>
        <TouchableOpacity title="insertName" onPress={addRow}>
          <Text>addNome</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getLastnum}>
          <Text>getLastnum</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={delRow}>
          <Text>Del</Text>
        </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    fontWeight:'bold',
    fontSize:20,
  },
  sText:{
    fontSize:20
  },
  button:{
    marginTop:12
  }
})
