class QuestionsController < ApplicationController
    def index
        render json: Question.all, include: [:user]
    end

    def create 
        question = @current_user.questions.create!(question_params)
        render json: question, include: [:user], status: :created
    end

    def update
        question = Question.find_by(id: params[:id])
        if question
            question.update!(question_params)
            render json: question, include: [:user, :answers], status: :created
        else
            render json: { error: "Question not found" }, status: :not_found
        end
    end

    def show 
        question = @current_user.questions.find_by!(id: params[:id])
        render json: question, include: [:user]
    end

    private
    def question_params
        params.permit(:topic, :question)
    end
end
