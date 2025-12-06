class CreateNotes < ActiveRecord::Migration[7.2]
  def change
    create_table :notes do |t|
      t.references :track, null: false, foreign_key: true
      t.decimal :time
      t.string :description

      t.timestamps
    end
  end
end
