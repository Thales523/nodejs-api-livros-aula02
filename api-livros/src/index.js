const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const livros = require("./livros.json");

app.get('/livros', (request, response) => {

    const { titulo } = request.query;

    const resultado = titulo
        ? livros.filter(livro => livro.titulo.includes(titulo) )
        : livros

    return response.json(resultado);
});

app.post('/livros', (request, response) => {

    const { titulo, descricao, autor, anoPublicacao } = request.body;

    const livro = { id: uuid(), titulo, descricao, autor, anoPublicacao};
    
    livros.push(livro)

    return response.json( livro );
});

app.put('/livros/', (request, response) => {

    const { id, titulo, descricao, autor, anoPublicacao } = request.body;

    const indiceLivro = livros.findIndex( livro => livro.id === id );

    if( indicelivro < 0 ) {
        return response.status(400).json({ error: 'Livro não encontrado'});
    }

    const livro = {
        id,
        titulo,
        descricao,
        autor,
        anoPublicacao
    }

    livros[indiceLivro] = livro;

    return response.json(livro);
});

app.delete('/livros/:id', (request, response) => {

    const { id } = request.params;

    const indiceLivro = livros.findIndex( livro => livro.id === Number(id) );

    if( indicelivro < 0 ) {
        return response.status(400).json({ error: 'Livro não encontrado'});
    }


    livros.splice(indiceLivro, 1);

    return response.status(204).send();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))