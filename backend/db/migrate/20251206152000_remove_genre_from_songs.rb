class RemoveGenreFromSongs < ActiveRecord::Migration[7.2]
  def change
    remove_column :songs, :genre, :string
  end
end
