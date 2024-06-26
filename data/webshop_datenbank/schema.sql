-- Erstelle die Tabelle "rooms"
CREATE TABLE merchItems (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE testdrive_cars (
    id INT PRIMARY KEY,
    car VARCHAR(255) NOT NULL
);

CREATE TABLE testdrive_tracks (
    id INT PRIMARY KEY,
    track VARCHAR(255) NOT NULL
);

-- Füge die Zimmerdaten ein
INSERT INTO merchItems (id, name, price, image)
VALUES
    (0, 'Merch Tasse', 9.99, 'http://localhost/Merch_Tasse.png'),
    (1, 'Merch Cap', 7.99, 'http://localhost/Merch_Cap.png'),
    (2, 'Merch Pullover', 27.99, 'http://localhost/Merch_Pullover.png'),
    (3, 'Merch TShirt Weiss', 12.99, 'http://localhost/Merch_TShirt_Weiss.png');

INSERT INTO testdrive_cars (id, car)
VALUES
    (0, ""),
    (1, ""),
    (2, "");

INSERT INTO testdrive_tracks (id, track)
VALUES
    (0, ""),
    (1, ""),
    (2, "");