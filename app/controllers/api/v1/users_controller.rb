module Api
  module V1
    class UsersController < ApplicationController
      def create
        @user=User.new(registrations_params)
        
        if @user.save
          render json:{status: :created,user: @user}
        else
          render json:{status:500}
        end
      end



      private

        def registrations_params
            params.require(:user).permit(:name,:email, :password, :password_confirmation)
            
        end
    end
  end
end
