
export const addCollaborator = async (db, user, objective) => {
  db('objectives_users')
    .insert({
      objective_id: objective,
      user_id: user
    }).returning('*')
}
