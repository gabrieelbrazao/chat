import React, { useState, useRef } from "react";
import { SafeAreaView, View, Alert, ScrollView } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import style from "./style.js";
import api from "../../services/api";
import validate from "validate.js";

export default function CadastroUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordConfirmError, setPasswordConfirmError] = useState();

  const triedSingUp = useRef(false);
  const loading = useRef(false);

  function handleCreateUser() {
    loading.current = true;
    triedSingUp.current = true;

    let res = formValidateName();
    res += formValidateEmail();
    res += formValidatePassword();
    res += formValidatePasswordConfirm();

    if (res) {
      loading.current = false;
      return;
    }

    api
      .post("/createUser", { name, email, password })
      .then(() => {
        Alert.alert("Sucesso", "Usuário cadastrado", [{ text: "OK" }]);
      })
      .catch(error => {
        console.log(`Erro ao conectar com o servidor: ${error}`);

        Alert.alert("Erro", "Falha na conexão com o servidor", [
          { text: "OK" }
        ]);
      })
      .finally(() => (loading.current = false));
  }

  function formValidateName(value = name) {
    const constraints = {
      name: {
        presence: {
          allowEmpty: false,
          message: "Digite seu nome"
        }
      }
    };

    const res = validate({ name: value }, constraints, {
      fullMessages: false
    });

    setNameError(res);

    return res;
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
        },

        length: {
          minimum: 8,
          message: "Senha muito curta"
        }
      }
    };

    const res = validate({ password: value }, constraints, {
      fullMessages: false
    });

    setPasswordError(res);

    return res;
  }

  function formValidatePasswordConfirm(value = passwordConfirm) {
    const constraints = {
      passwordConfirm: {
        presence: {
          allowEmpty: false,
          message: "Confirme sua senha"
        },

        equality: {
          attribute: "password",
          message: "Senhas diferentes"
        }
      }
    };

    const res = validate({ passwordConfirm: value, password }, constraints, {
      fullMessages: false
    });

    setPasswordConfirmError(res);

    return res;
  }

  return (
    <SafeAreaView style={style.body}>
      <ScrollView>
        <View style={style.titleDiv}>
          <Title>CADASTRAR USUÁRIO</Title>
        </View>

        <View style={style.form}>
          <View style={style.formGroup}>
            <TextInput
              mode="outlined"
              label="Nome"
              onChangeText={value => {
                setName(value);
                triedSingUp.current ? formValidateName(value) : "";
              }}
              error={nameError}
              value={name}
            />

            <HelperText type="error" visible={nameError} padding="none">
              {nameError?.name[0]}
            </HelperText>
          </View>

          <View style={style.formGroup}>
            <TextInput
              mode="outlined"
              label="E-mail"
              onChangeText={value => {
                setEmail(value);
                triedSingUp.current ? formValidateEmail(value) : "";
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
              secureTextEntry={true}
              onChangeText={value => {
                setPassword(value);
                triedSingUp.current ? formValidatePassword(value) : "";
              }}
              error={passwordError}
              autoCapitalize="none"
            />

            <HelperText type="error" visible={passwordError} padding="none">
              {passwordError?.password[0]}
            </HelperText>
          </View>

          <View style={style.formGroup}>
            <TextInput
              mode="outlined"
              label="Confirmar senha"
              secureTextEntry={true}
              onChangeText={value => {
                setPasswordConfirm(value);
                triedSingUp.current ? formValidatePasswordConfirm(value) : "";
              }}
              error={passwordConfirmError}
              autoCapitalize="none"
            />

            <HelperText
              type="error"
              visible={passwordConfirmError}
              padding="none"
            >
              {passwordConfirmError?.passwordConfirm[0]}
            </HelperText>
          </View>

          <Button
            icon="check-bold"
            loading={loading.curent}
            mode="contained"
            onPress={handleCreateUser}
          >
            Cadastrar
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
