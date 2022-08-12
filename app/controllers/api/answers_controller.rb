class Api::AnswersController < ApplicationController
    def create 
        answer = Answer.create!(answer_params)
        render json: answer, status: :created
    end

    private
    def answer_params
        params.permit(:answer, :question_id)
    end
end
