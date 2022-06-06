let users = [];


export async function create(user) {
  const created = { ...user, id: Date.now().toString()};
  users.push(created);
  console.log(users);
  return created.id;
}

export async function findByUsername(username) {
  return users.find(user => user.username === username);
}