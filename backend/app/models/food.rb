class Food < ApplicationRecord
  belongs_to :restaurant
  # optional = No association is required
  belongs_to :order, optional: true

  has_one :line_food
end
