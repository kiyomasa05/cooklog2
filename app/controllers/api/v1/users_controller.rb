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

      def update
        @user = User.find(params[:id])
        # @user = User.find(registrations_params[:email])
        # update_without_password(registrations_params)
        if @user.update(registrations_params)
          render json: {
            status: :updated,
            user: @user
          }
        else
          render json: {
            status: 500,
            errors: @user.errors.full_messages
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
