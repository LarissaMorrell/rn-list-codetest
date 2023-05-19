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
  const [list, setList] = useState({'todo-oneitem': {title: 'oneitem', id: 'todo-oneitem'}});
  const [darkModeEnabled, toggleDarkMode] = useState(false);

  const handleAddItem = () => { //"Each todo title to be unique"
    //Assuming duplicates are allowed and not adjusting for punctuation
    const newList = { ...list };
    const newItemID = input.toLowerCase().replaceAll(' ', '-');
    newList[newItemID] = {
      title: input,
      id: input.toLowerCase().replaceAll(' ', '-'),
    };
    
    setList(newList);
    setInput('');
  };

  const handleRemoveItem = item => {
    const newList = {...list};
    delete newList[item.id];
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

  const AddButton = () => (
    <TouchableOpacity
      disabled={input.length === 0}
      testID="add-button-id"
      onPress={handleAddItem}
      style={styles.button}>
      <Text>Add</Text>
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
        <AddButton />
        <ScrollView>
          {Object.keys(list).map(item => ToDo(list[item]))}
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
