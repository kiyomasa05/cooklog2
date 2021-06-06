module Api
  module V1
    class RecipesController < ApplicationController
      def create
        @recipe=Recipe.new(post_params)
        # @recipe.image.attach(params[:image])
        if params[:recipe][:image]
          blob = ActiveStorage::Blob.create_after_upload!(
            io: StringIO.new(decode(params[:recipe][:image][:image][:data]) + "\n"),
            filename: params[:recipe][:image][:image][:name]
          )
          @recipe.image.attach(blob)
        end
        if @recipe.save
          render json: {
            status: :created,
            # methods: [:image_url] 
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
        
        # image_path = Rails.application.routes.url_helpers.rails_representation_url(@recipe.image.variant({}), only_path: true) 

        render json:{
          status: :OK, 
          recipes: @recipes,
          methods: [:image_url],
        }
      end

      private

        def post_params
            params.require(:recipe).permit(
                :user_id,:title, :time_required, :food,:process,image:[]
              )
        end

        def decode(str)
          Base64.decode64(str.split(',').last)
        end
    end
  end
end
