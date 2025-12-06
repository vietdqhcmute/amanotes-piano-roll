class Track < ApplicationRecord
  belongs_to :song
  belongs_to :instrument
  has_many :notes, dependent: :destroy

  validates :song_id, presence: true
  validates :instrument_id, presence: true
end
