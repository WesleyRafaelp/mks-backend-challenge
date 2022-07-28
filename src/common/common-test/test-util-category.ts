import { Category } from "../../category/entities/category.entity";
import TestUtilMovie from "./test-util-movies";

export default class TestUtilCategory {
    static giveAMeAValidCategory(): Category {
        const category = new Category();
        category.id = 1;
        category.name = 'drama';
        return category;
    }
}