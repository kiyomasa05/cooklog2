class User < ApplicationRecord
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
  validates :password, presence: true, length: { minimum: 4 }
  # # passwordなしでuserをupdateできるメソッド
  #   def update_without_password(params, *options)
  #     # params.delete(:current_password)
  #     if params[:password].blank? && params[:password_confirmation].blank?
  #       params.delete(:password)
  #       params.delete(:password_confirmation)
  #     end
  #   end
  def display_image
    avatar.variant(resize_to_limit: [500, 500])
  end

  def avatar_url
    # 紐づいている画像のURLを取得する
    avatar.attached? ? url_for(avatar) : nil
  end
end
