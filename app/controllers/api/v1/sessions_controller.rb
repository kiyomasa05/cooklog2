module Api
  module V1
    class SessionsController < ApplicationController
      before_action :current_user, only: [:logged_in?]

      def login
          @user = User.find_by(email: session_params[:email])

          if @user && @user.authenticate(session_params[:password])
              login!
              render json: { 
                logged_in: true, 
                user: @user }
          else
              render json: { status: 401, errors: ['正しいメールアドレス・パスワードを入力して下さい' ] }
          end
      end

      def logout
          reset_session
          render json: { status: 200, logged_out: true }
      end

      def logged_in?
          if  @current_user
              render json: { logged_in: true, user: @current_user }
          else
              render json: { logged_in: false, errors: 'ユーザーが存在しません,ログインし直して下さい' }
          end
      end

      private

          def session_params
              params.require(:user).permit(:email, :password)
          end
    end
  end
end
