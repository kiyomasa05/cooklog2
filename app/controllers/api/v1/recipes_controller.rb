module Api
  module V1
    class RecipesController < ApplicationController
      def create
        @recipe = Recipe.new(post_params)

        if @recipe.valid?
          if params[:recipe][:image]
            blob = ActiveStorage::Blob.create_and_upload!(
              io: StringIO.new(decode(params[:recipe][:image][:data]) + "\n"),
              filename: params[:recipe][:image][:name],
            )
            @recipe.image.attach(blob)
          end
          # binding.pry
          @recipe.save
          render json: {
                   status: :created,
                   recipe: @recipe,
                   methods: [:image_url],
                 }
        else
          render json: {
            status: 422, #(500)
            errors: @recipe.errors.full_messages,
          # '登録に失敗しました。再度ログインしなおしてからご登録ください'
          }
        end
      end

      def index
        @recipes = Recipe.order(created_at: :desc)
        # image_path = Rails.application.routes.url_helpers.rails_representation_url(@recipe.image.variant({}), only_path: true)
        render json: {
          status: :OK,
          recipes: @recipes,
          methods: [:image_url],
        }
      end

      private

      def post_params
        params.require(:recipe).permit(
          :user_id, :title, :time_required, :food, :process,
          # image: {:io,:filename}
        )
      end

      # )がエラーとなる
      # image: [:data,:name]これはダメだった
      #仮説1strongparamaterおかしい
      # image: {}したらArgumentError (missing keywords: :io, :filename):となり、
      # image: としたらendがないよと言われる
      # image: {:io,:filename}するとunexpected end-of-input, expecting `end'):と言われる
      # strong paramsからimageを削除してみたら、、文字列の処理がおわらず一旦SAVEできたように見えたが、railsがクラッシュした
      # Unpermitted parameter: :imageと出るもののレシピ登録できた
      # create_after_upload! は Rails 6.2から削除されるので、代わりに create_and_upload! を使うように指示あり
      # 一旦できた
      #文字列めっちゃ出てきて処理まで時間がかかるのはなぜ？
      #      そのまま送ったら、昨日はエラー起きなかったのに ArgumentError (wrong number of arguments (given 3, expected 1..2)):

      def decode(str)
        Base64.decode64(str.split(",").last)
      end
    end
  end
end
