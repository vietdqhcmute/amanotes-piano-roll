class Song < ApplicationRecord
  has_many :tracks, dependent: :destroy
  has_many :notes, dependent: :destroy
  has_many :song_tags, dependent: :destroy
  has_many :tags, through: :song_tags

  validates :name, presence: true
end
