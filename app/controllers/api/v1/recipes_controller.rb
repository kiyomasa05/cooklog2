module Api
  module V1
    class RecipesController < ApplicationController
      def create
        @recipe=Recipe.new(post_params)
        
        if @recipe.save
          
          render json: {
            status: :created
            }
        else
          render json:{
            status:500,
            errors: '登録に失敗しました。再度ログインしなおしてからご登録ください'
          }
        end
      end

      def index
        @recipes = Recipe.order(created_at: :desc)
        
        # 画面遷移によりjsonデータがループしている？
        # 前の画面でjsonを呼び出していてそのままだからおかしくなっている？
        render json:{
          status: :OK, 
          data: @recipes
        }
      end

      private

        def post_params
            params.require(:recipe).permit(:user_id,:title, :time_required, :food,:process,:image)
            
        end
    end
  end
end
