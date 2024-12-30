//utils para variaveis comuns em mais de uma tela
export const alteraDados = (variavel, valor, dados, setDados) => {
    setDados({
        ...dados, //recupera o valor que estava dentro dos dados
        [variavel]: valor
    })
}

export function verificaSeTemEntradaVazia(dados, setDados){
  //object.entries entrada do objeto
    for(const [variavel, valor] of Object.entries(dados)){
      if(valor == '') {
        setDados({
          ...dados,//pega dados
          [variavel]: null //setando varivel como nula
        })
        return true
      }
    }
    return false
  }