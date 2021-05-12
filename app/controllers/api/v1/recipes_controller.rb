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

      

      private

        def post_params
            params.require(:recipe).permit(:user_id,:title, :time_required, :food,:process,:image)
            
        end
    end
  end
end
