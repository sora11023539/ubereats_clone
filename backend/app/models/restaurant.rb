class Restaurant < ApplicationRecord
  has_many :foods
  # through = So that you can define food tables directly from your restaurant model
  has_many :line_foods, through: :foods

  validates :name, :fee, :time_required, presence: true
  validates :name, length: { maximum:30 }
  validates :fee, numericality: { greater_than: 0 }
end
