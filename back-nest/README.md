## SQL ADD CEPS
```sql
INSERT INTO coverage_by_cep (cep, rua, bairro, cidade, estado) VALUES
('32010770', 'Praça da Sé', 'Sé', 'São Paulo', 'SP'), > Esta é o CEP que deve retornar true.

('01310010', 'Avenida Paulista', 'Bela Vista', 'São Paulo', 'SP'),
('01311001', 'Rua Augusta', 'Consolação', 'São Paulo', 'SP'),
('01311001', 'Rua Frei Caneca', 'Consolação', 'São Paulo', 'SP'),
('01311001', 'Rua da Consolação', 'Consolação', 'São Paulo', 'SP');
```

## SQL ADD CEPS
```sql
INSERT INTO internet_plan (nome, velocidade, data_expiracao, preco, descricao)
VALUES 
('Plano 1', 10, '2023-04-30', 50, 'Plano com velocidade de 10mb/s'),
('Plano 2', 20, '2023-04-30', 80, 'Plano com velocidade de 20mb/s'),
('Plano 3', 50, '2023-04-30', 150, 'Plano com velocidade de 50mb/s'),
('Plano 4', 100, '2023-04-30', 250, 'Plano com velocidade de 100mb/s'),
('Plano 5', 200, '2023-04-30', 400, 'Plano com velocidade de 200mb/s');
```
## SQL ADD USERS
```sql
INSERT INTO user (nome, cpf, rg, data_nascimento, telefone, email, endereco, bairro, numero)
VALUES 
('João', '12345678901', '123456789', '1990-01-01', '11999999999', 'joao@gmail.com', 'Rua A', 'Bairro X', '123'),
('Maria', '98765432101', '987654321', '1995-05-05', '11888888888', 'maria@gmail.com', 'Rua B', 'Bairro Y', '456'),
('Pedro', '11122233344', '111222334', '1985-12-31', '11777777777', 'pedro@gmail.com', 'Rua C', 'Bairro Z', '789'),
('Lucas', '55566677788', '555666778', '2000-06-15', '11666666666', 'lucas@gmail.com', 'Rua D', 'Bairro W', '1011'),
('Ana', '99988877766', '999888776', '1980-03-20', '11555555555', 'ana@gmail.com', 'Rua E', 'Bairro V', '1213');
```