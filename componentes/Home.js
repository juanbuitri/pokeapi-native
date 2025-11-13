import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch("https://fakerapi.it/api/v2/users?_quantity=20");
        const json = await res.json();
        setUsuarios(json.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <ScrollView>
      <View style={styles.lista}>
        {usuarios.map((usuario, index) => (
          <View key={index} style={styles.item}>
            <Image
              source={{ uri: usuario.image }}
              style={styles.imagen}
            />
            <Text style={styles.nombre}>
              {usuario.firstname} {usuario.lastname}
            </Text>
            <Text style={styles.email}>{usuario.email}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    backgroundColor: '#f0f8ff',
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
});
