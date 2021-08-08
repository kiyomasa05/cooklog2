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
          }
        end
      end

      def index
        @recipes = Recipe.order(created_at: :desc)
        #本当は更新された順に表示したい
        # @recipes = Recipe.order(updated_at: :desc)
        # @user = User.find(params[:id])
        # favorites = Favorite.where(user_id: current_user.id).pluck(:recipe_id)  # ログイン中のユーザーのお気に入りのpost_idカラムを取得
        # @favorite_list = Recipe.find(favorites)     # Recipeテーブルから、お気に入り登録済みのレコードを取得

        render json: @recipes,
          methods: [:image_url]
      end

      def update
        @recipe = Recipe.find(params[:id])
        if @recipe.valid?
          if params[:recipe][:image]
            blob = ActiveStorage::Blob.create_and_upload!(
              io: StringIO.new(decode(params[:recipe][:image][:data]) + "\n"),
              filename: params[:recipe][:image][:name],
            )
            @recipe.image.purge #一度紐づく画像を削除
            @recipe.image.attach(blob)
          end
          # binding.pry
          @recipe.update(post_params)
          render json: {
            status: :updated,
            recipe: @recipe,
          }
        else
          render json: {
            status: 500,
            errors: @recipe.errors.full_messages,
          }
        end
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
      #同じ内容で送信したら、今度はうまくいいった。違いがわからない
      #送る画像によって引数エラーになるのかな？
      #画像を変えたらうまくいった。なぜ＿？
      #画像によって、早く処理が終了し、エラーが出ない物もあれば、
      #処理が38秒もかかり、エラーになるケースもある。
      #原因不明のため、一旦ストップ

      def decode(str)
        Base64.decode64(str.split(",").last)
      end
    end
  end
end
