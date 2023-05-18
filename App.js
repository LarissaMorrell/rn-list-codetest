/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([{ title: 'oneitem', id: 'todo-oneitem'}]);

  const handleAddItem = () => { //Assuming duplicates are allowed and not adjusting for punctuation
    console.log('handleAddItem');
    const newList = {title: input, id: input.toLowerCase().replaceAll(' ', '-')};

    setList([...list, newList]);
    setInput('');
  }

  const handleRemoveItem = (item) => {
    const removedIndex = list.indexOf(item);
    const newList = [...list];
    newList.splice(removedIndex, 1);
    setList(newList);
  }

  const ToDo = (item) => (
    <TouchableOpacity
      testID="todo-id"
      key={item.id}
      onPress={() => handleRemoveItem(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View testID="wrapper-id">
        <TextInput
          testID="input-id"
          value={input}
          onChangeText={setInput}
          style={{borderWidth: 1}}
        />
        <TouchableOpacity
          disabled={!!list.length}
          testID="add-button-id"
          onPress={handleAddItem}
        >
          <Text>Add</Text>
        </TouchableOpacity>
        <View>
          {list.map((item) => ToDo(item))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
