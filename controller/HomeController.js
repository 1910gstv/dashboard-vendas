const state = {
  dataBoxes: {
    faturamento: document.querySelector("#faturamento .principalData"),
    total_custos: document.querySelector("#total_custos .principalData"),
    total_lucro: document.querySelector("#total_lucro .principalData"),
    pedidos_abertos: document.querySelector("#pedidos_abertos .principalData"),
    numero_pedidos: document.querySelector("#numero_pedidos .principalData"),
    itens_vendidos: document.querySelector("#itens_vendidos .principalData"),
  },
};

var axiosConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

// ================================================================================================= //

// Conexão banco de dados
const baseURL = "http://localhost:8081";

// Criar uma função para receber cada dado dinamicamente do banco de dados

async function returnNumeroPedidos() {
  const result = await axios
    .get(`${baseURL}/Pedidos`, axiosConfig)
    .then((response) => {
      console.log(response);
      const numeroPedidos = response.data.length;
      return numeroPedidos;
    });
  return result;
}

async function returnFaturamento() {
  const result = await axios
    .get(`${baseURL}/Pedidos`, axiosConfig)
    .then((response) => {
      let resultValor = 0;
      for (let i = 0; i < response.data.length; i++) {
        var valor = response.data[i].valor_total;

        resultValor = resultValor + valor;
      }
      return parseFloat(resultValor).toFixed(2);
    });

  return result;
}

async function returnItensVendidos() {
  const result = await axios
    .get(`${baseURL}/Pedidos`, axiosConfig)
    .then((response) => {
      let resultQtd = 0;
      for (let i = 0; i < response.data.length; i++) {
        var valor = response.data[i].qtd;

        resultQtd = resultQtd + valor;
      }
      return parseInt(resultQtd);
    });

  return result;
}

const returnCustos = async () => {
  const result = 1000;
  return result;
};

async function returnLucro() {
  const result = (await returnFaturamento()) - (await returnCustos());
  return result;
}

async function returnPedidosAbertos() {
  const result = await axios
    .get(`${baseURL}/pedidosabertos`)
    .then((response) => {
      console.log(response.data.length);
      const dataResult = response.data.length;
      return dataResult;
    });

  return result;
}

//Alimentar o Front-End
async function feedDatas() {
  let data = state.dataBoxes;

  data.faturamento.innerText = "R$" + (await returnFaturamento());
  data.total_custos.innerText = "R$" + (await returnCustos());
  data.total_lucro.innerText = "R$" + (await returnLucro());
  data.pedidos_abertos.innerText = await returnPedidosAbertos();
  data.numero_pedidos.innerText = await returnNumeroPedidos();
  data.itens_vendidos.innerText = await returnItensVendidos();
}

// Cadastrar pedido

// async function enviarPedido() {
//   const sendData = await axios
//     .post(`${baseURL}/criarPedido`, {
//       qtd: 2,
//       data_pedido: "2023-03-12",
//       valor_total: 2199.99,
//       id_usuario: 1,
//       id_produto: 1,
//       id_cliente: 1,
//       statusPedidos: 1,
//     })
//     .then((response) => console.log(response.data));
// }

function init() {
  feedDatas();
}

init();

// Puxar os dados de chave estrangeira
