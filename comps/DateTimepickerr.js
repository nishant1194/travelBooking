import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DatePickerInput } from 'react-native-paper';

export default function DateTimepickerr() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DatePickerInput
        label="Select Date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
        inputMode="start" // Options: 'start', 'end', or 'none'
        mode="outlined"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
