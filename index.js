// Definição de constantes para o limite máximo de itens e caracteres
const localStorageKey = "to-do-list-gn";
const maxItems = 12;
const maxChars = 15;

// Função para validar se uma nova tarefa já existe na lista
function validateIfExistsNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById("input-new-task").value;
  let exists = values.find((x) => x.name === inputValue);
  return exists;
}

// Função para adicionar uma nova tarefa à lista
function newTask() {
  let input = document.getElementById("input-new-task");
  input.style.border = "";

  // Verificar se o campo está vazio
  if (!input.value) {
    input.style.border = "1px solid red";
    alert("Digite algo para inserir em sua lista");
    // Verificar se o texto inserido excede o limite de caracteres
  } else if (input.value.length > maxChars) {
    alert("O texto inserido excede o limite de 15 caracteres");
    // Verificar se a tarefa já existe na lista
  } else if (validateIfExistsNewTask()) {
    alert("Já existe uma tarefa com essa descrição");
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    // Verificar se o limite máximo de itens foi atingido
    if (values.length >= maxItems) {
      alert("Você atingiu o limite máximo de itens na lista (12 itens).");
      return;
    }
    // Adicionar a nova tarefa ao array de valores
    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    // Exibir a lista atualizada na página
    showValues();
  }
  input.value = "";
}

// Evento para limitar o número de caracteres no campo de entrada
const inputNewTask = document.getElementById("input-new-task");
inputNewTask.addEventListener("input", function () {
  if (this.value.length > maxChars) {
    this.value = this.value.slice(0, maxChars);
  }
});

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById("to-do-list");
  list.innerHTML = "";
  for (let i = 0; i < values.length; i++) {
    // Adicionar cada tarefa como um item de lista (<li>) à página
    list.innerHTML += `<li>${values[i]["name"]}<button id='btn-ok' onclick='removeItem("${values[i]["name"]}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`;
  }
}

// Função para remover uma tarefa da lista
function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}
// Exibir a lista de tarefas ao carregar a página
showValues();
