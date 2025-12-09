-- ============================
-- CATEGORIES
-- ============================

INSERT INTO category (id, name, description) VALUES
(1, 'Sci-fi', 'Science fiction movies'),
(2, 'Drama', 'Dramatic and emotional stories'),
(3, 'Thriller', 'Thrilling, suspenseful movies'),
(4, 'Fantasy', 'Fantasy and magical worlds'),
(5, 'Action', 'Action-packed adventures'),
(6, 'Crime', 'Crime and mafia related films'),
(7, 'Adventure', 'Epic journeys and quests'),
(8, 'Animation', 'Animated features');

-- ============================
-- MOVIES
-- ============================

INSERT INTO movie (title, director, release_year, genre, rating, description, poster_url, category_id) VALUES
('Inception', 'Christopher Nolan', 2010, 'Sci-fi', 8.8, 'A thief who steals corporate secrets through dream-sharing technology must plant an idea into the mind of a CEO.', 'https://m.media-amazon.com/images/I/51nbVEuw1HL._AC_.jpg', 1),
('Interstellar', 'Christopher Nolan', 2014, 'Sci-fi', 8.7, 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity''s survival.', 'https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1024_.jpg', 1),
('The Matrix', 'The Wachowskis', 1999, 'Sci-fi', 8.7, 'A hacker discovers his world is a simulation and joins a rebellion against the machines.', 'https://m.media-amazon.com/images/I/51vpnbwFHrL._AC_.jpg', 1),
('The Shawshank Redemption', 'Frank Darabont', 1994, 9.3, 'Drama', 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.', 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg', 2),
('The Godfather Part II', 'Francis Ford Coppola', 1974, 'Crime', 9.0, 'The early life of Vito Corleone is portrayed while Michael expands the family crime syndicate.', 'https://m.media-amazon.com/images/I/91Nf-gFJgTL._AC_SL1500_.jpg', 6),
('Joker', 'Todd Phillips', 2019, 'Drama', 8.4, 'A mentally troubled comedian descends into madness, sparking a violent revolution in Gotham.', 'https://m.media-amazon.com/images/I/71oYkT0T2HL._AC_SL1500_.jpg', 2),
('The Dark Knight', 'Christopher Nolan', 2008, 'Action', 9.0, 'Batman faces the Joker, a criminal mastermind who wreaks chaos on Gotham City.', 'https://m.media-amazon.com/images/I/51EbJjlY8FL._AC_.jpg', 5),
('Gladiator', 'Ridley Scott', 2000, 'Action', 8.5, 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.', 'https://m.media-amazon.com/images/I/71z1xU1YlLL._AC_SL1024_.jpg', 5),
('The Lord of the Rings: The Two Towers', 'Peter Jackson', 2002, 'Fantasy', 8.8, 'The fellowship is broken, but the quest to destroy the One Ring continues.', 'https://m.media-amazon.com/images/I/81tEgsXP+XL._AC_SL1500_.jpg', 4),
('Avatar', 'James Cameron', 2009, 'Sci-fi', 7.9, 'A paraplegic Marine is sent to Pandora on a mission but becomes torn between following orders and protecting the Na''vi.', 'https://m.media-amazon.com/images/I/81t6f4dp2ML._AC_SL1500_.jpg', 1),
('The Revenant', 'Alejandro G. Iñárritu', 2015, 'Adventure', 8.0, 'A frontiersman fights for survival after being left for dead by his hunting team.', 'https://m.media-amazon.com/images/I/71y7A1DEe6L._AC_SL1200_.jpg', 7),
('Spider-Man: Into the Spider-Verse', 'Peter Ramsey', 2018, 'Animation', 8.4, 'Teenager Miles Morales becomes the Spider-Man of his universe and meets others from parallel dimensions.', 'https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_SL1500_.jpg', 8),
('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime', 8.9, 'Lives intertwine in a series of violent, darkly comedic events in Los Angeles.', 'https://m.media-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg', 6),
('Fight Club', 'David Fincher', 1999, 'Drama', 8.8, 'An insomniac office worker forms an underground fight club that spirals out of control.', 'https://m.media-amazon.com/images/I/81D+KJkOeGL._AC_SL1500_.jpg', 2),
('Forrest Gump', 'Robert Zemeckis', 1994, 'Drama', 8.8, 'A man with a low IQ unexpectedly influences major historical events.', 'https://m.media-amazon.com/images/I/61+3ouz1uQL._AC_SL1100_.jpg', 2),
('The Lion King', 'Roger Allers', 1994, 'Animation', 8.5, 'A young lion prince flees after tragedy but must embrace his destiny.', 'https://m.media-amazon.com/images/I/81lZJdJ+5HL._AC_SL1500_.jpg', 8),
('The Prestige', 'Christopher Nolan', 2006, 'Thriller', 8.5, 'Two rival magicians engage in a battle of wits, obsession, and sacrifice.', 'https://m.media-amazon.com/images/I/71U+4CL8iEL._AC_SL1178_.jpg', 3),
('Shutter Island', 'Martin Scorsese', 2010, 'Thriller', 8.2, 'Two U.S. marshals investigate a psychiatric facility, uncovering dark secrets.', 'https://m.media-amazon.com/images/I/81nA8iTfSbL._AC_SL1500_.jpg', 3),
('The Hobbit: An Unexpected Journey', 'Peter Jackson', 2012, 'Fantasy', 7.8, 'Bilbo Baggins joins a group of dwarves on a quest to reclaim their homeland.', 'https://m.media-amazon.com/images/I/91C64xCwVPL._AC_SL1500_.jpg', 4);
