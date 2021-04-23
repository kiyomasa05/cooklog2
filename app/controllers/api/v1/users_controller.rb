module Api
  module V1
    class UsersController < ApplicationController
      def signup
        user=User.new(registrations_params)
      end



      private

        def registrations_params
            params.require(:user).permit(:name,:email, :password, :password_confirm)
        end
    end
  end
end
