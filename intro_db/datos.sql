---------------------------------------------------------
-- 1. LIMPIEZA
---------------------------------------------------------
DROP TABLE IF EXISTS public.pets;
DROP TABLE IF EXISTS public.owners;

---------------------------------------------------------
-- 2. CREACIÓN DE TABLAS
---------------------------------------------------------

CREATE TABLE public.owners (
    owner_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE public.pets (
    pet_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    age INT,
    owner_id INT,
    CONSTRAINT fk_owner
      FOREIGN KEY(owner_id) 
      REFERENCES owners(owner_id)
      ON DELETE CASCADE
);

---------------------------------------------------------
-- 3. GENERACIÓN DE 500 DUEÑOS
---------------------------------------------------------
INSERT INTO public.owners (name, phone)
SELECT 
    (ARRAY['Andrés','Beatriz','Claudio','Daniela','Esteban','Fabiola','Gabriel','Helena'])[floor(random()*8)+1] || ' ' || 
    (ARRAY['Zúñiga','Valencia','Tapia','Soto','Riquelme','Pizarro','Muñoz'])[floor(random()*7)+1],
    '+56 9 ' || floor(random() * 89999999 + 10000000)::text
FROM generate_series(1, 500);

---------------------------------------------------------
-- 4. GENERACIÓN DE 1500 MASCOTAS
---------------------------------------------------------
INSERT INTO public.pets (name, species, age, owner_id)
SELECT 
    (ARRAY['Apolo','Boby','Chispa','Duna','Enzo','Fluffy','Gala','Hulk'])[floor(random()*8)+1] || ' ' || i,
    (ARRAY['Perro','Gato','Hámster','Conejo','Tortuga'])[floor(random()*5)+1],
    floor(random() * 18 + 1)::int,
    -- Asignación aleatoria entre los IDs de dueños creados (1 a 500)
    floor(random() * 500 + 1)::int
FROM generate_series(1, 1500) i;

---------------------------------------------------------
-- 5. PRUEBA DE CONSISTENCIA (USANDO 'USING')
---------------------------------------------------------

SELECT o.owner_id, o.name AS owner_name, p.name AS pet_name
FROM public.owners o
JOIN public.pets p on o.owner_id = p.owner_id
LIMIT 5;

select count(owner_id) from owners; -- debería mostrar los 500 registros
select count(pet_id) from pets; -- debería mostrar los 1500 registros