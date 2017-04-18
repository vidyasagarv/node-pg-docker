CREATE TABLE votes (
  id integer PRIMARY KEY,
  option_name varchar(20),
  number_of_votes integer
);

INSERT INTO votes (id, option_name, number_of_votes) VALUES (1, 'altfacts', 5);
INSERT INTO votes (id, option_name, number_of_votes) VALUES (2, 'facts', 10);