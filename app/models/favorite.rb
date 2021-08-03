class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  validates_uniqueness_of :recipe_id, scope: :user_id
  # バリデーション（ユーザーと記事の組み合わせは一意）
  # 同じ投稿を複数回お気に入り登録させないため。
  # 現在のユーザーがお気に入り登録してたらtrueを返す
  def favorite?(recipe)
    !Favorite.find_by(user_id: id, recipe_id: recipe.id).nil?
  end
end
