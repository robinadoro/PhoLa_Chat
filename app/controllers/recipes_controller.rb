class RecipesController < ApplicationController
    def index
        render json: Recipe.all, include: [:user]
    end

    def create 
        recipe = @current_user.recipes.create!(recipe_params)
        render json: recipe, include: [:user], status: :created
    end

    def update
        recipe = Recipe.find_by(id: params[:id])
        if recipe
            recipe.update!(recipe_params)
            render json: recipe, include: [:user], status: :created
        else
            render json: { error: "Recipe not found" }, status: :not_found
        end
    end

    def show 
        recipe = @current_user.recipes.find_by!(id: params[:id])
        render json: recipe, include: [:user]
    end

    private
    def recipe_params
        params.permit(:title, :instructions, :minutes_to_complete)
    end
end
