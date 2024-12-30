import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../servicos/requisicoesFirebase';
import estilos from './estilos';
import { Alerta } from '../../componentes/Alerta';
import { auth } from '../../config/firebase';
import { alteraDados, verificaSeTemEntradaVazia } from '../../utils/comum';
import { entradas } from './entradas';

import animacaoCarregando from '../../../assets/animacaoCarregando.gif';

export default function Login({ navigation }) {
  const [dados, setDados] = useState({ //objeto pra representar email e senha
    email: '',
    senha: ''
  })

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { // por questões de performance tem que retornar algo
    const estadoUsuario = auth.onAuthStateChanged( usuario => { // se o estado do usuário alterar
      if(usuario){
        navigation.replace('Principal')
      } //quando já tiver carregado
      setCarregando(false)
    })
    return () => estadoUsuario();
  },[])

  async function realizarLogin(){
    // funcao para verificar se email ou senha sao vazios
    if(verificaSeTemEntradaVazia(dados, setDados)) return
    
    const resultado = await logar(dados.email, dados.senha)
    if(resultado == 'erro'){
      setStatusError(true)
      setMensagemError('E-mail ou senha não conferem')
      return
    } //após o Login ser redirecionado para a tela Principal
    navigation.replace('Principal') //apaga tela anterior
  }

  if(carregando) { // se estiver carregando
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={animacaoCarregando} 
          style={estilos.imagem}
        />
      </View>
    )
  }

  return (
    <View style={estilos.container}>
      {
        entradas.map((entrada) => { //percorrendo o vetor com map
          return (
            <EntradaTexto
              key={entrada.id} //chave que quer acessar
              {...entrada}//spreadsheet resgata o valor que estava em entrada anteriormente
              value={dados[entrada.name]}
              onChangeText={valor => alteraDados(entrada.name, valor, dados, setDados)}
            />  
          )
        })
      }

      <Alerta 
        mensagem={mensagemError}
        error={statusError}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
