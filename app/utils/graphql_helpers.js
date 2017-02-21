
export const formatSnapshotsQuery = data => data.map(snap => ({ ...snap, bodyJson: snap.bodyJson && JSON.stringify(snap.bodyJson) }))

export const formatSnapshotMutation = snap => ({ ...snap, bodyJson: snap.bodyJson && JSON.stringify(snap.bodyJson) })
