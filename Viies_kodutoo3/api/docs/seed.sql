
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=0;  

INSERT INTO users(firstName, lastName, email, password, role) VALUES
  ('Martti', 'Raavel', 'mrt@mrt.ee', '$2b$10$Dv7y5133dUL.DTiogU1bXeODhoEpuE.AsiiCdUmvQJwKHU57YISyW', 'Admin'),
  ('Juku', 'Juurikas', 'juku@juurikas.ee', '$2b$10$AkiS2VBzORkDESiXYOc2L.dFgZBykCDAnb5R1F41wp0sSfcPmhl9C', 'User');
INSERT INTO days(nameofday, createdById) VALUES
  ('Esmaspäev', 1),
  ('Teisipäev', 1),
  ('Kolmapäev', 1),
  ('Neljapäev', 1),
  ('Reede', 1),
  ('Laupäev', 1),
  ('Pühapäev', 2);
INSERT INTO courses(nameofcourse, dayId, createdById, public, roomId) VALUES
  ('Riistvara', 5, 1, 0, 2),
  ('Programmerimine-2', 4, 1, 1, 1);
INSERT INTO rooms(classroom, courseId, createdById) VALUES
  ('ZOOM', 1, 1),
  ('208', 2, 1);
  
  
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;