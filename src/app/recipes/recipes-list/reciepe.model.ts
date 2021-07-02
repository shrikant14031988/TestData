import { Ingredient } from "src/app/shared/ingredients.model";

export class Recipe {
    public name: string;
    public description: string;
    public path: string;
    public ingrediant?: Ingredient[];
    /**
     *
     */
    constructor(name: string, descirption: string, path: string, ingredient?: Ingredient[]) {
        this.name = name;
        this.description = descirption;
        this.path = path;
        this.ingrediant = ingredient;
    }
}