import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useStores } from "../stores";

export default observer(function TodoScreen() {

  const { todo } = useStores()
  const [inputValue, setInputValue] = useState("")

  const handleAddTodo = () => {
    if(inputValue.trim()){
      todo.addTodo(inputValue.trim())
      setInputValue("")
    }
  }

  const renderTodoItem = ({item}: any) => (
    <View style={{ marginBottom: 5, borderWidth: 1, borderColor: '#000', padding: 12, borderRadius: 50}}>
      <Text>{item.title}</Text>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo App</Text>
        <Text>Live demo</Text>
      </View>
      <View>
        <TextInput
          style={styles.inputSection}
          placeholder="add a new todo"
          placeholderTextColor="#aaa"
          onChangeText={setInputValue}
          onSubmitEditing={handleAddTodo}
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <TouchableOpacity onPress={handleAddTodo}>
          <Text>Add todo </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 12}} />
      <View style={{ padding: 10 }}>
        <FlatList
          data={todo.todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
  )
});

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  inputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    gap: 8,
  },
})