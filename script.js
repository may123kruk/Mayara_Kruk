  document.addEventListener('DOMContentLoaded', function(){

    const textoTarefa = document.getElementById ('textoTarefa');
    const addTarefaBotao = document.getElementById ('addTarefaBotao');
    const listaTarefas = document.getElementById ('listaTarefas');
    const filtro = document.getElementById ('filtro');
  

    addTarefaBotao.addEventListener('click', addTarefa);
    listaTarefas.addEventListener('click', handleTarefaClick);
    filtro.addEventListener('change', filtroTarefa);
  
    function addTarefa(){
      const tarefaTexto = textoTarefa.value.trim();
  
      if(tarefaTexto !== ''){
        const itemTarefa = document.createElement('li');
        itemTarefa.classList.add('itemTarefa');
        itemTarefa.innerHTML = `
          <span>${tarefaTexto}</span>
          <button class="botaoCompleto">Concluir</button>
          <button class="botaoDeletar">Excluir</button>
          <button class="desmarcarCompleto">Desmarcar</button>`;
        listaTarefas.appendChild(itemTarefa);
        textoTarefa.value = '';
        filtroTarefa();
      }
    }
  
    function handleTarefaClick(event){
      const target = event.target;
      const itemTarefa = target.closest('.itemTarefa');
  
      if (target.classList.contains('botaoCompleto')){
        toggleTarefaCompleta(itemTarefa);
      } 

      else if (target.classList.contains('botaoDeletar')){
        deletarTarefa(itemTarefa);
      } 

      else if (target.classList.contains('desmarcarCompleto')){
        incompletoTarefa(itemTarefa);
      }
    }
  

    function toggleTarefaCompleta(itemTarefa) {
      itemTarefa.classList.toggle('completed');
      filtroTarefa();
    }
  
    
    function deletarTarefa(itemTarefa){
      itemTarefa.remove();
      filtroTarefa();
    }
  

    function incompletoTarefa(itemTarefa){
      itemTarefa.classList.remove('completed');
      filtroTarefa();
    }
  

    function filtroTarefa(){
      const selecionarfiltro = filtro.value;
      const itemTarefas = document.querySelectorAll('.itemTarefa');
  
      itemTarefas.forEach((itemTarefa) => {
        const isCompleto = itemTarefa.classList.contains('completed');
  
        switch (selecionarfiltro) {
          case 'pending':
            itemTarefa.style.display = isCompleto ? 'none': 'flex';
          break;

          case 'completed':
            itemTarefa.style.display = isCompleto ? 'flex': 'none';
          break;

          default:
            itemTarefa.style.display = 'flex';
        }


      });
    }
  });
  