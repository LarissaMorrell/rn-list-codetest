/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const initialList = {
  'entry-sensor': {title: 'Entry Sensor', id: 'entry-sensor'},
  'motion-sensor': {title: 'Motion Sensor', id: 'motion-sensor'},
  'glassbreak-sensor': {title: 'Glassbreak Sensor', id: 'glassbreak-sensor'},
}

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState({...initialList});
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

  const handleRemoveAllItems = () => {
    setList({});
  };

  const onRemoveAllPress = () => {
    Alert.alert('Remove all', 'Are you sure you want to remove all items in your list?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Remove Items', onPress: handleRemoveAllItems, style: 'destructive'},
    ]);
  }

  const ToDo = item => (
    <TouchableOpacity
      testID="todo-id"
      key={item.id}
      onPress={() => handleRemoveItem(item)}
      style={styles.listItemContainer}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const disabledButton = {...styles.button, ...styles.disabledButton};
  const AddButton = () => (
    <TouchableOpacity
      disabled={input.length === 0}
      testID="add-button-id"
      onPress={handleAddItem}
      style={input.length === 0 ? disabledButton : styles.button}>
      <Text>Add</Text>
    </TouchableOpacity>
  );

  const RemoveAllButton = () => (
    <TouchableOpacity
      disabled={Object.keys(list).length === 0}
      testID="remove-button-id"
      onPress={onRemoveAllPress}
      style={Object.keys(list).length === 0 ? disabledButton : styles.button}>
      <Text>Remove All</Text>
    </TouchableOpacity>
  );

  return (
    <View
      testID="wrapper-id"
      style={{backgroundColor: darkModeEnabled ? '#888' : '#fff'}}>
      <SafeAreaView>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>SimpliSafe Cart</Text>
          <Switch
            trackColor={{false: '#767577', true: '#f79e00'}}
            ios_backgroundColor="#0f2544"
            onValueChange={toggleDarkMode}
            value={darkModeEnabled}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            testID="input-id"
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AddButton />
          <RemoveAllButton />
        </View>
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
    backgroundColor: '#f79e00',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#f5c878',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  listItemContainer: {
    backgroundColor: '#f1f1f2',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#0f2544',
  }
});

export default App;
