export interface IRequestCEP_APIProps {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: string;
}

export async function requestCEP_API(CEP: string) {
  if (isNaN(+CEP)) {
    return {
      erro: "DIGITE APENAS NÚMEROS",
    };
  } else if (CEP.length < 8) {
    return {
      erro: "DIGITE O CEP CORRETAMENTE",
    };
  } else
    return fetch(`https://viacep.com.br/ws/${CEP}/json/`)
      .then((e) => e.json())
      .catch((erro) => {
        return {
          erro: `${erro}`,
        };
      });
}
