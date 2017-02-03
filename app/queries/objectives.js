import Objective from '../models/Objective'

export const viewableObjectivesWithQuery = (query, viewer) => {
  return query
    .with('viewable_objectives', (qb) => {
      viewableObjectives(viewer, qb.select('objectives.id').from('objectives'))
    })
    .leftJoin('viewable_objectives', 'objective_id', 'viewable_objectives.id')
    .distinct()
}

export const viewableObjectives = (viewer, qb = Objective.query()) => {
  return qb
    .leftJoin('objectives_users', 'objectives.id', 'objectives_users.objective_id')
    .orWhere('objectives.company_id', viewer.companyId)
    .orWhere('objectives.owner_id', viewer.id)
    .orWhere('objectives_users.user_id', viewer.id)
    .distinct()
}

export const formattedObjective = (query) => {
  return query
     .select('objectives.id',
      'company_id',
      'target_ends_at as ends_at',
      'name',
      'owner_id',
      'is_private',
      'objectives.user_id',
      'objectives.created_at',
      'objectives.updated_at'
    )
}
