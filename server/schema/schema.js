const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

// dummy data
const movies = [
    { 
        id: '1', 
        name: 'Bohemian Rhapsody',
        description: 'Freddie Mercury, Brian May, Roger Taylor e John Deacon formam a banda de rock Queen em 1970. Quando o estilo de vida agitado de Mercury começa a sair de controle, o grupo precisa encontrar uma forma de lidar com o sucesso e os excessos de seu líder.',
        imageURL: 'https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjom_G0tKnfAhWMjpAKHTwYDMoQjRx6BAgBEAU&url=http%3A%2F%2Ft1.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSe74BDy8hvD0ZRE4RDR0NupS1TfYNBER1Rrao3_xitpEkuEMAi&psig=AOvVaw1M4Y20M5olLSOqSjcRpQiH&ust=1545223542851221',
        year: 2018,
        directorId: '1'
    },
    {
        id: '2',
        name: 'Toy Story',
        description: 'Woody é um boneco cowboy de bom coração que pertence a um jovem chamado Andy. Porém vê sua posição como o brinquedo favorito de Andy comprometida quando seus pais lhe compram um outro brinquedo, o Buzz Lightyear, uma figura de ação. Ainda pior, Buzz é arrogante e acha que ele é um astronauta de verdade em uma missão para retornar ao seu planeta natal.',
        imageURL: 'https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwiQ0KmStanfAhVBHpAKHdftBtYQjRx6BAgBEAU&url=http%3A%2F%2Fwww.allposters.com.br%2F-sp%2FToy-Story-Woody-Buzz-posters_i13390941_.htm&psig=AOvVaw0xradQEbxrCeygwGA3BTzb&ust=1545223739628950',
        year: 1995,
        directorId: '2'
    },
    {
        id: '3',
        name: 'The Avengers',
        description: 'Loki, o irmão de Thor, ganha acesso ao poder ilimitado do cubo cósmico ao roubá-lo de dentro das instalações da S.H.I.E.L.D. Nick Fury, o diretor desta agência internacional que mantém a paz, logo reúne os únicos super-heróis que serão capazes de defender a Terra de ameaças sem precedentes',
        imageURL: 'https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwi90N--tanfAhXCH5AKHZJnC8YQjRx6BAgBEAU&url=http%3A%2F%2Ft1.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQmkXsIZ89RVeyZkI_v3cLLB4MFd-KlVNXub-M16petJKffpZiw&psig=AOvVaw2gfbDLP06kIhWzDD8LkYcu&ust=1545223831975964',
        year: 2012,
        directorId: '3'
    },
];

const directors = [
    {
        id: '1', name: 'Bryan Singer', age: 53
    },
    {
        id: '2', name: 'John Lasseter', age: 61
    },
    {
        id: '3', name: 'Joss Whedon', age: 54
    },
];

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        year: { type: GraphQLInt },
        director: {
            type: DirectorType,
            resolve (parent, args) {
                return _.find(directors, { id: parent.directorId });
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve (parent, args) {
                return _.filter(movies, { directorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args) {
                return _.find(movies, {id: args.id});
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve (parent, args) {
                return movies;
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args) {
                return _.find(directors, { id: args.id });
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve (parent, args) {
                return directors;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});