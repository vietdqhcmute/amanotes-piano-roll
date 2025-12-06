class SongTag < ApplicationRecord
  belongs_to :song
  belongs_to :tag

  validates :song_id, uniqueness: { scope: :tag_id }
end
