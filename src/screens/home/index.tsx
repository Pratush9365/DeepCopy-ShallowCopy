// import React from 'react';
// import {Pressable, View} from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';

// interface CustomDateTimePickerProps {
//   isVisible: boolean;
//   mode: 'date' | 'time';
//   onConfirm: (value: string) => void;
//   onCancel: () => void;
// }

// const Date_Time_Screen: React.FC<CustomDateTimePickerProps> = ({
//   isVisible,
//   mode,
//   onConfirm,
//   onCancel,
// }) => {
//   const handleConfirm = (date: Date) => {
//     const formatted =
//       mode === 'date'
//         ? date.toDateString()
//         : date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
//     console.log('hhhh', formatted);
//     onConfirm(formatted);
//   };

//   return (

//         <DateTimePicker
//           isVisible={isVisible}
//           mode={mode}
//           onConfirm={handleConfirm}
//           onCancel={onCancel}
//         />
//   );
// };

// export default Date_Time_Screen;

import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {screenNames} from '../../utils/screenNames';

const Date_Time_Screen = ({}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigation: any = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: Date): void => {
    setDate(date.toDateString());
    hideDatePicker();
  };

  const handleTimeConfirm = (time: Date): void => {
    setTime(time.toString());
    console.log('Time', time.toString());
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text>{date}</Text>
      <Text>{time}</Text>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        design="material"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePicker
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <View style={styles.container1}>
        <Pressable style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Show Date</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showTimePicker}>
          <Text style={styles.buttonText}>Show Time</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(screenNames.FILE_UPLOAD)}>
        <Text style={styles.buttonText}>Click To Upload Document</Text>
      </Pressable>
    </View>
  );
};
export default Date_Time_Screen;
// import React, {useState} from 'react';
// import {View, Button, Platform, Text} from 'react-native';
// import DateTimePicker, {
//   AndroidEvent,
//   DateTimePickerEvent,
// } from '@react-native-community/datetimepicker';

// const Date_Time_Screen: React.FC = () => {
//   const [date, setDate] = useState<Date>(new Date());
//   const [show, setShow] = useState<boolean>(false);
//   const [mode, setMode] = useState<'date' | 'time'>('date');
//   const showMode = (currentMode: 'date' | 'time'): void => {
//     setMode(currentMode);
//     setShow(true);
//   };

//   const onChange = (
//     event: DateTimePickerEvent,
//     selectedDate?: Date | undefined,
//   ): void => {
//     if (Platform.OS === 'android') setShow(false);
//     if (selectedDate) setDate(selectedDate);
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{marginBottom: 10, fontSize: 16}}>
//         Selected: {date.toLocaleString()}
//       </Text>

//       <View style={{marginVertical: 5}}>
//         <Button title="Pick Date" onPress={() => showMode('date')} />
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Button title="Pick Time" onPress={() => showMode('time')} />
//       </View>

//       {show && (
//         <DateTimePicker
//           value={date}
//           mode={mode}
//           // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           // timeZoneOffsetInMinutes={60}
//           onChange={onChange}
//           is24Hour={true}
//           timeZoneName={'Europe/Prague'}
//           themeVariant="light"
//         />
//       )}
//     </View>
//   );
// };

// export default Date_Time_Screen;
