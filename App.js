import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState(null);

  const btns = {
    'log': 'log',
    'sin': 'sin',
    'cos': 'cos',
    'tan': 'tan',
    'sqrt': 'sqrt',
    'pow': 'pow',
    'C': 'C',
    'CE': 'CE',
    '7': '7',
    '8': '8',
    '9': '9',
    '/': '/',
    '4': '4',
    '5': '5',
    '6': '6',
    '*': '*',
    '1': '1',
    '2': '2',
    '3': '3',
    '-': '-',
    '0': '0',
    '.': '.',
    'pi': 'π',
    '+': '+',
    '=': '=',
  };

  const handlePress = (btn) => {
    if (btn === 'C') {
      setDisplay('');
      setResult(null);
    } else if (btn === 'CE') {
      setDisplay(display.slice(0, -1));
    } else if (btn === '=') {
      try {
        const expression = display.replace(/π/g, Math.PI);
        setResult(eval(expression));
      } catch (error) {
        setResult('Error');
      }
    } else if (['log', 'sin', 'cos', 'tan', 'sqrt'].includes(btn)) {
      try {
        const value = eval(display);
        let calcResult;
        switch (btn) {
          case 'log':
            calcResult = Math.log10(value);
            break;
          case 'sin':
            calcResult = Math.sin(value);
            break;
          case 'cos':
            calcResult = Math.cos(value);
            break;
          case 'tan':
            calcResult = Math.tan(value);
            break;
          case 'sqrt':
            calcResult = Math.sqrt(value);
            break;
          default:
            calcResult = value;
        }
        setResult(calcResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (btn === 'pow') {
      setDisplay(display + '**');
    } else {
      setDisplay(display + btn);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
        {result !== null && <Text style={styles.resultText}>= {result}</Text>}
      </View>
      <View style={styles.buttons}>
        {Object.keys(btns).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.button,
              isNaN(btns[key]) && btns[key] !== '.' ? styles.nonNumberButton : {},
              btns[key] === '=' ? styles.equalButton : {},
            ]}
            onPress={() => handlePress(btns[key])}
            disabled={btns[key] === '=' && display === ''}
          >
            <Text style={styles.buttonText}>{btns[key]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    width: '90%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#444',
    padding: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 36,
    color: '#fff',
  },
  resultText: {
    fontSize: 24,
    color: '#aaa',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '20%',
    padding: 20,
    margin: 5,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  nonNumberButton: {
    backgroundColor: '#888', // More appealing color for non-number buttons
  },
  equalButton: {
    width: '45%',
    backgroundColor: '#ff5722',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});