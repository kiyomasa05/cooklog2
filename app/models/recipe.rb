class Recipe < ApplicationRecord
  belongs_to :user, dependent: :destroy
  default_scope -> { order(created_at: :desc) }
  # has_one_attached :image
  has_many_attached :image
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 20 }
  validates :time_required, presence: true
  validates :food, presence: true
  validates :process, presence: true
end

