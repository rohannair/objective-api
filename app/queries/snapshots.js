import db from '../db'

export const queryFormattedSnapshot = (query) => {
  return query
    .select('snapshots.id',
      'snapshots.name',
      'snapshots.body',
      'blocker',
      'completed',
      'snapshots.created_at',
      'img',
      'snapshots.company_id',
      'snapshots.objective_id',
      'snapshots.user_id',
      db.raw('CAST(snapshots.body_json as TEXT)')
    )
}

export const mutationFormattedSnapshot = (query) => {
  return query
    .returning(['snapshots.id',
      'snapshots.name',
      'snapshots.body',
      'blocker',
      'completed',
      'snapshots.created_at',
      'img',
      'snapshots.company_id',
      'snapshots.objective_id',
      'snapshots.user_id',
      db.raw('CAST(snapshots.body_json as TEXT)')]
    )
}