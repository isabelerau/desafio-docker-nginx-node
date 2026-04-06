# Desafio Docker — Nginx + Node.js + MySQL

Projeto de estudo da formação Full Cycle que demonstra uma stack multi-container com Nginx como reverse proxy, Node.js como aplicação backend e MySQL como banco de dados.

## Arquitetura

```
Usuário → Nginx (localhost:8080) → App Node.js (:3000) → MySQL (:3306)
```

## Serviços

| Serviço | Imagem | Porta |
|---------|--------|-------|
| nginx   | nginx:1.15.0-alpine (customizada) | 8080 |
| app     | node:20 (customizada) | 3000 |
| db      | mysql:8.0 | 3306 |

## Como executar

```bash
docker compose up --build
```

Acesse em: [http://localhost:8080](http://localhost:8080)

## O que acontece ao subir

1. O MySQL sobe e fica disponível na porta 3306
2. O Node aguarda o MySQL estar pronto (via `dockerize`) antes de iniciar
3. O Node cria a tabela `people` (se não existir) e insere um registro
4. O Nginx recebe as requisições em `:8080` e repassa para o Node em `:3000`

## Estrutura

```
.
├── docker-compose.yaml
├── nginx/
│   ├── Dockerfile.prod   # imagem do Nginx com config customizada
│   └── nginx.conf        # configuração do reverse proxy
├── node/
│   ├── Dockerfile        # imagem do Node com dockerize instalado
│   ├── index.js          # servidor Express
│   └── package.json
└── mysql/                # volume de persistência do banco
```

## Conceitos demonstrados

- Orquestração multi-container com `docker-compose`
- Rede interna Docker (`isanet`) para comunicação entre serviços
- Reverse proxy com Nginx
- Espera por dependência com `dockerize`
- Persistência de dados com volumes
