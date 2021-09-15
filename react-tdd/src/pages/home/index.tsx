import React from "react";

import { requestCEP_API, IRequestCEP_APIProps } from "../../api";

export default function Home() {
  const [cep, setCep] = React.useState<string>("");
  const [data, setData] = React.useState<IRequestCEP_APIProps>();

  function handleChangeCep(text: string) {
    setCep(text);
  }

  async function handleRequestCep_Api() {
    await requestCEP_API(cep).then((e) => setData(e));
  }

  return (
    <div>
      <h1>Testes Automatizados - API</h1>

      <input
        maxLength={8}
        type="text"
        placeholder="Digite um CEP"
        onChange={(e) => handleChangeCep(e.target.value)}
      />

      <button onClick={handleRequestCep_Api}>Consultar</button>

      {data && (
        <div data-testid="responseAPICEP">
          {data.erro ? (
            <p>
              {typeof data.erro == "boolean" ? "CEP INVALIDO" : `${data.erro}`}
            </p>
          ) : (
            <>
              <p>CEP: {data.cep}</p>
              <p>LOGRADOURO: {data.logradouro}</p>
              <p>COMPLEMENTO: {data.complemento}</p>
              <p>BAIRRO: {data.bairro}</p>
              <p>LOCALIDADE: {data.localidade}</p>
              <p>UF: {data.uf}</p>
              <p>IBGE: {data.ibge}</p>
              <p>GIA: {data.gia}</p>
              <p>DDD: {data.ddd}</p>
              <p>SIAFI: {data.siafi}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
