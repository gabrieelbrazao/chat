import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import style from "./style";
import { useSelector } from "react-redux";
import socket from "../../services/socket";

export default function Chat({ navigation }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const state = useSelector(state => state);
  const scroll = useRef(null);

  useEffect(() => {
    scroll.current.scrollToEnd({ animated: true });

    return;
  }, [messages]);

  socket.on("newMessage", data => {
    setMessages([
      ...messages,
      { message: data.message, time: getTime(), inOut: "out", name: data.name }
    ]);
  });

  socket.on("error", err => {
    err == "Invalid Token" ? navigation.navigate("Cadastrar") : "";
  });

  function handleSendMessage() {
    setMessage("");

    socket.emit("sendMessage", {
      message,
      token: "Bearer " + state.token
    });

    setMessages([...messages, { message, time: getTime(), inOut: "in" }]);
  }

  function getTime() {
    const date = new Date();

    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return hours + ":" + minutes;
  }

  return (
    <SafeAreaView style={style.body}>
      <ScrollView style={style.chat} ref={scroll}>
        {messages.map((value, index) => {
          if (value.inOut == "in") {
            return (
              <View style={style.messageInView} key={index}>
                <Text style={style.nameIn}>You</Text>
                <Text style={style.messageIn}>{value.message}</Text>

                <Text style={style.hourIn}>{value.time}</Text>
              </View>
            );
          } else {
            return (
              <View key={index}>
                <Text style={style.nameOut}>{value.name}</Text>
                <Text style={style.messageOut}>{value.message}</Text>

                <Text style={style.hourOut}>{value.time}</Text>
              </View>
            );
          }
        })}
      </ScrollView>

      <View style={style.container}>
        <TextInput
          mode="outlined"
          style={style.input}
          placeholder="Digite aqui"
          onChangeText={setMessage}
          value={message}
        />
        <TouchableOpacity style={style.button} onPress={handleSendMessage}>
          <Text style={style.textButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
