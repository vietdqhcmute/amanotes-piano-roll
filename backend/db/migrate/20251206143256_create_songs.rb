class CreateSongs < ActiveRecord::Migration[7.2]
  def change
    create_table :songs do |t|
      t.string :name
      t.string :description
      t.integer :duration
      t.integer :bpm
      t.string :genre

      t.timestamps
    end
  end
end
