class Question < ApplicationRecord
    belongs_to :user
    has_many :answers
    validates :topic, presence: true
    validates :question, length: { minimum: 10 }
end
