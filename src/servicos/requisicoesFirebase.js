import { auth } from "../config/firebase"; //importando o autenticador do firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes //enum de erros do firebase
} from "firebase/auth";

function errosFirebase(error) {
  let mensagem = '';
  switch (error.code) { //pegando o código de erro do firebase
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse email já está em uso";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "Email inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha precisa de no minimo 6 caracteres";
      break;
    default:
      mensagem = "Erro desconhecido";
  }
  return mensagem;
}

//código direto da documentação do firebase
export async function cadastrar(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario)
      return "sucesso"
    })
    .catch((error) => {
      console.log(error);
      return errosFirebase(error)
    });

  return resultado
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)//função do firebase para fazer login
  .then((dadosDoUsuario) => {
    console.log(dadosDoUsuario)
    return "sucesso"
  })
    .catch((error) => {
      console.log(error);
      return "erro"
    });
  return resultado
}