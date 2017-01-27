UPDATE objectives
SET target_ends_at = o.epoch_unix
FROM (SELECT id AS objective_id
	, CAST(EXTRACT(EPOCH FROM ends_at) * 1000 AS BIGINT) AS epoch_unix
	  FROM objectives) AS o
WHERE id = o.objective_id
