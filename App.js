/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([{title: 'oneitem', id: 'todo-oneitem'}]);
  const [darkModeEnabled, toggleDarkMode] = useState(false);

  const handleAddItem = () => {
    //Assuming duplicates are allowed and not adjusting for punctuation
    const newList = {
      title: input,
      id: input.toLowerCase().replaceAll(' ', '-'),
    };
    console.log(input, newList, [...list, newList]);
    setList([...list, newList]);
    setInput('');
  };

  const handleRemoveItem = item => {
    const removedIndex = list.indexOf(item);
    const newList = [...list];
    newList.splice(removedIndex, 1);
    setList(newList);
  };

  const ToDo = item => (
    <TouchableOpacity
      testID="todo-id"
      key={item.id}
      onPress={() => handleRemoveItem(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      testID="wrapper-id"
      style={{backgroundColor: darkModeEnabled ? '#888' : '#fff'}}>
      <SafeAreaView>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkModeEnabled}
        />
        <TextInput
          testID="input-id"
          value={input}
          onChangeText={setInput}
          style={{borderWidth: 1}}
        />
        <TouchableOpacity
          disabled={input.length === 0}
          testID="add-button-id"
          onPress={handleAddItem}
          style={styles.button}>
          <Text>Add</Text>
        </TouchableOpacity>
        <ScrollView>
          {list.map(item => ToDo(item))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    paddingVertical: 5,
    backgroundColor: '#81b0ff',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default App;
