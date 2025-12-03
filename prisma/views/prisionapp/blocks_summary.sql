SELECT
  `b`.`id_block` AS `id_block`,
  `b`.`name` AS `block_name`,
  `b`.`alias` AS `block_alias`,
  `o`.`name` AS `officer_name`,
  count(DISTINCT `c`.`id_cell`) AS `total_cells`,
  `b`.`block_capacity` AS `max_inmates_capacity`,
  coalesce(count(DISTINCT `i`.`id_inmate`), 0) AS `total_inmates`
FROM
  (
    (
      (
        `prisionapp`.`blocks` `b`
        LEFT JOIN `prisionapp`.`officers` `o` ON((`b`.`id_officer` = `o`.`id_officer`))
      )
      LEFT JOIN `prisionapp`.`cells` `c` ON((`b`.`id_block` = `c`.`id_block`))
    )
    LEFT JOIN `prisionapp`.`inmates` `i` ON((`b`.`id_block` = `i`.`id_block`))
  )
GROUP BY
  `b`.`id_block`,
  `b`.`name`,
  `b`.`alias`,
  `o`.`name`,
  `b`.`block_capacity`
ORDER BY
  `b`.`id_block`