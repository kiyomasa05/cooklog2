class Recipe < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user, dependent: :destroy,optional: true
  has_many :favorites, dependent: :destroy 
  default_scope -> { order(updated_at: :desc) }
  # default_scope -> { order(:updated_at) }
  has_one_attached :image
  
  
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

    def image_url
      # 紐づいている画像のURLを取得する
      image.attached? ? url_for(image) : nil
    end
end

