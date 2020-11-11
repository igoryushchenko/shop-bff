insert into product (title, description, img, price) values
('Nintendo Switch', 'Fully-featured for home and on-the-go gaming.', 'https://images-na.ssl-images-amazon.com/images/I/61JnrafZ7zL._AC_SL1457_.jpg', 54000),
('PlayStation 4 (PS4)', 'The PlayStation 4 (PS4) is a home video game console developed by Sony Computer Entertainment', 'https://image.coolblue.be/max/500x500/products/567947', 79900),
('Xbox One', 'The Xbox One is a home video game console developed by Microsoft. Announced in May 2013', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Microsoft-Xbox-One-Console-Set-wKinect.jpg/1200px-Microsoft-Xbox-One-Console-Set-wKinect.jpg', 89000),
('Death Stranding', 'Death Stranding is an action game developed by Kojima Productions.', 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Death_Stranding.jpg/220px-Death_Stranding.jpg', 5900),
('Cyberpunk 2077', 'Cyberpunk 2077 is an upcoming action role-playing video game developed and published by CD Projekt Red', 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg', 3900),
('Call of Duty: Modern Warfare', 'Call of Duty: Modern Warfare is a 2019 first-person shooter video game developed by Infinity Ward and published by Activision.', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/CallofDutyModernWarfare%282019%29.jpg/220px-CallofDutyModernWarfare%282019%29.jpg', 2599),
('Ghost of Tsushima', 'Ghost of Tsushima is an action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Ghost_of_Tsushima.jpg/220px-Ghost_of_Tsushima.jpg', 3599),
('Tom Clancy''s Ghost Recon Breakpoint', 'Tom Clancy''s Ghost Recon Breakpoint is an online tactical shooter video game developed by Ubisoft Paris and published by Ubisoft. The game was released worldwide on 4 October 2019 for Microsoft Windows, PlayStation 4 and Xbox One, and on 18 December 2019 for Stadia.', 'https://www.xyz.co.za/ProdImg/Big_3307216136569-01.jpg', 1999);

insert into stock (count, product_id) values
 (4,(SELECT id from product WHERE title='Nintendo Switch')),
 (6,(SELECT id from product WHERE title='PlayStation 4 (PS4)')),
 (7,(SELECT id from product WHERE title='Xbox One')),
 (12,(SELECT id from product WHERE title='Death Stranding')),
 (7,(SELECT id from product WHERE title='Cyberpunk 2077')),
 (8,(SELECT id from product WHERE title='Call of Duty: Modern Warfare')),
 (2,(SELECT id from product WHERE title='Ghost of Tsushima')),
 (55,(SELECT id from product WHERE title='Tom Clancy''s Ghost Recon Breakpoint'));
