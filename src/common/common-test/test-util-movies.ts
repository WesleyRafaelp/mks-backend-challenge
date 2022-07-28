import { Movie } from "../../movies/entities/movie.entity";
import TestUtil from "./test-util-actor";
import TestUtilCategory from "./test-util-category";

export default class TestUtilMovie {
    static giveAMeAValidMovie(): Movie {
        const movie = new Movie();
        movie.id = 1;
        movie.name = 'filme';
        movie.synopsis = 'sinopse filme';
        movie.author = 'autor filme';
        movie.cast = [TestUtil.giveAMeAValidActor()];
        movie.categories = [TestUtilCategory.giveAMeAValidCategory()];
        return movie;
    }
}