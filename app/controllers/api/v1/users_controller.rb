module Api
  module V1
    class UsersController < ApplicationController
      def create
        @user=User.new(registrations_params)
        
        if @user.save
          login @user
          render json: {
            status: :created,
            logged_in: true,
            user: @user }
          
        else
          render json:{
            status:500,
            # エラーメッセージを全て取得し、返す
            errors: ['登録できませんでした。']
          }
        end
      end

      def show
        @user = User.find(params[:id])
        if @user
          render json: {
          user: @user
        }
        else
          render json: {
          status: 500,
          errors: ['user not found']
        }
        end
      end



      private

        def registrations_params
            params.require(:user).permit(:name,:email, :password, :password_confirmation)
            
        end
    end
  end
end
