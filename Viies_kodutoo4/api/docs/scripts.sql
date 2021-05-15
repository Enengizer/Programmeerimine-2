SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=0;   

CREATE TABLE IF NOT EXISTS `courses`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `courses`.`days` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nameofday` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `createdById` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_days_users1_idx` (`createdById` ASC),
  CONSTRAINT `fk_days_users1`
    FOREIGN KEY (`createdById`)
    REFERENCES `courses`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `courses`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nameofcourse` VARCHAR(255) NOT NULL,
  `public` TINYINT(1) NOT NULL DEFAULT 0,
  `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `createdById` INT NOT NULL,
  `dayId` INT NOT NULL,
  `roomId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_courses_users_idx` (`createdById` ASC),
  INDEX `fk_courses_days1_idx` (`dayId` ASC),
  CONSTRAINT `fk_courses_users`
    FOREIGN KEY (`createdById`)
    REFERENCES `courses`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_courses_days1`
    FOREIGN KEY (`dayId`)
    REFERENCES `courses`.`days` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_courses_rooms1`
    FOREIGN KEY (`roomId`)
    REFERENCES `courses`.`rooms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `courses`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `classroom` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `createdById` INT NOT NULL,
  `courseId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_rooms_users1_idx` (`createdById` ASC),
  INDEX `fk_rooms_courses1_idx` (`courseId` ASC),
  CONSTRAINT `fk_rooms_users1`
    FOREIGN KEY (`createdById`)
    REFERENCES `courses`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rooms_courses1`
    FOREIGN KEY (`courseId`)
    REFERENCES `courses`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

  SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;