
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
      'snapshots.body_json'
    )
    .then(data => {
      const snapsArray = [ ...data ]
      snapsArray.forEach((snap) => {
        if(snap.bodyJson) { snap.bodyJson = JSON.stringify(snap.bodyJson) }
      })
      return snapsArray
    })
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
      'snapshots.body_json'
    ])
    .then(data => {
      const snap = Object.keys(data).reduce((acc, val) => {
        if (val === 'bodyJson') {
          const newVal = JSON.stringify(data[val])
          acc[val] = newVal
        } else {
          acc[val] = data[val]
        }
        return acc
      }, {})
      return snap
    })
}
