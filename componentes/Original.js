import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_ATTEMPTS = 5;

export default function Original() {
  const [userData, setUserData] = useState(null);
  const [nameToGuess, setNameToGuess] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    setLoading(true);
    const res = await fetch('https://fakerapi.it/api/v2/users?_quantity=1');
    const json = await res.json();
    const user = json.data[0];
    setUserData(user);
    setNameToGuess(user.firstname.toUpperCase());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setLoading(false);
  };

  const handleLetterClick = (letter) => {
    if (guessedLetters.includes(letter) || gameOver || gameWon) return;

    const updated = [...guessedLetters, letter];
    setGuessedLetters(updated);

    if (!nameToGuess.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= MAX_ATTEMPTS) setGameOver(true);
    } else {
      const allCorrect = nameToGuess.split('').every(l => updated.includes(l));
      if (allCorrect) setGameWon(true);
    }
  };

  const renderWord = () =>
    nameToGuess.split('').map((letter, i) => (
      <Text key={i} style={styles.letter}>
        {guessedLetters.includes(letter) || gameWon || gameOver ? letter : '_'}
      </Text>
    ));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🕵️ Adivina la Identidad</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Image source={{ uri: userData.image }} style={styles.image} />
          <Text style={styles.hint}>
            Pista: Trabaja como {userData.employment.title} en {userData.address.country}
          </Text>

          <View style={styles.wordContainer}>{renderWord()}</View>

          <View style={styles.keyboard}>
            {ALPHABET.map((letter) => (
              <TouchableOpacity
                key={letter}
                onPress={() => handleLetterClick(letter)}
                disabled={guessedLetters.includes(letter) || gameOver || gameWon}
                style={[
                  styles.key,
                  guessedLetters.includes(letter) && styles.keyDisabled,
                ]}
              >
                <Text>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.attempts}>Fallos: {wrongGuesses} / {MAX_ATTEMPTS}</Text>

          {gameOver && <Text style={styles.lost}>💀 Era: {nameToGuess}</Text>}
          {gameWon && <Text style={styles.won}>🎉 ¡Correcto!</Text>}

          {(gameOver || gameWon) && (
            <TouchableOpacity style={styles.button} onPress={obtenerUsuario}>
              <Text style={styles.buttonText}>Jugar otra vez</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
  image: { width: 150, height: 150, borderRadius: 75, marginVertical: 10 },
  hint: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  wordContainer: { flexDirection: 'row', marginBottom: 20, flexWrap: 'wrap' },
  letter: { fontSize: 28, marginHorizontal: 4 },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  key: {
    backgroundColor: '#eee',
    padding: 10,
    margin: 4,
    borderRadius: 4,
    width: 40,
    alignItems: 'center',
  },
  keyDisabled: { backgroundColor: '#ccc' },
  attempts: { fontSize: 16, marginBottom: 10 },
  lost: { color: 'red', fontSize: 18 },
  won: { color: 'green', fontSize: 18 },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#0066cc',
    borderRadius: 5,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
