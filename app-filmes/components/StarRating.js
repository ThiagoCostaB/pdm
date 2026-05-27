import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StarRating({ rating, setRating }) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginTop: 8 },
  star: { fontSize: 32, color: 'yellow', marginRight: 6 },
});