UPDATE objectives
SET target_ends_at = tbl.epoch_unix
FROM (SELECT id as objective_id, CAST(EXTRACT(EPOCH FROM ends_at) * 1000 as bigint) AS epoch_unix
	FROM objectives) AS tbl
WHERE id = tbl.objective_id
