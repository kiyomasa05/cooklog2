module Api
  module V1
    class UsersController < ApplicationController
      def create
        @user=User.new(registrations_params)

        if @user.valid?
          if params[:user][:avatar]
            blob = ActiveStorage::Blob.create_and_upload!(
              io: StringIO.new(decode(params[:user][:avatar][:data]) + "\n"),
              filename: params[:user][:avatar][:name],
            )
            @user.avatar.attach(blob)
          end
          @user.save
            login @user
            render json: {
              status: :created,
              logged_in: true,
              user: @user,
            },methods: [:avatar_url]
            
        else
          render json:{
            status:500,
            # エラーメッセージを全て取得し、返す
            errors: ['登録できませんでした。']
          }
        end
      end

      def update
        @user = User.find(params[:id])
        # @user = User.find(registrations_params[:email])
        # update_without_password(registrations_params)
        # binding.pry
        if @user.valid?
          if params[:user][:avatar]
            blob = ActiveStorage::Blob.create_and_upload!(
              io: StringIO.new(decode(params[:user][:avatar][:data]) + "\n"),
              filename: params[:user][:avatar][:name],
            )
            @user.avatar.attach(blob)
          end
        @user.update(registrations_params)
          render json: {
            status: :updated,
            user: @user,
          },methods: [:avatar_url]
        else
          render json: {
            status: 500,
            errors: @user.errors.full_messages
          }
          # binding.pry
        end
#         既存のuserにavatarを添付するにはavatar.attachを呼び出します。
# user.avatar.attach(params[:avatar])
# avatar.attached?で特定のuserがavatarを持っているかどうかを調べられます。
# user.avatar.attached?
      end

      # お気に入りを見せる
      def show
        favorites = Favorite.where(user_id: current_user.id).pluck(:recipe_id)  # ログイン中のユーザーのお気に入りのrecipe_idカラムを取得
        @favorite_list = Recipe.find(favorites)     # Recipeテーブルから、お気に入り登録済みのレコードを取得
        render json: 
          @favorite_list,
          methods: [:image_url]
      end
    
      private

        def registrations_params
            params.require(:user).permit(:name,:email, :password, :password_confirmation)
            
        end
        def decode(str)
          Base64.decode64(str.split(",").last)
        end
    end
  end
end
