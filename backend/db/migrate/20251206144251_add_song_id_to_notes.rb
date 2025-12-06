class AddSongIdToNotes < ActiveRecord::Migration[7.2]
  def up
    # Add the column first (allowing nulls temporarily)
    add_reference :notes, :song, null: true, foreign_key: true

    # Update existing notes to have song_id based on their track's song
    execute <<-SQL
      UPDATE notes
      SET song_id = tracks.song_id
      FROM tracks
      WHERE notes.track_id = tracks.id
    SQL

    # Now make the column not nullable
    change_column_null :notes, :song_id, false
  end

  def down
    remove_reference :notes, :song, foreign_key: true
  end
end
