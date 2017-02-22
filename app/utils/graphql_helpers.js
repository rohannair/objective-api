
export const formatSnapshot = snap => ({ ...snap, bodyJson: snap.bodyJson && JSON.stringify(snap.bodyJson) })
