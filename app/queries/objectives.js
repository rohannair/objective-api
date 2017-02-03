import Objective from '../models/Objective'

export const viewableObjectivesWithQuery = (query, viewer) => {
  return query
    .with('viewable_objectives', (qb) => {
      viewableObjectives(viewer, qb.select('objectives.id').from('objectives'))
    })
    .rightJoin('viewable_objectives', 'objective_id', 'viewable_objectives.id')
    .distinct()
}

export const viewableObjectives = (viewer, qb = Objective.query()) => {
  return qb
    .leftJoin('objectives_users', 'objectives.id', 'objectives_users.objective_id')
    // objectives owned by viewer
    .orWhere('objectives.owner_id', viewer.id)
    // private objectives that viewer is collaborator of
    .orWhere(q => q.andWhere('objectives_users.user_id', viewer.id)
      .andWhere('objectives.is_private', true)
      .andWhere('objectives.company_id', viewer.companyId)
    )
    // public company objectives
    .orWhere(q => q.andWhere('objectives.company_id', viewer.companyId)
      .andWhere('objectives.is_private', false)
    )
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
