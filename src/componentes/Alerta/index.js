import React from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, error=false, setError }){

  //SnackBar para apresentar os erros na tela
  return (
    <Snackbar
      visible={error}
      onDismiss={() => setError(false)}
      duration={1500}//segundos
      action={{
        label: "OK",
        onPress: () => setError(false)// pra sumir
      }}
    >
      {mensagem}
    </Snackbar>
  )
}