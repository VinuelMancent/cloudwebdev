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

CREATE TABLE configurator_traverse (
    id INT PRIMARY KEY,
    config JSON
);

CREATE TABLE configurator_hyperion (
    id INT PRIMARY KEY,
    config JSON
);

-- Füge die Zimmerdaten ein
INSERT INTO merchItems (id, name, price, image)
VALUES
    (0, 'Merch Tasse', 9.99, 'http://localhost:9000/hhz/Merch_Tasse.png'),
    (1, 'Merch Cap', 7.99, 'http://localhost:9000/hhz/Merch_Cap.png'),
    (2, 'Merch Pullover', 27.99, 'http://localhost:9000/hhz/Merch_Pullover.png'),
    (3, 'Merch TShirt Weiss', 12.99, 'http://localhost:9000/hhz/Merch_TShirt_Weiss.png');

INSERT INTO testdrive_cars (id, car)
VALUES
    (0, "Hyperion Halo"),
    (1, "Traverse");

INSERT INTO testdrive_tracks (id, track)
VALUES
    (0, "Nuerburgring"),
    (1, "Hockenheimring"),
    (2, "Lausitzring"),
    (3, "Sachsenring");

INSERT INTO configurator_traverse (id, config)
VALUES
    (0, '{"colors":[
        {"value":"Black Panther",
        "color": "linear-gradient(90deg, #4b4a4a 19%, #000000 50%)",
        "image":"http://localhost:9000/hhz/Traverse/black_panther.jpg"},
        {"value":"Cryistal White",
        "color": "linear-gradient(90deg, #e3f0ff 19%, #ffffff 50%)",
        "image":"http://localhost:9000/hhz/Traverse/crystal_white.jpg"},
        {"value":"Orange Juice",
        "color": "linear-gradient(90deg, #faa95e 19%, #ff7b00 50%)",
        "image":"http://localhost:9000/hhz/Traverse/orange_juice.jpg"}],
    "tires":[
        {"value":"Sommerreifen","image":"http://localhost:9000/hhz/standard_wheel.jpeg"},
        {"value":"Winterreifen","image":"http://localhost:9000/hhz/standard_wheel.jpeg"},
        {"value":"Sportreifen","image":"http://localhost:9000/hhz/sport_wheel.jpeg"}],
    "rims":[
        {"value":"Street Style",
        "image":"http://localhost:9000/hhz/street_style_rim.png"},
        {"value":"Urban Chic",
        "image":"http://localhost:9000/hhz/luxury-rim.png"},
        {"value":"Luxury Elite",
        "image":"http://localhost:9000/hhz/exclusive-rim.png"}]}');