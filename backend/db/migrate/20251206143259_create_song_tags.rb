class CreateSongTags < ActiveRecord::Migration[7.2]
  def change
    create_table :song_tags do |t|
      t.references :song, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
