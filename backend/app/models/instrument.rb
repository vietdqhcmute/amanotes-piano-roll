class Instrument < ApplicationRecord
  has_many :tracks

  validates :label, presence: true
  validates :color, presence: true
end
