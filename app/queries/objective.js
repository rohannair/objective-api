
export const formattedObjective = (query) => {
  return query
     .select('id', 'company_id', 'target_ends_at as ends_at', 'name', 'owner_id', 'user_id', 'created_at', 'updated_at')
}
