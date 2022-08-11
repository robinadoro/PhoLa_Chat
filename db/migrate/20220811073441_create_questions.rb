class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :topic
      t.text :question

      t.timestamps
    end
  end
end
