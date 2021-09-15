import { ResponseComposition, RestContext, RestRequest } from "msw";

export const mockCepApiSucess = (
  req: RestRequest,
  res: ResponseComposition<any>,
  ctx: RestContext
) => {
  return res(
    ctx.json({
      bairro: "",
      cep: "35588000",
      complemento: "",
      ddd: "37",
      gia: "",
      ibge: "3104205",
      localidade: "Arcos",
      logradouro: "",
      siafi: "4083",
      uf: "MG",
    })
  );
};

export const mockCepApiErro = (
  req: RestRequest,
  res: ResponseComposition<any>,
  ctx: RestContext
) => {
  return res(
    ctx.json({
      erro: true,
    })
  );
};
