import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerExample = () => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTime(false);
    setDate(currentTime);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Date & Time: {date.toLocaleString()}</Text>

      {/* Select Date */}
      <Button title="Select Date" onPress={() => setShowDate(true)} />

      {/* Select Time */}
      <Button title="Select Time" onPress={() => setShowTime(true)} />

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

export default DatePickerExample;