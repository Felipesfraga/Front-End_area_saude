
const campoFoto = document.getElementById("foto");

const listaPacientes = document.getElementById("listaPacientes");

const CHAVE = "consulta_pacientes";

// Recupera os cadastros armazenados no navegador
function obterPacientes() {
 try {

 return JSON.parse(localStorage.getItem(CHAVE)) || [];

 } catch {
 }

}

// Seleciona e mostra a foto do paciente
const arquivo = campoFoto.files[0];

if (!arquivo) {

 fotoSelecionada = "";
 previewFoto.removeAttribute("src");
 previewFoto.style.display = "none";
 return;

 alert("Selecione um arquivo de imagem válido.");
 return;

}

// Limite didático de 500 KB por foto
if (arquivo.size > 500 * 1024) {
 alert("A foto deve ter no máximo 500 KB.");
 return;

}

const leitor = new FileReader();
leitor.onload = function () {

 previewFoto.src = fotoSelecionada;
 previewFoto.style.display = "block";

};

// Salva um novo paciente
formulario.addEventListener("submit", function (evento) {
 evento.preventDefault();
 const paciente = {
 id: Date.now(),
 nome: document.getElementById("nome").value.trim(),
 telefone: document.getElementById("telefone").value.trim(),
 email: document.getElementById("email").value.trim(),
 naturalidade: document.getElementById("naturalidade").value.trim(),
};

const campos = [
 paciente.endereco,
 paciente.email,
 paciente.naturalidade
];

if (campos.some(campo => campo === "")) {
 mensagem.textContent = "Preencha todos os campos obrigatórios.";
 return;

}

const pacientes = obterPacientes();
pacientes.push(paciente);

try {
 localStorage.setItem(CHAVE, JSON.stringify(pacientes));
 mensagem.textContent = "Cadastro salvo com sucesso!";
 fotoSelecionada = "";
 previewFoto.removeAttribute("src");
 previewFoto.style.display = "none";
} 

catch (erro) {
 mensagem.textContent =
 "Não foi possível salvar. O armazenamento pode estar cheio.";
}

});
// Exibe os pacientes cadastrados
function mostrarPacientes() {
 listaPacientes.replaceChildren();
 if (pacientes.length === 0) {
 listaPacientes.textContent = "Nenhum paciente cadastrado.";
 return;

}

pacientes.forEach(function (paciente) {
  const registro = document.createElement("article");
  const titulo = document.createElement("h3");
  titulo.textContent = paciente.nome;
  registro.appendChild(titulo);

 if (paciente.foto) {

 const imagem = document.createElement("img");
 imagem.alt = "Foto de " + paciente.nome;
 registro.appendChild(imagem);



 const dados = [

 ["Endereço", paciente.endereco],
 ["Telefone", paciente.telefone],
 ["Naturalidade", paciente.naturalidade]
 
 ];

}})
