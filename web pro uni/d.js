let comments = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(data => {
      comments = data;
      renderTable();
    });

  document.getElementById('a').addEventListener('click', () => {
    showForm();
  });

  document.getElementById('t').addEventListener('click', () => {
    hideForm();
  });

  document.getElementById('n').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('commentId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const body = document.getElementById('body').value;

    if (id) {
      const index = comments.findIndex(c => c.id == id);
      comments[index] = { ...comments[index], name, email, body };
    } else {
      const newComment = {
        id: comments.length ? comments[comments.length - 1].id + 1 : 1,
        name,
        email,
        body
      };
      comments.push(newComment);
    }

    renderTable();
    hideForm();
  });
});

function renderTable() {
  const tbody = document.getElementById('commentsTableBody');
  tbody.innerHTML = '';

  comments.forEach(comment => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${comment.id}</td>
      <td>${comment.name}</td>
      <td>${comment.email}</td>
      <td>${comment.body}</td>
      <td>
        <button class="update-btn" onclick="editComment(${comment.id})">Edit</button>
        <button class="delete-btn" onclick="deleteComment(${comment.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editComment(id) {
  const comment = comments.find(c => c.id == id);
  document.getElementById('k').textContent = 'Edit Comment';
  document.getElementById('commentId').value = comment.id;
  document.getElementById('name').value = comment.name;
  document.getElementById('email').value = comment.email;
  document.getElementById('body').value = comment.body;
  document.getElementById('p').classList.remove('hidden');
}

function deleteComment(id) {
  comments = comments.filter(c => c.id != id);
  renderTable();
}

function showForm() {
  document.getElementById('p').classList.remove('hidden');
  document.getElementById('k').textContent = 'Add Comment';
  document.getElementById('n').reset();
  document.getElementById('commentId').value = '';
}

function hideForm() {
  document.getElementById('p').classList.add('hidden');
}
function editComment(id) {
  const comment = comments.find(c => c.id == id);

  document.getElementById('editCommentId').value = comment.id;
  document.getElementById('editName').value = comment.name;
  document.getElementById('editEmail').value = comment.email;
  document.getElementById('editBody').value = comment.body;

  document.querySelector('table').classList.add('hidden');
  document.getElementById('a').classList.add('hidden');
  document.getElementById('editPage').classList.remove('hidden');
}
document.getElementById('editForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editCommentId').value);
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const body = document.getElementById('editBody').value;

  const index = comments.findIndex(c => c.id == id);
  if (index !== -1) {
    comments[index] = { ...comments[index], name, email, body };
  }

  renderTable();
  document.getElementById('editPage').classList.add('hidden');
  document.querySelector('table').classList.remove('hidden');
  document.getElementById('a').classList.remove('hidden');
});
document.getElementById('editCancelBtn').addEventListener('click', () => {
  document.getElementById('editPage').classList.add('hidden');
  document.querySelector('table').classList.remove('hidden');
  document.getElementById('a').classList.remove('hidden');
});

