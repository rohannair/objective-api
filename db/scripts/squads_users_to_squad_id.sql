UPDATE users
SET squad_id = sq.squad_id
FROM (SELECT squad_id, user_id
      FROM squads_users) AS sq
WHERE id = sq.user_id;
