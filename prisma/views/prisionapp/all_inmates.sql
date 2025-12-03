SELECT
  `prisionapp`.`inmates`.`id_inmate` AS `id_inmate`,
  `prisionapp`.`inmates`.`name` AS `name`,
  `prisionapp`.`inmates`.`alias` AS `alias`,
  `prisionapp`.`inmates`.`sentence` AS `sentence`,
  `prisionapp`.`inmates`.`admission_date` AS `admission_date`,
  `prisionapp`.`inmates`.`release_date` AS `release_date`,
  `prisionapp`.`inmates`.`id_cell` AS `id_cell`,
  `prisionapp`.`inmates`.`id_crime` AS `id_crime`,
  `prisionapp`.`inmates`.`id_block` AS `id_block`
FROM
  `prisionapp`.`inmates`