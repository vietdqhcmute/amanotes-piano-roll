class Note < ApplicationRecord
  belongs_to :song
  belongs_to :track

  validates :time, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :song_id, presence: true
  validates :track_id, uniqueness: {
    scope: [:song_id, :time],
    message: "already has a note at this time for this song"
  }

  validate :unique_time_per_track

  private

  def unique_time_per_track
    if Note.exists?(track_id: track_id, time: time)
      errors.add(:time, "already has a note at this time for the given track")
    end
  end
end
