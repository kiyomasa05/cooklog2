module Api
  module V1
    class FavoritesController < ApplicationController
      before_action :set_recipe
      before_action :authenticate_user! 
        # ログイン中のユーザーのみに許可（未ログインなら、ログイン画面へ移動）
    
      # お気に入り登録
      def create
        if @recipe.user_id != current_user.id   # 投稿者本人以外に限定
          @favorite = Favorite.create(user_id: current_user.id, recipe_id: @recipe.id)
        end
      end
      # お気に入り削除
      def destroy
        @favorite = Favorite.find_by(user_id: current_user.id, recipe_id: @recipe.id)
        @favorite.destroy
      end
    
      private
      def set_recipe
        @recipe = Recipe.find(params[:recipe_id])
      end
    end
  end
end
