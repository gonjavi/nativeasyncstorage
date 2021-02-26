import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, TouchableHighlight, Button } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
const App = () => {
  const [inputTexto, guardarInputTexto] = useState('');
  const [nombreStorage, guardarNombreStorage] = useState('');

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      guardarNombreStorage(nombre);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      guardarNombreStorage(inputTexto);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <View style={styles.contenedor}>
        <Text>Hola: {nombreStorage}</Text>
        <TextInput 
          placeholder="Escribe tu Nombre"
          style={styles.input}
          onChangeText={texto => guardarInputTexto(texto)}
        />

        <Button
          title="Guardar"
          color="#333"
          onPress={() => guardarDatos()}
        />

        <TouchableHighlight style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar Nombre  &times;</Text>
        </TouchableHighlight>
      </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#555',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
