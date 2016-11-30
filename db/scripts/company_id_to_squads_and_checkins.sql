UPDATE objectives
SET company_id = s.company_id
FROM (SELECT id, company_id
      FROM squads) AS s
WHERE squad_id = s.id;

UPDATE check_ins
SET company_id = u.company_id
FROM (SELECT id, company_id
      FROM users) AS u
WHERE user_id = u.id;
