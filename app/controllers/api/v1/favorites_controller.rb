module Api
  module V1
    class FavoritesController < ApplicationController
      before_action :set_recipe
      before_action :current_user

      # お気に入り登録
      def create
        if @recipe.user_id != current_user.id # 投稿者本人以外に限定
          #favoriteを作成する
          @favorite = Favorite.create(user_id: current_user.id, recipe_id: @recipe.id)
          render json: {
            status: :created,
            favorite: @favorite,
          }
        else
          render json: {
                  status: 500,
                  errors: @favorite.errors.full_messages
                }
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
