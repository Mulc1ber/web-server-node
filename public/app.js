document.addEventListener("click", ({ target }) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest("li").remove();
    });
  } else if (target.dataset.type === "edit") {
    const id = target.dataset.id;
    const title = prompt("Enter new title");
    if (title !== null) {
      edit(id, title).then(() => {
        target.closest("li").querySelector("span").textContent = title;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ id, title }),
  });
}
