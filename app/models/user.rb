class User < ApplicationRecord
    has_many :questions
    has_secure_password
    validates :username, presence: true, uniqueness: true
end
