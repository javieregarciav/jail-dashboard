SELECT
  `b`.`id_block` AS `id_block`,
  `b`.`name` AS `block_name`,
  `b`.`alias` AS `block_alias`,
  `b`.`block_capacity` AS `block_capacity`,
  `o`.`name` AS `officer_name`,
  `i`.`id_inmate` AS `id_inmate`,
  `i`.`name` AS `inmate_name`,
  `i`.`alias` AS `inmate_alias`,
  `i`.`sentence` AS `sentence`,
  `i`.`admission_date` AS `admission_date`,
  `i`.`release_date` AS `release_date`
FROM
  (
    (
      `prisionapp`.`blocks` `b`
      JOIN `prisionapp`.`officers` `o` ON((`b`.`id_officer` = `o`.`id_officer`))
    )
    JOIN `prisionapp`.`inmates` `i` ON((`b`.`id_block` = `i`.`id_block`))
  )
WHERE
  (`b`.`id_block` = 4)
ORDER BY
  `i`.`id_inmate`