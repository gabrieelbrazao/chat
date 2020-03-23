import React, { useState, useRef } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import style from "./style.js";
import api from "../../services/api.js";
import { useDispatch } from "react-redux";
import validate from "validate.js";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const dispatch = useDispatch();
  const triedLogin = useRef(false);

  function handleLogin() {
    triedLogin.current = true;

    let res = formValidateEmail();
    res += formValidatePassword();

    if (res) return;

    api
      .get("/login", { params: { email, password } })
      .then(res => {
        dispatch({
          type: "signIn",
          token: res.data.token
        });

        navigation.navigate("Chat");

        setEmail("");
        setPassword("");
        triedLogin.current = false;
      })
      .catch(err => {
        console.log(err);

        Alert.alert("Erro", "Falha na conexão com o servidor", [
          { text: "OK" }
        ]);
      });
  }

  function formValidateEmail(value = email) {
    const constraints = {
      email: {
        presence: {
          allowEmpty: false,
          message: "Digite seu e-mail"
        },

        email: { message: "E-mail inválido" }
      }
    };

    const res = validate({ email: value }, constraints, {
      fullMessages: false
    });

    setEmailError(res);

    return res;
  }

  function formValidatePassword(value = password) {
    const constraints = {
      password: {
        presence: {
          allowEmpty: false,
          message: "Digite sua senha"
        }
      }
    };

    const res = validate({ password: value }, constraints, {
      fullMessages: false
    });

    setPasswordError(res);

    return res;
  }

  return (
    <SafeAreaView>
      <View style={style.titleDiv}>
        <Title>LOGAR</Title>
      </View>

      <View style={style.form}>
        <View style={style.formGroup}>
          <TextInput
            mode="outlined"
            label="E-mail"
            onChangeText={value => {
              setEmail(value);
              triedLogin.current ? formValidateEmail(value) : "";
            }}
            error={emailError}
            autoCapitalize="none"
            value={email}
          />

          <HelperText type="error" visible={emailError} padding="none">
            {emailError?.email[0]}
          </HelperText>
        </View>

        <View style={style.formGroup}>
          <TextInput
            mode="outlined"
            label="Senha"
            onChangeText={value => {
              setPassword(value);
              triedLogin.current ? formValidatePassword(value) : "";
            }}
            secureTextEntry={true}
            error={passwordError}
            autoCapitalize="none"
            value={password}
          />

          <HelperText type="error" visible={passwordError} padding="none">
            {passwordError?.password[0]}
          </HelperText>
        </View>

        <Button
          icon="check-bold"
          loading={false}
          mode="contained"
          onPress={handleLogin}
        >
          Logar
        </Button>
      </View>
    </SafeAreaView>
  );
}
