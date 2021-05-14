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
  validates :image,   content_type: { in: %w[image/jpeg image/gif image/png],
    message: "must be a valid image format" },
size:         { less_than: 5.megabytes,
    message: "should be less than 5MB" }

    def display_image
      image.variant(resize_to_limit: [500, 500])
    end
end

