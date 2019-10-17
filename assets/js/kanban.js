const container = document.getElementById('container');
const boardName = ['ToDo', 'Doing', 'Done', 'Approved'];
let boardList;
const undo = [];
const undoButton = document.getElementById('undo');

function Board(id) {
  this.id = id;
  this.name = boardName[id];
  this.todos = [];

  const div = document.createElement('div');
  div.className = this.name;
  container.appendChild(div);

  div.innerHTML = `
    <header>
      ${this.name}
    </header>
    <div class="messages"></div>
    <footer class="actions">
    <textarea class="textArea"></textarea>
    <button class="submitButton">Submit</button>
    </footer>
  `;

  div.querySelector('.submitButton').onclick = () => {
    if (div.querySelector('.textArea') === '') return;
    this.todos.push(div.querySelector('.textArea').value);
    div.querySelector('.textArea').value = '';
    this.renderTodos();
    undo.push(() => {
      this.todos.splice(-1, 1);
      this.renderTodos();
    });
    undoButton.removeAttribute('disabled');
  };

  this.takeAction = (action, todo, index) => {
    if (
      action !== 'undoLeft' ||
      action !== 'undoRight' ||
      action !== 'undoRemove'
    ) {
      this.todos.splice(index, 1);
      this.renderTodos();
    } else if (action === 'undoLeft') {
      boardList[this.id + 1].todos.pop();
      boardList[this.id + 1].renderTodos();
      this.todos.splice(index, 0, todo);
      this.renderTodos();
    } else if (action === 'moveRight') {
      boardList[this.id - 1].todos.pop();
      boardList[this.id - 1].renderTodos();
      this.todos.splice(index, 0, todo);
      this.renderTodos();
    }
    if (action === 'moveLeft') {
      boardList[this.id - 1].todos.push(todo);
      boardList[this.id - 1].renderTodos();
    } else if (action === 'moveRight') {
      boardList[this.id + 1].todos.push(todo);
      boardList[this.id + 1].renderTodos();
    } else if (action === 'undoRemove') {
      this.todos.splice(index, 0, todo);
      this.renderTodos();
    }
  };

  this.renderTodos = () => {
    const messages = div.querySelector('.messages');
    messages.innerHTML = '';

    this.todos.forEach((todo, index) => {
      const todoDiv = document.createElement('div');
      todoDiv.innerHTML = `
        <button class="moveButton left ${
          this.id === 0 ? 'hiddenButton' : ''
        }"><</button>
        <article>${todo}</article>
        <button class="moveButton right ${
          this.id === 3 ? 'hiddenButton' : ''
        }">></button>
      `;
      messages.appendChild(todoDiv);

      todoDiv.querySelector('.left').onclick = () => {
        if (this.id === 0) return;
        this.takeAction('moveLeft', todo, index);
        undo.push(() => {
          this.takeAction('undoLeft', todo, index);
        });
        undoButton.removeAttribute('disabled');
      };
      todoDiv.querySelector('.right').onclick = () => {
        if (this.id === 3) return;
        this.takeAction('moveRight', todo, index);
        undo.push(() => {
          this.takeAction('undoRight', todo, index);
        });
        undoButton.removeAttribute('disabled');
      };

      todoDiv.querySelector('article').onclick = () => {
        if (confirm('Are you sure you want to delete this item')) {
          this.takeAction('remove', todo, index);
          undo.push(() => {
            this.takeAction('undoRemove', todo, index);
          });
          undoButton.removeAttribute('disabled');
        }
      };
    });
  };
}

boardList = [0, 1, 2, 3].map(item => new Board(item));

undoButton.onclick = () => {
  if (undo.length === 1) undoButton.setAttribute('disabled', '');
  undo.pop()();
};

window.onbeforeunload = () => {
  const kanban = boardList.map(e => e.todos);
  localStorage.setItem('kanban', JSON.stringify(kanban));
};

window.onload = () => {
  const kanbanString = localStorage.getItem('kanban');
  if (!kanbanString) return;
  const kanban = JSON.parse(kanbanString);
  kanban.forEach((todos, index) => {
    boardList[index].todos = todos;
    boardList[index].renderTodos();
  });
};
