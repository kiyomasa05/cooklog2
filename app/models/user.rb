class User < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_many :recipes, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_one_attached :avatar

  before_save { self.email = email.downcase }
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
  has_secure_password
  validates :password, presence: true, length: { minimum: 4 },allow_nil: true
  validates :avatar,   content_type: { in: %w[image/jpeg image/gif image/png],
    message: "must be a valid image format" },
size:         { less_than: 5.megabytes,
    message: "should be less than 5MB" }
    
  def display_image
    user.avatar.variant(resize_to_limit: [500, 500])
  end

  def avatar_url
    # 紐づいている画像のURLを取得する
    avatar.attached? ? url_for(avatar) : nil
  end
end
